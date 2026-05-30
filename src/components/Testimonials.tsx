import { Star, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    text: "“Tempus oncu enim pellen tesque este pretium in neque, elit morbi sagittis lorem habi mattis Pellen tesque pretium feugiat vel morbi suspen dise sagittis lorem habi tasse morbi.”",
    author: "Emma Chamberlin",
    rating: 4.5
  },
  {
    text: "“A blog is a digital publication that can complement a website or exist independently. A blog may include articles, short posts, listicles, infographics, videos, and other digital content.”",
    author: "Jennie Rose",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-12">
          <Quote size={60} className="text-[#F3F3F3]" fill="currentColor" />
        </div>
        
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 6000 }}
          className="max-w-4xl"
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index}>
              <div className="text-center pb-16">
                <blockquote className="text-2xl md:text-3xl font-light italic text-gray-700 mb-8 leading-relaxed">
                  {t.text}
                </blockquote>
                
                <div className="flex justify-center space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      className={i < Math.floor(t.rating) ? "text-black fill-black" : i < t.rating ? "text-black fill-black/50" : "text-gray-200"} 
                    />
                  ))}
                </div>
                
                <p className="text-lg font-bold uppercase tracking-widest text-black">
                  {t.author}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .swiper-pagination-bullet { width: 10px; height: 10px; background: #000; opacity: 0.2; }
        .swiper-pagination-bullet-active { opacity: 1; border-radius: 5px; }
      `}} />
    </section>
  );
}
