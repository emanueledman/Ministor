import Features from '../components/Features';
import Subscribe from '../components/Subscribe';

export default function About() {
  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-[#edf1f3] py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-black mb-4 uppercase">
            Sobre Nós
          </h1>
          <nav className="flex justify-center text-[11px] text-gray-500 font-bold uppercase tracking-[0.2em] gap-2">
            <a className="hover:text-black transition-colors" href="/">Início</a> / 
            <span className="text-black">Sobre Nós</span>
          </nav>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* About Content */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="aspect-square bg-[#f1f1f1] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=1000&auto=format&fit=crop" 
              alt="Fundação MiniStore"
              className="w-full h-full object-cover grayscale opacity-80"
            />
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl font-normal text-black uppercase tracking-tight leading-tight">
              Como a MiniStore foi Fundada?
            </h2>
            <div className="space-y-6 text-gray-400 text-sm leading-relaxed font-body">
              <p>
                Risus augue curabitur diam senectus congue velit et. Sed vitae metus nibh sit era. Nulla adipiscing pharetra pellentesque maecenas odio eros at. Et libero vulputate amet duis erat volutpat vitae eget. Sed vitae metus nibh sit era. Nulla adipiscing pharetra pellentesque maecenas odio eros at. Quam libero etiam et in.
              </p>
              <p>
                Vivamus non tellus at tellus pretium laoreet. Morbi ac libero eu neque tristique convallis. Pellentesque aliquet, felis eget scelerisque feugiat, enim ex facilisis tellus, eu iaculis ex nisi ut libero.
              </p>
            </div>
            <button className="btn-medium btn-dark">
              Visite Nossa Loja
            </button>
          </div>
        </div>
      </section>

      <Subscribe />
    </div>
  );
}
