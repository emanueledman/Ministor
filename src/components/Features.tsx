const features = [
  {
    icon: <svg className="w-8 h-8 text-black opacity-30"><use xlinkHref="#cart-outline"></use></svg>,
    title: "ENTREGA GRÁTIS",
    description: "Consectetur adipi elit lorem ipsum dolor sit amet."
  },
  {
    icon: <svg className="w-8 h-8 text-black opacity-30"><use xlinkHref="#quality"></use></svg>,
    title: "GARANTIA DE QUALIDADE",
    description: "Dolor sit amet orem ipsu mcons ectetur adipi elit."
  },
  {
    icon: <svg className="w-8 h-8 text-black opacity-30"><use xlinkHref="#price-tag"></use></svg>,
    title: "OFERTAS DIÁRIAS",
    description: "Amet consectetur adipi elit lore m ipsum dolor sit."
  },
  {
    icon: <svg className="w-8 h-8 text-black opacity-30"><use xlinkHref="#shield-plus"></use></svg>,
    title: "PAGAMENTO 100% SEGURO",
    description: "Rem ipsum dolor sit amet, consectetur adipi elit."
  }
];

export default function Features() {
  return (
    <section id="company-services" className="py-8 md:py-24 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-3 md:gap-0">
              <div className="shrink-0 md:mr-4 mt-0 md:mt-1 [&_svg]:w-6 [&_svg]:h-6 md:[&_svg]:w-8 md:[&_svg]:h-8">{feature.icon}</div>
              <div className="flex flex-col">
                <h3 className="text-[10px] md:text-lg font-bold mb-0 md:mb-2 uppercase tracking-[0.2em] md:tracking-widest leading-tight">
                  {feature.title}
                </h3>
                <p className="hidden md:block text-gray-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
