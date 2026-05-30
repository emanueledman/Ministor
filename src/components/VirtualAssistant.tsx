import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, Mic, MicOff, Volume2, VolumeX, FileText, Sparkles } from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';
import { products } from '../data/products';
import { generateDocumentPDF, downloadPDF } from '../lib/pdfGenerator';
import { collection, addDoc, getDocs, query, where, orderBy, limit, serverTimestamp } from 'firebase/firestore';

interface ChatMessage {
  role: 'user' | 'model';
  parts: [{ text: string }];
  isAction?: boolean;
}

export default function VirtualAssistant() {
  const { user } = useFirebase();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [dynamicKnowledge, setDynamicKnowledge] = useState<{question: string, answer: string, category?: string}[]>([]);
  
  const { db } = useFirebase();
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(window.speechSynthesis);

  // Base de Conhecimento Local (FAQs)
  const KNOWLEDGE_BASE = [
    {
      keywords: ['loja', 'localização', 'onde fica', 'onde estão'],
      answer: "A nossa loja física 'Ministore' está localizada no Shopping Fortaleza, 2º piso, em Luanda, Angola."
    },
    {
      keywords: ['horário', 'horas', 'aberto', 'fecha'],
      answer: "Estamos abertos de Segunda a Sábado, das 09h00 às 19h00. Aos Domingos estamos encerrados."
    },
    {
      keywords: ['fatura', 'recibo', 'documento', 'pagamento', 'proforma'],
      answer: "Podes gerar faturas e recibos ao finalizar uma compra no Checkout. Também posso gerar uma **Fatura Proforma** instantânea aqui no chat! Basta pedires algo como: 'Gera uma proforma do iPhone 13'."
    },
    {
      keywords: ['entrega', 'envio', 'tempo', 'demora'],
      answer: "Fazemos entregas em toda Luanda no prazo de 24h. Para outras províncias, o tempo estimado é de 3 a 5 dias úteis."
    },
    {
      keywords: ['contacto', 'telefone', 'whatsapp', 'ajuda'],
      answer: "Podes contactar o nosso suporte técnico pelo WhatsApp (+244 9XX XXX XXX) ou pelo email suporte@ministore.ao."
    },
    {
      keywords: ['garantia', 'troca', 'devolução'],
      answer: "Todos os nossos produtos eletrónicos têm 1 ano de garantia. Aceitamos trocas em até 7 dias após a compra."
    }
  ];

  const [pendingProformaProduct, setPendingProformaProduct] = useState<string | null>(null);

  // Carregar conhecimento dinâmico (aprendido)
  useEffect(() => {
    const loadKnowledge = async () => {
      if (!db) return;
      try {
        const q = query(collection(db, 'dynamic_knowledge'), orderBy('timestamp', 'desc'), limit(50));
        const snapshot = await getDocs(q);
        const docs = snapshot.docs.map(doc => doc.data() as any);
        setDynamicKnowledge(docs);
      } catch (error) {
        console.error('Error loading dynamic knowledge:', error);
      }
    };
    loadKnowledge();
  }, [db]);

  const findLocalAnswer = (text: string) => {
    const lowerText = text.toLowerCase();
    
    // 1. Verificar Conhecimento Aprendido primeiro (Dinâmico)
    const dynamicMatch = dynamicKnowledge.find(k => lowerText.includes(k.question.toLowerCase()));
    if (dynamicMatch) return dynamicMatch.answer;

    // 2. Verificar Base de Conhecimento Estática
    return KNOWLEDGE_BASE.find(faq => 
      faq.keywords.some(keyword => lowerText.includes(keyword))
    )?.answer;
  };

  const logInteraction = async (question: string, answer: string, category: string = 'general') => {
    if (!db) return;
    try {
      await addDoc(collection(db, 'chat_logs'), {
        userId: user?.uid || 'guest',
        question,
        answer,
        category,
        timestamp: serverTimestamp()
      });

      // Simulação simples de "aprendizagem": se a mesma pergunta for feita 3 vezes, 
      // e não estava na base local, ela pode ser promovida a 'dynamic_knowledge'
      // Para este exercício, vamos salvar direto em dynamic_knowledge se for uma proforma ou info de produto
      if (category === 'proforma' || category === 'product_info') {
        await addDoc(collection(db, 'dynamic_knowledge'), {
          question,
          answer,
          category,
          timestamp: serverTimestamp()
        });
      }
    } catch (error) {
      console.error('Error logging interaction:', error);
    }
  };

  const handleProformaRequest = (text: string) => {
    const lowerText = text.toLowerCase();
    if (!lowerText.includes('proforma')) return null;

    // Tentar encontrar o produto mencionado
    const matchedProduct = products.find(p => lowerText.includes(p.name.toLowerCase()));
    
    if (matchedProduct) {
      if (!user) {
        setPendingProformaProduct(matchedProduct.name);
        return `Com certeza! Posso gerar a proforma para o **${matchedProduct.name}**. \n\nPara que o documento seja válido, por favor escreva o seu **Nome Completo**, **Email** e **NIF** abaixo.`;
      }

      const docData = {
        type: 'Fatura Proforma',
        number: `PRF-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`,
        date: new Date().toLocaleDateString('pt-BR'),
        customer: {
          name: user?.displayName || 'Cliente Ministore',
          email: user?.email || 'cliente@exemplo.com',
          phone: '(+244) 9XX XXX XXX'
        },
        items: [{
          name: matchedProduct.name,
          quantity: 1,
          price: matchedProduct.price,
          total: matchedProduct.numericPrice
        }],
        total: matchedProduct.numericPrice
      };

      const doc = generateDocumentPDF(docData);
      downloadPDF(doc, `Proforma_${matchedProduct.name.replace(/\s/g, '_')}.pdf`);
      
      return `Com certeza! Acabei de gerar a **Fatura Proforma** para o **${matchedProduct.name}** com o preço oficial de **${matchedProduct.price}**. O download deve iniciar automaticamente.`;
    }

    return "Gostaria de uma proforma, mas não identifiquei o nome do produto. Pode dizer, por exemplo: 'Gera uma proforma do iPhone 13'?";
  };

  const generateManualProforma = (productName: string, userData: string) => {
    const matchedProduct = products.find(p => p.name === productName);
    if (!matchedProduct) return "Erro ao localizar produto.";

    // Tentar extrair email, nif e nome básicos
    const emailMatch = userData.match(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/);
    const nifMatch = userData.match(/\b\d{9,14}\b/); // Busca por sequência de 9 a 14 números
    
    const email = emailMatch ? emailMatch[0] : 'cliente@exemplo.com';
    const nif = nifMatch ? nifMatch[0] : 'Consumidor Final';
    
    // Limpar o nome removendo o email e nif encontrados
    let name = userData;
    if (emailMatch) name = name.replace(emailMatch[0], '');
    if (nifMatch) name = name.replace(nifMatch[0], '');
    name = name.trim() || 'Cliente Ministore';

    const docData = {
      type: 'Fatura Proforma',
      number: `PRF-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`,
      date: new Date().toLocaleDateString('pt-BR'),
      customer: {
        name: name,
        email: email,
        phone: '(+244) 9XX XXX XXX',
        nif: nif
      },
      items: [{
        name: matchedProduct.name,
        quantity: 1,
        price: matchedProduct.price,
        total: matchedProduct.numericPrice
      }],
      total: matchedProduct.numericPrice
    };

    const doc = generateDocumentPDF(docData);
    downloadPDF(doc, `Proforma_${matchedProduct.name.replace(/\s/g, '_')}.pdf`);
    
    setPendingProformaProduct(null);
    return `Obrigado, ${name}! A **Fatura Proforma** para o **${matchedProduct.name}** foi gerada com sucesso. O download iniciará agora.`;
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'pt-PT';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const speak = (text: string) => {
    if (!speechEnabled || !synthesisRef.current) return;
    
    // Stop any current speaking
    synthesisRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-PT';
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    synthesisRef.current.speak(utterance);
  };

  const handleSubmit = async (e?: React.FormEvent, manualInput?: string) => {
    if (e) e.preventDefault();
    const messageText = manualInput || input;
    if (!messageText.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', parts: [{ text: messageText }] };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    // 0. Verificar se estamos a aguardar dados para Proforma
    if (pendingProformaProduct && !user) {
      const response = generateManualProforma(pendingProformaProduct, messageText);
      setTimeout(() => {
        const botMessage: ChatMessage = { 
          role: 'model', 
          parts: [{ text: response }],
          isAction: true 
        };
        setMessages(prev => [...prev, botMessage]);
        speak(response);
        setIsLoading(false);
        logInteraction(messageText, response, 'proforma');
      }, 800);
      return;
    }

    // 1. Verificar pedido de Proforma
    const proformaResponse = handleProformaRequest(messageText);
    if (proformaResponse) {
      setTimeout(() => {
        const botMessage: ChatMessage = { 
          role: 'model', 
          parts: [{ text: proformaResponse }],
          isAction: true 
        };
        setMessages(prev => [...prev, botMessage]);
        speak(proformaResponse);
        setIsLoading(false);
        logInteraction(messageText, proformaResponse, 'proforma');
      }, 800);
      return;
    }

    // 2. Verificar na Base de Conhecimento Local
    const localAnswer = findLocalAnswer(messageText);
    if (localAnswer) {
      // Pequeno delay para simular processamento e não ser instantâneo demais
      setTimeout(() => {
        const botMessage: ChatMessage = { role: 'model', parts: [{ text: localAnswer }] };
        setMessages(prev => [...prev, botMessage]);
        speak(localAnswer);
        setIsLoading(false);
        logInteraction(messageText, localAnswer, 'local_faq');
      }, 500);
      return;
    }

    // 3. Fallback para API do Gemini
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          history: messages,
          userId: user?.uid || 'guest'
        }),
      });

      const data = await response.json();
      if (data.text) {
        const botMessage: ChatMessage = { role: 'model', parts: [{ text: data.text }] };
        setMessages(prev => [...prev, botMessage]);
        speak(data.text);
        logInteraction(messageText, data.text, 'ai_fallback');
      } else {
        throw new Error(data.error || 'Erro na resposta');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg = 'Desculpe, tive um problema ao processar sua mensagem. Tente novamente mais tarde.';
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: errorMsg }] }]);
      speak(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="p-6 bg-black text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={20} className={isSpeaking ? 'animate-pulse text-[#72aec8]' : ''} />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-widest uppercase">Assistente Ministore</h3>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">Ativo (Texto & Voz)</p>
                </div>
              </div>
              <button 
                onClick={() => setSpeechEnabled(!speechEnabled)}
                className="text-gray-400 hover:text-white transition-colors"
                title={speechEnabled ? "Desativar voz" : "Ativar voz"}
              >
                {speechEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50"
            >
              {messages.length === 0 && (
                <div className="text-center py-10 space-y-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
                    <Bot size={24} />
                  </div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold px-4">Olá! Eu posso gerar **Faturas Proforma** para qualquer produto e tirar dúvidas sobre a loja.</p>
                  <div className="flex flex-wrap justify-center gap-2 pt-4">
                    {['Fatura Proforma iPhone 13', 'Promoções', 'Onde fica a loja?'].map(tag => (
                      <button 
                        key={tag}
                        onClick={() => handleSubmit(undefined, tag)}
                        className="text-[10px] bg-white border border-gray-200 px-3 py-1.5 rounded-full hover:border-black transition-colors uppercase font-bold tracking-widest"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-4 rounded-2xl text-xs leading-relaxed flex flex-col gap-2 ${
                    msg.role === 'user' 
                      ? 'bg-black text-white rounded-tr-none shadow-lg' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none shadow-sm'
                  }`}>
                    <div className="whitespace-pre-wrap">{msg.parts[0].text}</div>
                    {msg.isAction && (
                      <div className="flex items-center gap-2 mt-1 p-2 bg-gray-50 rounded-lg text-[10px] text-gray-500 font-bold uppercase tracking-tight">
                        <FileText size={14} className="text-[#72aec8]" />
                        Documento Gerado com Sucesso
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Overlay for Listening */}
            <AnimatePresence>
              {isListening && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-x-0 bottom-16 bg-white/90 backdrop-blur-sm p-8 flex flex-col items-center gap-4 z-10"
                >
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map(i => (
                      <motion.div 
                        key={i}
                        animate={{ height: [10, 30, 10] }}
                        transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                        className="w-1 bg-black rounded-full"
                      />
                    ))}
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-black">A ouvir...</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-100 flex gap-2 items-center">
              <button
                type="button"
                onClick={toggleListening}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                  isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-gray-400 hover:text-black'
                }`}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escreva ou fale..."
                className="flex-1 px-4 py-3 bg-gray-100 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-black placeholder:text-gray-400"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center hover:bg-[#72aec8] transition-colors disabled:bg-gray-300"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

