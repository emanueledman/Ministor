import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import fs from "fs";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Lazy initialize Firebase for logging
let db: any = null;
const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
if (fs.existsSync(configPath)) {
  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const firebaseApp = initializeApp(config);
    db = getFirestore(firebaseApp, config.firestoreDatabaseId);
  } catch (err) {
    console.error("Failed to init Firebase on server:", err);
  }
}

// Helper function to handle AI logic centrally
async function getAIResponse(message: string, history: any[]) {
  const chat = ai.chats.create({
    model: "gemini-flash-latest",
    config: {
      systemInstruction: `Você é o assistente virtual inteligente da 'Ministore'. 
      Sua missão é ajudar clientes com:
      1. Informações de produtos. Catálogo Atual:
         - iPhone 13: 150.000 Kz
         - iPhone 11: 110.000 Kz
         - iPhone 10: 98.000 Kz
         - iPhone 8: 78.000 Kz
         - Pink Watch: 87.000 Kz
         - Spotted Watch: 75.000 Kz
         - Heavy Watch: 68.000 Kz
         - Black Watch: 65.000 Kz
      2. Suporte na navegação do site.
      3. Informações sobre faturas e recibos.
      4. Localização (Luanda, Angola) e horários (Seg-Sáb, 09h-19h).
      
      CAPACIDADE ESPECIAL:
      - Você pode gerar FATURAS PROFORMA instantâneas. Se o cliente pedir uma proforma de um produto específico, confirme que está gerando.

      Diretrizes de Personalidade:
      - Seja amigável, educado e use português de Angola/Portugal.
      - Use EXATAMENTE os preços listados no catálogo acima.`,
    },
    history: history,
  });

  const response = await chat.sendMessage(message);
  return response.text;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- NOVO: WEBHOOK PARA WHATSAPP (WAHA) ---
  app.post("/api/waha/webhook", async (req, res) => {
    try {
      const { event, payload } = req.body;

      // Só processar mensagens recebidas de outros (não as nossas)
      if (event === 'message.created' && !payload.fromMe) {
        const customerPhone = payload.from;
        const customerMessage = payload.body;

        console.log(`📩 Mensagem de ${customerPhone}: ${customerMessage}`);

        // Obter resposta da IA
        const botResponse = await getAIResponse(customerMessage, []);

        // Enviar de volta pelo WAHA
        await fetch("http://localhost:3001/api/sendText", {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'X-Api-Key': 'fb1d195b0a864310915925ab75716a8d' // Chave atualizada conforme os logs
          },
          body: JSON.stringify({
            chatId: customerPhone,
            text: botResponse,
            session: "default"
          })
        });
        
        // Logar a interação para aprendizagem
        if (db) {
          await addDoc(collection(db, 'chat_logs'), {
            userId: `wa_${customerPhone}`,
            question: customerMessage,
            answer: botResponse,
            timestamp: new Date().toISOString(),
          });
        }
      }
      res.sendStatus(200);
    } catch (err) {
      console.error("WAHA Webhook Error:", err);
      res.sendStatus(500);
    }
  });

  // API route for Website Chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history, userId } = req.body;
      const sanitizedHistory = history?.map((msg: any) => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: msg.parts.map((part: any) => ({ text: part.text }))
      })) || [];

      const text = await getAIResponse(message, sanitizedHistory);

      if (db) {
        try {
          await addDoc(collection(db, 'chat_logs'), {
            userId: userId || 'anonymous',
            question: message,
            answer: text,
            timestamp: new Date().toISOString(),
          });
        } catch (logErr) {
          console.error("Error logging chat:", logErr);
        }
      }

      res.json({ text });
    } catch (error: any) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Erro ao processar a sua mensagem." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
