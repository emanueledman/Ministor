import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: "4",
    title: "Seus Produtos São Excelentes.",
    subtitle: "Truques tecnológicos que você não terá",
    image: "https://images.unsplash.com/photo-1546868889-4e0ca9994bb0?q=80&w=2000&auto=format&fit=crop",
    linkText: "Comprar Produto"
  },
  {
    id: "w1",
    title: "O Truque Tecnológico Que Você Não Terá.",
    subtitle: "Novos Relógios Inteligentes",
    image: "https://demo.templatesjungle.com/ministore/images/banner-image.png",
    linkText: "Comprar Produto"
  }
];

export default function Hero() {
  return (
    <section id="billboard" className="relative w-full bg-light-blue pt-32 pb-20 md:py-40">
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        navigation={{
          nextEl: '.swiper-arrow-next',
          prevEl: '.swiper-arrow-prev',
        }}
        className="container mx-auto"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="w-full md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-5xl md:text-8xl font-light tracking-tight text-black mb-8 leading-[1.1] uppercase">
                    {slide.title}
                  </h1>
                  <Link
                    to={`/product/${slide.id}`}
                    className="btn-medium btn-dark inline-block"
                  >
                    {slide.linkText}
                  </Link>
                </motion.div>
              </div>
              <div className="w-full md:w-5/12 flex items-center justify-center">
                 <motion.img 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  src={slide.image} 
                  alt={slide.title}
                  className="max-h-[400px] md:max-h-[500px] object-contain drop-shadow-2xl"
                 />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Arrows */}
      <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-10 z-10 cursor-pointer swiper-arrow-prev opacity-30 hover:opacity-100 transition-opacity">
        <svg className="w-10 h-10"><use xlinkHref="#chevron-left"></use></svg>
      </div>
      <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-10 z-10 cursor-pointer swiper-arrow-next opacity-30 hover:opacity-100 transition-opacity">
        <svg className="w-10 h-10"><use xlinkHref="#chevron-right"></use></svg>
      </div>
    </section>
  );
}
