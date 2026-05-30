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
    title: "Produtos de qualidade.",
    subtitle: "Novos Relógios Inteligentes",
    image: "https://demo.templatesjungle.com/ministore/images/banner-image.png",
    linkText: "Comprar Produto"
  }
];

export default function Hero() {
  return (
    <section id="billboard" className="relative w-full bg-light-blue pt-12 pb-8 md:pt-28 md:pb-16">
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        navigation={{
          nextEl: '.swiper-arrow-next',
          prevEl: '.swiper-arrow-prev',
        }}
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
                <div className="w-full md:w-1/2">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 bg-white/95 p-4 rounded-lg md:bg-transparent md:p-0"
                  >
                    <h1 className="text-3xl md:text-6xl lg:text-7xl font-light tracking-tight text-black mb-4 md:mb-6 leading-[1.1] uppercase text-center md:text-left">
                      {slide.title}
                    </h1>

                    <div className="mt-3 md:mt-0">
                      <Link
                        to={`/product/${slide.id}`}
                        className="btn-medium btn-dark inline-block text-sm md:text-base w-full md:w-auto text-center"
                      >
                        {slide.linkText}
                      </Link>
                    </div>
                  </motion.div>
                </div>

                <div className="w-full md:w-5/12 flex items-center justify-center mt-6 md:mt-0 relative">
                  <motion.img 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    src={slide.image} 
                    alt={slide.title}
                    className="max-h-[160px] md:max-h-[320px] lg:max-h-[420px] w-full object-contain drop-shadow-2xl relative z-0"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Arrows */}
      <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-4 md:left-10 z-10 cursor-pointer swiper-arrow-prev opacity-30 hover:opacity-100 transition-opacity">
        <svg className="w-8 md:w-10 h-8 md:h-10"><use xlinkHref="#chevron-left"></use></svg>
      </div>
      <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-4 md:right-10 z-10 cursor-pointer swiper-arrow-next opacity-30 hover:opacity-100 transition-opacity">
        <svg className="w-8 md:w-10 h-8 md:h-10"><use xlinkHref="#chevron-right"></use></svg>
      </div>
    </section>
  );
}
