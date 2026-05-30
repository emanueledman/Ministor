import Subscribe from '../components/Subscribe';

const blogPosts = [
  {
    category: 'GADGETS',
    date: '22 FEV, 2023',
    title: 'CONSIGA ALGUNS GADGETS FIXES EM 2023',
    image: 'https://images.unsplash.com/photo-1546868889-4e0ca9994bb0?q=80&w=400&auto=format&fit=crop'
  },
  {
    category: 'CÂMERA',
    date: '22 FEV, 2023',
    title: 'AS 10 MELHORES CÂMERAS PEQUENAS DO MUNDO',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=400&auto=format&fit=crop'
  },
  {
    category: 'TECNOLOGIA',
    date: '25 FEV, 2023',
    title: 'TRUQUES TECNOLÓGICOS QUE VOCÊ NÃO VAI ACREDITAR',
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=400&auto=format&fit=crop'
  }
];

const categories = ['Tudo', 'Telemóveis', 'Acessórios', 'Tablets', 'Relógios'];
const tags = ['Branco', 'Barato', 'Móvel', 'Moderno'];

export default function Blog() {
  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-[#edf1f3] py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-black mb-4 uppercase">
            Blog
          </h1>
          <nav className="flex justify-center text-[11px] text-gray-500 font-bold uppercase tracking-[0.2em] gap-2">
            <a className="hover:text-black transition-colors" href="/">Início</a> / 
            <span className="text-black">Blog</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-24">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-72 space-y-12">
            <div>
              <div className="flex border border-gray-100">
                <input 
                  type="text" 
                  placeholder="Pesquisar" 
                  className="w-full p-4 text-sm focus:outline-none placeholder:text-[11px] placeholder:font-bold placeholder:uppercase placeholder:tracking-widest"
                />
                <div className="bg-black text-white px-6 flex items-center justify-center">
                   <svg className="w-4 h-4"><use xlinkHref="#search"></use></svg>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-widest border-b border-black inline-block pb-1">Categorias</h4>
              <ul className="space-y-3">
                {categories.map(cat => (
                  <li key={cat}>
                    <a href="#" className="text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors">{cat}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-bold uppercase tracking-widest border-b border-black inline-block pb-1">Tags</h4>
              <ul className="space-y-3">
                {tags.map(tag => (
                  <li key={tag}>
                    <a href="#" className="text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors">{tag}</a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Blog Grid */}
          <div className="lg:flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {blogPosts.map((post, idx) => (
                <div key={idx} className="group flex flex-col">
                  <div className="aspect-[3/2] overflow-hidden mb-6">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="space-y-3">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                      {post.date} - {post.category}
                    </p>
                    <h3 className="text-sm font-bold uppercase tracking-widest leading-relaxed">
                      <a href="#" className="hover:text-gray-500 transition-colors">{post.title}</a>
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Subscribe />
    </div>
  );
}
