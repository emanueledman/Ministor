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
              <div className="relative overflow-hidden rounded-2xl md:rounded-none min-h-[420px] md:min-h-0 md:flex md:items-center md:justify-between md:gap-12">
                <div className="absolute inset-0 md:hidden">
                  <motion.img 
                    initial={{ opacity: 0, scale: 1.02 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    src={slide.image} 
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/25" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                </div>

                <div className="relative z-10 w-full md:w-1/2 px-6 py-10 md:px-0 md:py-0">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-xl mx-auto md:mx-0 text-center md:text-left"
                  >
                    <h1 className="text-3xl md:text-6xl lg:text-7xl font-light tracking-tight text-white md:text-black mb-4 md:mb-6 leading-[1.1] uppercase">
                      {slide.title}
                    </h1>

                    <Link
                      to={`/product/${slide.id}`}
                      className="btn-medium btn-dark inline-flex text-sm md:text-base"
                    >
                      {slide.linkText}
                    </Link>
                  </motion.div>
                </div>

                <div className="hidden md:flex md:w-5/12 items-center justify-center relative">
                  <motion.img 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    src={slide.image} 
                    alt={slide.title}
                    className="max-h-[320px] lg:max-h-[420px] w-full object-contain drop-shadow-2xl relative z-0"
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
