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

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history, userId } = req.body;
      
      // Sanitize history to match SDK expectation (role and parts only)
      const sanitizedHistory = history?.map((msg: any) => ({
        role: msg.role === 'model' ? 'model' : 'user',
        parts: msg.parts.map((part: any) => ({ text: part.text }))
      })) || [];

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
          - Você pode gerar FATURAS PROFORMA instantâneas. Se o cliente pedir uma proforma de um produto específico (ex: "faz uma proforma do iPhone 13"), o frontend irá processar isso automaticamente. Apenas confirme que está gerando.

          Diretrizes de Personalidade:
          - Seja amigável, educado e use português de Angola/Portugal.
          - Use EXATAMENTE os preços listados no catálogo acima. Não invente preços.
          - Se o utilizador pedir para fazer uma fatura de compra real, explique que ele deve adicionar produtos ao carrinho e finalizar a compra.
          - Se você não souber algo, direcione para o suporte humano: "Podes falar com a nossa equipa técnica pelo WhatsApp no rodapé do site".`,
        },
        history: sanitizedHistory,
      });

      const response = await chat.sendMessage(message);
      const text = response.text;

      // Log to Firestore for learning (pattern analysis)
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
