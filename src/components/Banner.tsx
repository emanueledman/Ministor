import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Banner() {
  return (
    <section id="yearly-sale" className="relative w-full h-[400px] md:h-[600px] bg-light-blue overflow-hidden">
      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="w-full md:w-1/2 z-10 flex flex-col items-center md:items-start text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-black text-xl uppercase tracking-[0.3em] block mb-4">10% de Desconto</h3>
            <h2 className="text-6xl md:text-8xl font-light tracking-tight mb-10 uppercase leading-none text-black">
              Venda de <br /> <span className="font-bold">ano novo</span>
            </h2>
            <Link to="/shop" className="btn-medium btn-dark inline-block">
              Comprar Promoção
            </Link>
          </motion.div>
        </div>
        
        <div className="hidden lg:block absolute right-0 top-0 w-1/2 h-full">
           <img 
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2000&auto=format&fit=crop" 
            alt="New Year Sale" 
            className="w-full h-full object-cover grayscale opacity-80"
           />
        </div>
      </div>
    </section>
  );
}
