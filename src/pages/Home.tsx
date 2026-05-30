/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Hero from '../components/Hero';
import Features from '../components/Features';
import ProductGrid from '../components/ProductGrid';
import Banner from '../components/Banner';
import LatestPosts from '../components/LatestPosts';
import Testimonials from '../components/Testimonials';
import Subscribe from '../components/Subscribe';
import { products } from '../data/products';

export default function Home() {
  const mobileProducts = products.filter(p => p.category === 'Phones').slice(0, 5);
  const watchProducts = products.filter(p => p.category === 'Watches').slice(0, 5);

  return (
    <>
      <Hero />
      <Features />
      
      <section id="mobile-products">
        <ProductGrid 
          title="Produtos Móveis" 
          products={mobileProducts} 
          linkText="Ir para a Loja" 
        />
      </section>
      
      <section id="smart-watches">
        <ProductGrid 
          title="Relógios Inteligentes" 
          products={watchProducts} 
          linkText="Ir para a Loja" 
        />
      </section>
      
      <Banner />

      
      <section id="latest-blog">
        <LatestPosts />
      </section>
      
      <Testimonials />
      
      <section id="subscribe">
        <Subscribe />
      </section>
      
      {/* Instagram Feed Section */}
      <section id="instagram" className="py-24 border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-light uppercase tracking-[0.3em] mb-12">Nossa Loja no Insta</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="aspect-square bg-gray-100 overflow-hidden relative group cursor-pointer">
                <img 
                  src={`https://images.unsplash.com/photo-15${5740420928 + i}-5e560c06d30e?q=80&w=300&auto=format&fit=crop`} 
                  alt="Insta" 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-xs font-bold uppercase tracking-widest">@ministore</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
