import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useFirebase } from '../context/FirebaseContext';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setSearchQuery, setSelectedCategory } = useProductContext();
  const { totalItems } = useCart();
  const { auth, user } = useFirebase();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setIsSearchOpen(false);
    if (location.pathname !== '/shop') {
      navigate('/shop');
    }
  };

  const handleCategoryClick = (cat: string) => {
    const categoryMap: { [key: string]: string } = {
      'Telemóveis': 'Phones',
      'Relógios Inteligentes': 'Watches',
      'Acessórios': 'Accessories',
      'Computadores': 'Computers',
      'Material Informático': 'IT Materials'
    };
    setSelectedCategory(categoryMap[cat] || 'Tudo');
    setIsSearchOpen(false);
    if (location.pathname !== '/shop') {
      navigate('/shop');
    }
  };

  const handleLogin = async () => {
    if (!auth || isLoggingIn) return;
    setIsLoggingIn(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.code === 'auth/popup-blocked') {
        alert('O login foi bloqueado pelo seu navegador. Por favor, permita popups para este site.');
      } else if (error.code === 'auth/cancelled-popup-request') {
        // User closed the popup or clicked twice
      } else {
        alert('Erro ao tentar fazer login. Por favor, tente novamente.');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
    navigate('/');
  };

  const navItems = [
    { label: 'Início', href: '/' },
    { label: 'Loja', href: '/shop' },
    { label: 'Sobre', href: '/about' },
    { label: 'Histórico', href: '/history' },
    { label: 'Checkout', href: '/checkout' },
  ];

  const categoryDisplayList = [
    "Telemóveis", "Relógios Inteligentes", "Computadores", "Material Informático", "Acessórios"
  ];

  return (
    <>
      {/* Search Popup */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-white z-[100] flex items-center justify-center animate-in fade-in duration-300 overflow-y-auto">
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-4 sm:top-10 right-4 sm:right-10 text-black hover:text-gray-500 transition-colors"
          >
            <svg className="w-8 sm:w-10 h-8 sm:h-10"><use xlinkHref="#close"></use></svg>
          </button>
          <div className="container max-w-2xl px-4 py-12 sm:py-0 text-center">
            <form onSubmit={handleSearchSubmit} className="relative border-b-2 border-black mb-8 sm:mb-12">
              <input 
                autoFocus
                type="search" 
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Digite e pressione enter" 
                className="w-full py-2 sm:py-4 px-2 text-lg sm:text-2xl font-light focus:outline-none placeholder:text-gray-300 uppercase tracking-widest"
              />
              <button type="submit" className="absolute right-0 bottom-2 sm:bottom-4">
                <svg className="w-5 sm:w-6 h-5 sm:h-6"><use xlinkHref="#search"></use></svg>
              </button>
            </form>
            <h5 className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] mb-4 sm:mb-6">Navegar por Categorias</h5>
            <ul className="flex flex-wrap justify-center gap-3 sm:gap-6">
              {categoryDisplayList.map((cat) => (
                <li key={cat}>
                  <button 
                    onClick={() => handleCategoryClick(cat)}
                    className="text-gray-500 hover:text-black uppercase tracking-widest text-[10px] sm:text-xs transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <header id="header" className="fixed top-0 left-0 w-full bg-light border-b border-gray-100 z-50">
        <nav className="container mx-auto px-3 sm:px-4 py-3 md:py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-xl sm:text-2xl font-bold tracking-tighter uppercase shrink-0">
              <span className="text-black">Mini</span>
              <span className="text-gray-400 font-light">Store</span>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link 
                    to={item.href} 
                    className="text-[11px] font-bold uppercase tracking-[0.2em] text-black hover:text-gray-500 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a 
                  href="#" 
                  className="px-6 py-2 border border-black rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                >
                  Obter PRO
                </a>
              </li>
            </ul>

            {/* Utility Icons */}
            <div className="flex items-center space-x-3 sm:space-x-6">
              <button onClick={() => setIsSearchOpen(true)} className="text-black hover:text-gray-500 transition-colors hidden sm:block">
                <svg className="w-5 h-5"><use xlinkHref="#search"></use></svg>
              </button>
              
              {user ? (
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 group hidden sm:flex"
                  title="Sair"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100 group-hover:border-black transition-colors">
                    <img src={user.photoURL || ''} alt={user.displayName || ''} className="w-full h-full object-cover" />
                  </div>
                </button>
              ) : (
                <button 
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  className={`text-black hover:text-gray-500 transition-colors hidden sm:block ${isLoggingIn ? 'opacity-50 cursor-wait' : ''}`}
                  title="Entrar com Google"
                >
                  {isLoggingIn ? (
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg className="w-5 h-5"><use xlinkHref="#user"></use></svg>
                  )}
                </button>
              )}

              <Link to="/cart" className="text-black hover:text-gray-500 transition-colors relative group">
                <svg className="w-5 h-5"><use xlinkHref="#cart"></use></svg>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-[8px] sm:text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center group-hover:bg-[#72aec8] transition-colors">
                    {totalItems}
                  </span>
                )}
                <span className="sr-only">Carrinho</span>
              </Link>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-black"
              >
                <svg className="w-6 h-6"><use xlinkHref="#navbar-icon"></use></svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden mt-3 pt-4 border-t border-gray-100 flex flex-col space-y-3 animate-in slide-in-from-top duration-300">
              <button 
                onClick={() => {setIsSearchOpen(true); setIsMenuOpen(false);}}
                className="sm:hidden text-left text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
              >
                Pesquisar
              </button>
              {navItems.map((item) => (
                <Link 
                  key={item.label} 
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-xs font-bold uppercase tracking-widest text-black hover:text-gray-500"
                >
                  {item.label}
                </Link>
              ))}
              {!user && (
                <button 
                  onClick={() => {handleLogin(); setIsMenuOpen(false);}}
                  className="sm:hidden text-left text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
                >
                  Entrar com Google
                </button>
              )}
              <a 
                href="#" 
                className="inline-block px-6 py-2 border border-black rounded-full text-[10px] font-bold uppercase tracking-widest text-center"
              >
                Obter PRO
              </a>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
