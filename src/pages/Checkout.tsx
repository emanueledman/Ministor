/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFirebase } from '../context/FirebaseContext';
import { collection, addDoc } from 'firebase/firestore';
import { generateDocumentPDF, downloadPDF, shareByWhatsApp } from '../lib/pdfGenerator';
import { handleFirestoreError, OperationType } from '../lib/firebaseUtils';
import { CheckCircle2, Download, Share2, History } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Checkout() {
  const { cartItems, totalItems, totalPrice, clearCart } = useCart();
  const { db, user } = useFirebase();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    nif: '',
    address: '',
    city: '',
    province: '',
    zip: ''
  });

  const [orderStatus, setOrderStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [lastOrder, setLastOrder] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    
    setOrderStatus('processing');

    const orderNumber = `MINI-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderData = {
      type: 'fatura',
      number: orderNumber,
      customerName: `${formData.firstName} ${formData.lastName}`,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      customerNif: formData.nif,
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.numericPrice * item.quantity
      })),
      total: totalPrice,
      createdAt: new Date().toISOString(),
      userId: user?.uid || 'guest'
    };

    try {
      if (db && user) {
        try {
          await addDoc(collection(db, 'documents'), orderData);
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, 'documents');
        }
      }
      
      setLastOrder(orderData);
      setOrderStatus('success');
      clearCart();
    } catch (error) {
      console.error('Error saving order:', error);
      // Fallback: still show success but warn about history
      setLastOrder(orderData);
      setOrderStatus('success');
      clearCart();
    }
  };

  if (orderStatus === 'success' && lastOrder) {
    return (
      <div className="pt-12 md:pt-32 pb-12 md:pb-24 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 md:p-12 rounded-xl md:rounded-3xl shadow-xl text-center space-y-6 md:space-y-8"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={40} className="md:hidden" />
              <CheckCircle2 size={48} className="hidden md:block" />
            </div>
            
            <div>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest mb-2 md:mb-4">Pedido Finalizado!</h2>
              <p className="text-xs md:text-base text-gray-500">A sua fatura #{lastOrder.number} foi gerada com sucesso.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <button 
                onClick={() => {
                  const pdf = generateDocumentPDF({
                    ...lastOrder,
                    date: new Date(lastOrder.createdAt).toLocaleDateString(),
                    customer: { 
                      name: lastOrder.customerName, 
                      email: lastOrder.customerEmail, 
                      phone: lastOrder.customerPhone,
                      nif: lastOrder.customerNif
                    }
                  });
                  downloadPDF(pdf, `fatura-${lastOrder.number}.pdf`);
                }}
                className="flex items-center justify-center gap-2 md:gap-3 bg-black text-white py-3 md:py-4 rounded-lg md:rounded-xl font-bold uppercase tracking-widest text-[9px] md:text-[10px] hover:bg-gray-800 transition-colors"
              >
                <Download size={16} className="md:hidden" />
                <Download size={18} className="hidden md:block" />
                Descarregar PDF
              </button>
              <button 
                onClick={() => {
                  shareByWhatsApp({
                    ...lastOrder,
                    date: new Date(lastOrder.createdAt).toLocaleDateString(),
                    customer: { 
                      name: lastOrder.customerName, 
                      email: lastOrder.customerEmail, 
                      phone: lastOrder.customerPhone,
                      nif: lastOrder.customerNif
                    }
                  });
                }}
                className="flex items-center justify-center gap-2 md:gap-3 bg-[#25D366] text-white py-3 md:py-4 rounded-lg md:rounded-xl font-bold uppercase tracking-widest text-[9px] md:text-[10px] hover:bg-[#128C7E] transition-colors"
              >
                <Share2 size={16} className="md:hidden" />
                <Share2 size={18} className="hidden md:block" />
                WhatsApp
              </button>
            </div>

            <div className="pt-6 md:pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Link to="/history" className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black flex items-center gap-2 justify-center">
                <History size={14} />
                Ver Histórico
              </Link>
              <Link to="/shop" className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-black hover:underline justify-center">
                Continuar a Comprar
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

      {/* Page Header */}
      <section className="bg-[#edf1f3] py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-light tracking-tight text-black mb-2 md:mb-4 uppercase">
            Checkout
          </h1>
          <nav className="flex justify-center text-[10px] md:text-[11px] text-gray-500 font-bold uppercase tracking-[0.2em] gap-2 flex-wrap">
            <Link className="hover:text-black transition-colors" to="/">Home</Link> 
            <span>/</span>
            <span className="text-black">Checkout</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12 md:py-24">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-20">
          {/* Left Column: Billing */}
          <div className="space-y-8 md:space-y-12">
            <h2 className="text-2xl md:text-3xl font-normal text-black uppercase tracking-tight">Detalhes de Faturação</h2>
            <div className="space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <div className="space-y-2">
                  <label className="block text-[9px] md:text-[11px] font-bold text-black uppercase tracking-widest">Primeiro Nome*</label>
                  <input name="firstName" onChange={handleInputChange} value={formData.firstName} className="w-full border border-gray-100 p-3 md:p-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#748B9C] transition-all" required type="text"/>
                </div>
                <div className="space-y-2">
                  <label className="block text-[9px] md:text-[11px] font-bold text-black uppercase tracking-widest">Apelido*</label>
                  <input name="lastName" onChange={handleInputChange} value={formData.lastName} className="w-full border border-gray-100 p-3 md:p-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#748B9C] transition-all" required type="text"/>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[9px] md:text-[11px] font-bold text-black uppercase tracking-widest">País / Região*</label>
                <div className="relative">
                  <select className="w-full border border-gray-100 p-3 md:p-4 text-sm focus:outline-none appearance-none bg-white focus:ring-1 focus:ring-[#748B9C] transition-all">
                    <option>Angola</option>
                    <option>Portugal</option>
                    <option>Brasil</option>
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[9px] md:text-[11px] font-bold text-black uppercase tracking-widest">Endereço de Rua*</label>
                <input name="address" onChange={handleInputChange} value={formData.address} className="w-full border border-gray-100 p-3 md:p-4 text-sm focus:outline-none mb-0 md:mb-4 focus:ring-1 focus:ring-[#748B9C] transition-all" placeholder="Número da casa e nome da rua" required type="text"/>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <div className="space-y-2">
                  <label className="block text-[9px] md:text-[11px] font-bold text-black uppercase tracking-widest">Vila / Cidade*</label>
                  <input name="city" onChange={handleInputChange} value={formData.city} className="w-full border border-gray-100 p-3 md:p-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#748B9C] transition-all" required type="text"/>
                </div>
                <div className="space-y-2">
                  <label className="block text-[9px] md:text-[11px] font-bold text-black uppercase tracking-widest">Província*</label>
                  <input name="province" onChange={handleInputChange} value={formData.province} className="w-full border border-gray-100 p-3 md:p-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#748B9C] transition-all" required type="text"/>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <div className="space-y-2">
                  <label className="block text-[9px] md:text-[11px] font-bold text-black uppercase tracking-widest">Telefone*</label>
                  <input name="phone" onChange={handleInputChange} value={formData.phone} className="w-full border border-gray-100 p-3 md:p-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#748B9C] transition-all" required type="text"/>
                </div>
                <div className="space-y-2">
                  <label className="block text-[9px] md:text-[11px] font-bold text-black uppercase tracking-widest">Endereço de Email*</label>
                  <input name="email" onChange={handleInputChange} value={formData.email} className="w-full border border-gray-100 p-3 md:p-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#748B9C] transition-all" required type="email"/>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[9px] md:text-[11px] font-bold text-black uppercase tracking-widest">NIF (Número de Identificação Fiscal)*</label>
                <input name="nif" onChange={handleInputChange} value={formData.nif} className="w-full border border-gray-100 p-3 md:p-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#748B9C] transition-all" placeholder="Ex: 5000123456" required type="text"/>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8 md:space-y-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-normal text-black uppercase tracking-tight mb-6 md:mb-8">Resumo do Pedido</h2>
              <div className="border-t border-gray-100">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between py-3 md:py-4 border-b border-gray-100 text-xs md:text-sm">
                    <span className="text-gray-500 uppercase tracking-widest line-clamp-1">{item.name} x {item.quantity}</span>
                    <span className="font-bold text-black ml-2">{item.price}</span>
                  </div>
                ))}
                <div className="flex justify-between py-3 md:py-4 border-b border-gray-100 uppercase tracking-widest font-bold">
                  <span className="text-[9px] md:text-[11px]">Total</span>
                  <span className="text-xs md:text-sm text-[#748B9C]">{totalPrice.toLocaleString()} Kz</span>
                </div>
              </div>
            </div>

            <div className="pt-6 md:pt-8 space-y-4 md:space-y-6">
              <div className="space-y-3 md:space-y-4">
                <label className="flex items-start gap-3 md:gap-4 cursor-pointer">
                  <input defaultChecked className="mt-1 w-4 h-4 accent-black shrink-0" name="payment" type="radio"/>
                  <span className="block text-[9px] md:text-[11px] font-bold text-black uppercase tracking-widest">Transferência Bancária Direta</span>
                </label>
                <label className="flex items-start gap-3 md:gap-4 cursor-pointer">
                  <input className="mt-1 w-4 h-4 accent-black shrink-0" name="payment" type="radio"/>
                  <span className="text-[9px] md:text-[11px] font-bold text-black uppercase tracking-widest">Pagamento na Entrega</span>
                </label>
              </div>
              <button 
                type="submit"
                disabled={orderStatus === 'processing' || cartItems.length === 0}
                className="w-full bg-black text-white font-bold text-[9px] md:text-xs uppercase tracking-[0.2em] py-4 md:py-6 hover:bg-[#748B9C] transition-colors disabled:bg-gray-300"
              >
                {orderStatus === 'processing' ? 'A processar...' : 'Finalizar Pedido'}
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

