import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import fs from "fs";
import { randomUUID } from "crypto";
import { generateDocumentPDF } from "./src/lib/pdfGenerator";
import { products } from "./src/data/products";

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

  const response = await chat.sendMessage({ message });
  return response.text;
}

async function startServer() {
  const app = express();
  const PORT = 3000;
  const invoicesDir = path.join(process.cwd(), 'invoices');

  fs.mkdirSync(invoicesDir, { recursive: true });
  app.set('trust proxy', true);

  app.use(express.json());
  app.use('/invoices', express.static(invoicesDir));

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

  app.post('/api/invoices/proforma', async (req, res) => {
    try {
      const { name, email, nif, phone, productName, documentType } = req.body ?? {};

      if (!name || !email || !nif || !productName) {
        return res.status(400).json({
          error: 'Campos obrigatórios: name, email, nif, productName'
        });
      }

      const normalizedProductName = String(productName).toLowerCase().trim();
      const matchedProduct = products.find(product =>
        product.name.toLowerCase() === normalizedProductName ||
        product.name.toLowerCase().includes(normalizedProductName)
      );

      if (!matchedProduct) {
        return res.status(404).json({
          error: `Produto não encontrado: ${productName}`
        });
      }

      const resolvedType = documentType || 'Fatura Proforma';
      const documentNumber = `PRF-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`;
      const safeName = String(name)
        .trim()
        .replace(/\s+/g, '_')
        .replace(/[^a-zA-Z0-9_-]/g, '');
      const fileName = `${documentNumber}_${safeName || randomUUID()}.pdf`;
      const filePath = path.join(invoicesDir, fileName);

      const pdf = generateDocumentPDF({
        type: resolvedType,
        number: documentNumber,
        date: new Date().toLocaleDateString('pt-BR'),
        customer: {
          name,
          email,
          phone: phone || '(+244) 9XX XXX XXX',
          nif
        },
        items: [{
          name: matchedProduct.name,
          quantity: 1,
          price: matchedProduct.price,
          total: matchedProduct.numericPrice
        }],
        total: matchedProduct.numericPrice
      });

      const pdfBuffer = Buffer.from(pdf.output('arraybuffer'));
      fs.writeFileSync(filePath, pdfBuffer);

      if (db) {
        try {
          await addDoc(collection(db, 'documents'), {
            userId: 'botpress',
            type: resolvedType,
            number: documentNumber,
            customerName: name,
            customerEmail: email,
            customerPhone: phone || '(+244) 9XX XXX XXX',
            customerNif: nif,
            items: [{
              name: matchedProduct.name,
              quantity: 1,
              price: matchedProduct.price,
              total: matchedProduct.numericPrice
            }],
            total: matchedProduct.numericPrice,
            createdAt: new Date().toISOString()
          });
        } catch (logErr) {
          console.error('Error saving invoice document:', logErr);
        }
      }

      const baseUrl = process.env.PUBLIC_BASE_URL || `${req.protocol}://${req.get('host')}`;
      const pdfUrl = `${baseUrl}/invoices/${encodeURIComponent(fileName)}`;

      return res.json({
        pdf_url: pdfUrl,
        document_number: documentNumber,
        type: resolvedType,
        customer_name: name,
        product_name: matchedProduct.name
      });
    } catch (error) {
      console.error('Invoice generation error:', error);
      return res.status(500).json({
        error: 'Erro ao gerar a fatura.'
      });
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
