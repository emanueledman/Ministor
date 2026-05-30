/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Symbols from './components/Symbols';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Shop from './pages/Shop';
import Blog from './pages/Blog';
import About from './pages/About';
import Cart from './pages/Cart';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { FirebaseProvider } from './context/FirebaseContext';
import VirtualAssistant from './components/VirtualAssistant';
import DocumentHistory from './pages/DocumentHistory';

export default function App() {
  return (
    <Router>
      <FirebaseProvider>
        <ProductProvider>
        <CartProvider>
          <div className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white scroll-smooth pt-16 md:pt-20">
          <Symbols />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/history" element={<DocumentHistory />} />
            </Routes>
          </main>
          <Footer />
          <VirtualAssistant />
        </div>
        </CartProvider>
      </ProductProvider>
      </FirebaseProvider>
    </Router>
  );
}

