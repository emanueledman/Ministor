export default function Subscribe() {
  return (
    <section id="subscribe" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="bg-black p-12 md:p-20 flex flex-wrap justify-center items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <div className="pr-0 md:pr-12 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-light uppercase tracking-tighter text-white mb-4">
                Subscreva agora
              </h2>
              <p className="text-gray-400 text-sm">
                Receba as últimas notícias, atualizações e ofertas diretamente na sua caixa de entrada.
              </p>
            </div>
          </div>
          <div className="w-full md:w-5/12">
            <form className="flex">
              <input 
                type="email" 
                placeholder="O seu endereço de email aqui" 
                className="w-full bg-white border-0 py-4 px-6 text-xs uppercase font-bold tracking-widest focus:outline-none placeholder:text-gray-400 rounded-l-none"
              />
              <button 
                type="submit"
                className="bg-[#72AEC8] text-white px-8 md:px-12 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#5d92a8] transition-colors shrink-0"
              >
                Subscrever
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
