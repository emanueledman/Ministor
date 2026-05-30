import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer id="footer" className="overflow-hidden bg-white pt-24">
      <div className="container mx-auto px-4">
        <div className="row flex flex-wrap justify-between border-b pb-12 mb-12">
          <div className="col-lg-3 col-sm-6 w-full lg:w-1/4 pb-3 pr-8">
            <div className="footer-menu">
              <Link to="/" className="text-2xl font-bold tracking-tighter uppercase mb-6 block">
                <span className="text-black">Mini</span>
                <span className="text-gray-400 font-light">Store</span>
              </Link>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Nisl bibe endum ut porta arcu nisl tempor commodo diam neque.
              </p>
              <div className="social-links">
                <ul className="flex space-x-4">
                  <li><a href="#"><svg className="w-5 h-5 text-gray-400 hover:text-black transition-colors"><use xlinkHref="#facebook"></use></svg></a></li>
                  <li><a href="#"><svg className="w-5 h-5 text-gray-400 hover:text-black transition-colors"><use xlinkHref="#instagram"></use></svg></a></li>
                  <li><a href="#"><svg className="w-5 h-5 text-gray-400 hover:text-black transition-colors"><use xlinkHref="#twitter"></use></svg></a></li>
                  <li><a href="#"><svg className="w-5 h-5 text-gray-400 hover:text-black transition-colors"><use xlinkHref="#linkedin"></use></svg></a></li>
                  <li><a href="#"><svg className="w-5 h-5 text-gray-400 hover:text-black transition-colors"><use xlinkHref="#youtube"></use></svg></a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-sm-6 w-1/2 lg:w-1/6 pb-3">
            <div className="footer-menu uppercase">
              <h5 className="text-sm font-bold pb-6 tracking-widest">Links Rápidos</h5>
              <ul className="menu-list space-y-4 text-[10px] tracking-widest text-gray-500 font-bold">
                <li><Link to="/" className="hover:text-black transition-colors">Início</Link></li>
                <li><Link to="/about" className="hover:text-black transition-colors">Sobre</Link></li>
                <li><Link to="/shop" className="hover:text-black transition-colors">Loja</Link></li>
                <li><Link to="/blog" className="hover:text-black transition-colors">Blogs</Link></li>
                <li><a href="#" className="hover:text-black transition-colors">Contacte-nos</a></li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6 w-1/2 lg:w-1/4 pb-3">
            <div className="footer-menu uppercase">
              <h5 className="text-sm font-bold pb-6 tracking-widest">Ajuda & Informação</h5>
              <ul className="menu-list space-y-4 text-[10px] tracking-widest text-gray-500 font-bold">
                <li><a href="#" className="hover:text-black transition-colors">Rastrear Seu Pedido</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Políticas de Devolução</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Envio + Entrega</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Contacte-nos</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Perguntas Frequentes</a></li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-sm-6 w-full lg:w-1/4 pb-3">
            <div className="footer-menu contact-item">
              <h5 className="text-sm font-bold pb-6 tracking-widest uppercase">Contacte-nos</h5>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Tem dúvidas ou sugestões? <br />
                <a href="mailto:vossainfo@gmail.com" className="hover:text-black border-b border-gray-300">vossainfo@gmail.com</a>
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Precisa de suporte? Ligue-nos. <br />
                <a href="tel:+244900000000" className="hover:text-black border-b border-gray-300">+244 900 000 000</a>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center py-10 text-[10px] font-bold uppercase tracking-widest text-gray-400">
           <div className="flex items-center space-x-4 mb-4 md:mb-0">
             <p>Enviamos com:</p>
             <div className="flex space-x-2 grayscale opacity-50">
                <span className="bg-gray-100 px-2 py-1">DHL</span>
                <span className="bg-gray-100 px-2 py-1">UPS</span>
             </div>
           </div>
           <div className="flex items-center space-x-4 mb-4 md:mb-0">
             <p>Opções de pagamento:</p>
             <div className="flex space-x-2 grayscale opacity-50">
                <span className="bg-gray-100 px-2 py-1">Visa</span>
                <span className="bg-gray-100 px-2 py-1">Mastercard</span>
                <span className="bg-gray-100 px-2 py-1">Paypal</span>
             </div>
           </div>
           <p>© Copyright 2023 MiniStore. Design por TemplatesJungle</p>
        </div>
      </div>
    </footer>
  );
}
