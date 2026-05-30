import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/FirebaseContext';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { motion } from 'motion/react';
import { FileText, Download, Share2, Search, Clock } from 'lucide-react';
import { generateDocumentPDF, downloadPDF, shareByWhatsApp } from '../lib/pdfGenerator';
import { handleFirestoreError, OperationType } from '../lib/firebaseUtils';

interface Document {
  id: string;
  type: string;
  number: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  total: number;
  createdAt: string;
  items: any[];
}

export default function DocumentHistory() {
  const { db, user } = useFirebase();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!db || !user) {
      setLoading(false);
      return;
    }

    const fetchDocs = async () => {
      try {
        const q = query(
          collection(db, 'documents'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        let snapshot;
        try {
          snapshot = await getDocs(q);
        } catch (error) {
          handleFirestoreError(error, OperationType.LIST, 'documents');
          return;
        }
        const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Document));
        setDocuments(docs);
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, [db, user]);

  const filteredDocs = documents.filter(doc => 
    doc.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (docData: Document) => {
    const pdf = generateDocumentPDF({
      type: docData.type,
      number: docData.number,
      date: new Date(docData.createdAt).toLocaleDateString(),
      customer: {
        name: docData.customerName,
        email: docData.customerEmail,
        phone: docData.customerPhone
      },
      items: docData.items,
      total: docData.total
    });
    downloadPDF(pdf, `${docData.type}-${docData.number}.pdf`);
  };

  const handleShare = (docData: Document) => {
    shareByWhatsApp({
      type: docData.type,
      number: docData.number,
      date: new Date(docData.createdAt).toLocaleDateString(),
      customer: {
        name: docData.customerName,
        email: docData.customerEmail,
        phone: docData.customerPhone
      },
      items: docData.items,
      total: docData.total
    });
  };

  if (!user) {
    return (
      <div className="pt-32 pb-24 container mx-auto px-4 text-center">
        <h1 className="text-2xl font-bold uppercase tracking-widest mb-4">Histórico de Documentos</h1>
        <p className="text-gray-500">Por favor, faz login para ver o teu histórico.</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <header className="mb-12">
          <h1 className="text-3xl font-bold uppercase tracking-[0.2em] mb-4">Histórico de Documentos</h1>
          <p className="text-gray-500 text-sm tracking-widest uppercase">Faturas, Recibos e Encomendas</p>
        </header>

        {/* Search */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex items-center gap-4">
          <Search className="text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Pesquisar por número ou cliente..."
            className="flex-1 outline-none text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredDocs.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
            <FileText className="mx-auto text-gray-200 mb-4" size={48} />
            <p className="text-gray-400 uppercase tracking-widest text-xs font-bold">Nenhum documento encontrado</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredDocs.map((doc, index) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-black">
                    <FileText size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-black text-white rounded">
                        {doc.type}
                      </span>
                      <span className="text-xs font-bold text-gray-500">#{doc.number}</span>
                    </div>
                    <h3 className="font-bold text-sm">{doc.customerName}</h3>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest mt-1">
                      <Clock size={12} />
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-8">
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Total</p>
                    <p className="font-bold text-lg">{doc.total.toLocaleString()} Kz</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleDownload(doc)}
                      className="w-10 h-10 bg-gray-100 text-black rounded-xl flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                      title="Descarregar PDF"
                    >
                      <Download size={18} />
                    </button>
                    <button 
                      onClick={() => handleShare(doc)}
                      className="w-10 h-10 bg-gray-100 text-black rounded-xl flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors"
                      title="Enviar WhatsApp"
                    >
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
