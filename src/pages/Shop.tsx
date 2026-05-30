import { Link } from 'react-router-dom';
import Subscribe from '../components/Subscribe';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';
import { useProductContext } from '../context/ProductContext';

const categoriesList = [
  { label: 'Tudo', value: 'Tudo' },
  { label: 'Telemóveis', value: 'Phones' },
  { label: 'Relógios', value: 'Watches' },
  { label: 'Computadores', value: 'Computers' },
  { label: 'Material Informático', value: 'IT Materials' },
  { label: 'Acessórios', value: 'Accessories' }
];

const tagsList = ['Branco', 'Barato', 'Móvel', 'Moderno', 'Clássico', 'Laptop', 'Prático', 'Gaming', 'Produtividade', 'Profissional', 'Teclado', 'Rato', 'Monitor', 'Hub', 'Apple', 'Samsung'];
const brandsList = ['Apple', 'Samsung', 'Sony', 'Nokia', 'Asus', 'Dell', 'Logitech', 'LG'];

export default function Shop() {
  const { 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory, 
    selectedBrand, 
    setSelectedBrand,
    selectedTag,
    setSelectedTag,
    sortBy,
    setSortBy,
    clearFilters
  } = useProductContext();

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Page Header */}
      <section className="bg-[#edf1f3] py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-black mb-2 md:mb-4 uppercase">
            Loja
          </h1>
          <nav className="flex justify-center text-[10px] md:text-[11px] text-gray-500 font-bold uppercase tracking-[0.2em] gap-2">
            <Link className="hover:text-black transition-colors" to="/">Início</Link> / 
            <span className="text-black">Loja</span>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          {/* Main Content / Product Grid */}
          <div className="lg:flex-1 order-2 lg:order-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 md:mb-12 gap-4">
              <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest italic line-clamp-2">
                Filtros: {selectedCategory} / {selectedBrand} {searchQuery && `/ "${searchQuery}"`}
              </p>
              <div className="relative w-full sm:w-auto">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-100 p-2 text-[10px] md:text-[11px] font-bold uppercase tracking-widest focus:outline-none bg-white appearance-none pr-10 w-full sm:w-auto"
                >
                  <option value="default">Ordenação padrão</option>
                  <option value="name-asc">Nome: A - Z</option>
                  <option value="name-desc">Nome: Z - A</option>
                  <option value="price-asc">Preço: Menor para Maior</option>
                  <option value="price-desc">Preço: Maior para Menor</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
                </div>
              </div>
            </div>

            <ProductGrid 
              products={products} 
              hideHeader 
              columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
              useFilters={true}
            />
          </div>


          {/* Sidebar */}
          <aside className="w-full lg:w-80 order-1 lg:order-2 space-y-8 md:space-y-12">
            <div>
              <div className="flex border border-gray-100 shadow-sm transition-shadow hover:shadow-md">
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Pesquisar" 
                  className="w-full p-3 md:p-4 text-xs md:text-sm focus:outline-none placeholder:text-[10px] placeholder:md:text-[11px] placeholder:font-bold placeholder:uppercase placeholder:tracking-widest"
                />
                <button className="bg-black text-white px-4 md:px-6">
                  <svg className="w-4 h-4"><use xlinkHref="#search"></use></svg>
                </button>
              </div>
            </div>

            <div className="space-y-4 md:space-y-6">
              <h4 className="text-xs md:text-sm font-bold uppercase tracking-widest border-b border-black inline-block pb-1">Categorias</h4>
              <ul className="space-y-2 md:space-y-3 grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-0">
                {categoriesList.map(cat => (
                  <li key={cat.value}>
                    <button 
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`text-[10px] md:text-[11px] font-bold uppercase tracking-widest transition-colors block w-full text-left ${selectedCategory === cat.value ? 'text-black underline underline-offset-4' : 'text-gray-500 hover:text-black'}`}
                    >
                      {cat.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 md:space-y-6">
              <h4 className="text-xs md:text-sm font-bold uppercase tracking-widest border-b border-black inline-block pb-1">Marcas</h4>
              <ul className="space-y-2 md:space-y-3 grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-0">
                {['Todas', ...brandsList].map(brand => (
                  <li key={brand}>
                    <button 
                      onClick={() => setSelectedBrand(brand)}
                      className={`text-[10px] md:text-[11px] font-bold uppercase tracking-widest transition-colors block w-full text-left ${selectedBrand === brand ? 'text-black underline underline-offset-4' : 'text-gray-500 hover:text-black'}`}
                    >
                      {brand}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 md:space-y-6">
              <h4 className="text-xs md:text-sm font-bold uppercase tracking-widest border-b border-black inline-block pb-1">Tags</h4>
              <ul className="space-y-2 md:space-y-3 grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-0 max-h-48 md:max-h-none overflow-y-auto md:overflow-y-visible">
                {['Todas', ...tagsList].map(tag => (
                  <li key={tag}>
                    <button 
                      onClick={() => setSelectedTag(tag)}
                      className={`text-[10px] md:text-[11px] font-bold uppercase tracking-widest transition-colors block w-full text-left ${selectedTag === tag ? 'text-black underline underline-offset-4' : 'text-gray-500 hover:text-black'}`}
                    >
                      {tag}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {(selectedCategory !== 'Tudo' || selectedBrand !== 'Todas' || selectedTag !== 'Todas' || searchQuery !== '') && (
              <div className="pt-2 md:pt-4">
                <button 
                  onClick={clearFilters}
                  className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-[#72aec8] hover:text-black transition-colors border border-[#72aec8] px-4 py-2 hover:border-black w-full md:w-auto"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </aside>
        </div>
      </section>

      <Subscribe />
    </div>
  );
}
