/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Subscribe from '../components/Subscribe';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState('descrição');
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Preto');
  const [selectedSize, setSelectedSize] = useState('M');

  const product = useMemo(() => {
    return products.find(p => p.id === id);
  }, [id]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="pt-40 pb-24 text-center">
        <h2 className="text-3xl font-light uppercase tracking-widest mb-8">Produto Não Encontrado</h2>
        <Link to="/shop" className="btn-medium btn-dark inline-block">Voltar à Loja</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      numericPrice: product.numericPrice,
      image: product.image,
      quantity: quantity,
      color: selectedColor,
      size: selectedSize
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const colors = ['Verde', 'Laranja', 'Vermelho', 'Preto'];
  const sizes = ['XL', 'L', 'M', 'S'];

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-[#edf1f3] py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-black mb-4 uppercase">
            {product.name}
          </h1>
          <nav className="flex justify-center text-[11px] text-gray-500 font-bold uppercase tracking-[0.2em] gap-2">
            <Link className="hover:text-black transition-colors" to="/">Início</Link> / 
            <span className="text-black">Detalhe do Produto</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image */}
          <div className="relative bg-[#f1f1f1] flex items-center justify-center p-12 overflow-hidden group">
            <img 
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-contain max-h-[600px] transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <h2 className="text-4xl font-normal text-black mb-2 uppercase tracking-tight">{product.name}</h2>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                ))}
              </div>
              <span className="text-xs font-bold text-gray-400">({product.rating} Avaliações)</span>
            </div>
            
            <p className="text-4xl font-normal text-[#748B9C] mb-8">{product.price}</p>
            
            <p className="text-gray-400 leading-relaxed text-sm mb-12 font-body max-w-lg">
              {product.description}
            </p>

            <div className="space-y-8">
              {/* Color */}
              <div>
                <h4 className="text-xs font-bold border-b border-black inline-block mb-4 tracking-widest cursor-default">COR: {selectedColor}</h4>
                <div className="flex gap-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                  {colors.map(color => (
                    <button 
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`transition-colors ${selectedColor === color ? 'text-black underline underline-offset-4' : 'hover:text-black'}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <h4 className="text-xs font-bold border-b border-black inline-block mb-4 tracking-widest cursor-default">TAMANHO: {selectedSize}</h4>
                <div className="flex gap-4 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                  {sizes.map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`transition-colors ${selectedSize === size ? 'text-black underline underline-offset-4' : 'hover:text-black'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 block">Em stock</span>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center border border-gray-200">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:bg-gray-50 transition-colors">-</button>
                    <input type="text" value={quantity} readOnly className="w-12 text-center border-none font-bold text-xs" />
                    <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-gray-50 transition-colors">+</button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={handleBuyNow}
                  className="bg-[#748B9C] text-white px-10 py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-black transition-colors"
                >
                  COMPRAR JÁ
                </button>
                <button 
                  onClick={handleAddToCart}
                  className="bg-black text-white px-10 py-4 text-[11px] font-bold tracking-widest uppercase hover:bg-[#748B9C] transition-colors"
                >
                  ADICIONAR AO CARRINHO
                </button>
              </div>

              {/* Metadata */}
              <div className="pt-12 space-y-3 text-[11px] font-bold uppercase tracking-widest text-black">
                <p><span className="text-gray-400">SKU:</span> {product.sku}</p>
                <p><span className="text-gray-400">Categoria:</span> {product.category}</p>
                <p><span className="text-gray-400">Tags:</span> {product.tags.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="container mx-auto px-4 py-20 border-t">
        <div className="flex gap-12 mb-10 border-b border-gray-100 pb-4 overflow-x-auto">
          {['Descrição', 'Informação Adicional', 'Avaliações (12)'].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-colors ${activeTab === tab.toLowerCase() ? 'text-black border-b-2 border-black pb-4 -mb-[18px]' : 'text-gray-500 hover:text-black'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="min-h-[200px]">
          {activeTab === 'descrição' && (
            <p className="text-gray-500 text-sm leading-relaxed max-w-4xl animate-in fade-in duration-500">
              {product.description}
            </p>
          )}
          {activeTab === 'informação adicional' && (
            <div className="space-y-4 animate-in fade-in duration-500">
              <p className="text-gray-500 text-sm uppercase tracking-widest"><span className="font-bold text-black">Peso:</span> 0.5 kg</p>
              <p className="text-gray-500 text-sm uppercase tracking-widest"><span className="font-bold text-black">Dimensões:</span> 15 x 10 x 5 cm</p>
            </div>
          )}
          {activeTab === 'avaliações (12)' && (
            <p className="text-gray-400 text-sm italic animate-in fade-in duration-500">Ainda não existem avaliações para este produto.</p>
          )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="container mx-auto px-4 py-24">
          <div className="flex justify-between items-center mb-16 border-b border-gray-100 pb-4">
            <h2 className="text-3xl font-light uppercase tracking-widest">Produtos Relacionados</h2>
            <Link className="text-[10px] font-bold uppercase tracking-widest text-black hover:text-[#748B9C] transition-colors" to="/shop">Ver Todos</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p) => (
              <div key={p.id} className="group flex flex-col">
                <Link to={`/product/${p.id}`} className="relative bg-[#f1f1f1] aspect-[0.8] flex items-center justify-center p-8 mb-6 transition-all duration-300 hover:bg-[#e1e1e1]">
                  <img alt={p.name} className="max-h-[80%] object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply" src={p.image}/>
                  <button className="absolute bottom-0 left-0 w-full bg-black text-white py-4 text-[10px] font-bold tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity uppercase">
                    ADICIONAR AO CARRINHO
                  </button>
                </Link>
                <div className="flex justify-between items-center px-1">
                  <h3 className="text-sm font-medium uppercase tracking-widest text-[#212529]">
                    <Link to={`/product/${p.id}`} className="hover:text-gray-500">{p.name}</Link>
                  </h3>
                  <span className="text-sm font-bold text-[#72aec8]">{p.price}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <Subscribe />
    </div>
  );
}
