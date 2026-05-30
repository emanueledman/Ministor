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
    <section id="company-services" className="py-20 md:py-24 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <div className="shrink-0 mr-4 mt-1">{feature.icon}</div>
              <div className="flex flex-col">
                <h3 className="text-lg font-bold mb-2 uppercase tracking-widest">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
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
