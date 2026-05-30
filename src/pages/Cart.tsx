import { Link } from 'react-router-dom';
import Subscribe from '../components/Subscribe';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-[#edf1f3] py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-black mb-4 uppercase">
            Carrinho
          </h1>
          <nav className="flex justify-center text-[11px] text-gray-500 font-bold uppercase tracking-[0.2em] gap-2">
            <Link className="hover:text-black transition-colors" to="/">Início</Link> / 
            <span className="text-black">Carrinho</span>
          </nav>
        </div>
      </section>

      {/* Cart Content */}
      <section className="container mx-auto px-4 py-24">
        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-3xl font-light uppercase tracking-widest mb-8 text-gray-400">O seu carrinho está vazio</h2>
            <Link to="/shop" className="btn-medium btn-dark inline-block">Ir para a Loja</Link>
          </div>
        ) : (
          <>
            <div className=\"grid grid-cols-1 sm:grid-cols-4 gap-4 md:gap-8 border-b border-gray-100 pb-6 md:pb-10 mb-6 md:mb-10 text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-[#212529]\">
              <div className=\"sm:col-span-2\">Produto</div>
              <div className=\"text-center\">Quantidade</div>
              <div className=\"text-right hidden sm:block\">Subtotal</div>
            </div>

            <div className=\"space-y-6 md:space-y-12\">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.color}-${item.size}`} className=\"grid grid-cols-1 sm:grid-cols-4 gap-4 md:gap-8 items-start sm:items-center border-b border-gray-50 pb-6 md:pb-12\">
                  <div className=\"col-span-1 sm:col-span-2 flex items-start sm:items-center gap-3 md:gap-8\">
                    <Link to={`/product/${item.id}`} className="w-16 h-20 md:w-24 md:h-32 bg-[#f1f1f1] p-2 md:p-4 flex items-center justify-center shrink-0 hover:bg-[#e1e1e1] transition-colors rounded">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                    </Link>
                    <div className="space-y-1 flex-1">
                      <h3 className="text-xs md:text-sm font-bold uppercase tracking-widest hover:text-[#748B9C] transition-colors line-clamp-2">
                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                      </h3>
                      <p className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-widest line-clamp-1">
                        {item.color && `Cor: ${item.color}`} {item.size && ` | Tam: ${item.size}`}
                      </p>
                      <p className="text-xs md:text-sm font-bold text-[#748B9C]">{item.price}</p>
                    </div>
                  </div>

                  <div className="col-span-1 sm:col-span-1">
                    <div className="flex items-center justify-center border border-gray-200">
                       <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 md:px-4 md:py-2 hover:bg-gray-50 transition-colors text-sm"
                       >−</button>
                       <input type="text" value={item.quantity} className="w-8 md:w-12 text-center border-none font-bold text-xs md:text-sm focus:ring-0" readOnly />
                       <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 md:px-4 md:py-2 hover:bg-gray-50 transition-colors text-sm"
                       >+</button>
                    </div>
                  </div>

                  <div className="col-span-1 text-right hidden sm:block">
                    <p className="text-lg md:text-xl font-normal text-[#748B9C] tracking-tight">{(item.numericPrice * item.quantity).toLocaleString()} Kz</p>
                  </div>

                  <div className="col-span-1 text-center hidden sm:block">
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-xl md:text-2xl font-light hover:text-red-500 transition-all duration-300 w-8 h-8 flex items-center justify-center"
                      title="Remover"
                    >×</button>
                  </div>
                </div>
              ))}
            </div>


            {/* Cart Summary Mobile */}
            <div className="mt-8 md:mt-0 bg-gray-50 p-4 md:p-6 rounded md:hidden mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase tracking-widest">Subtotal</span>
                <span className="text-sm font-bold text-[#748B9C]">{totalPrice.toLocaleString()} Kz</span>
              </div>
              <div className="flex justify-between items-center text-base font-bold mb-4">
                <span className="uppercase tracking-widest">Total</span>
                <span className="text-lg text-[#748B9C]">{totalPrice.toLocaleString()} Kz</span>
              </div>
              <Link to="/checkout" className="btn-medium btn-dark w-full text-center block">
                Finalizar Compra
              </Link>
            </div>

            {/* Cart Totals Desktop */}
            <div className="mt-12 md:mt-20 flex justify-end hidden md:flex">
              <div className="w-full lg:w-1/3 space-y-8">
                <h2 className="text-3xl font-normal text-black uppercase tracking-tight mb-8">Totais do Carrinho</h2>
                <div className="border-t border-gray-100">
                  <div className="flex justify-between py-6 border-b border-gray-100">
                    <span className="text-[11px] font-bold uppercase tracking-widest">Subtotal</span>
                    <span className="text-sm font-bold text-[#748B9C]">{totalPrice.toLocaleString()} Kz</span>
                  </div>
                  <div className="flex justify-between py-6 border-b border-gray-100">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-black">Total</span>
                    <span className="text-xl font-bold text-[#748B9C]">{totalPrice.toLocaleString()} Kz</span>
                  </div>
                </div>
                <Link to="/checkout" className="btn-medium btn-dark w-full text-center block">
                  Finalizar Compra
                </Link>
              </div>
            </div>
          </>
        )}
      </section>

      <Subscribe />
    </div>
  );
}
