import React from 'react';
import { Link } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

interface Product {
  id: string;
  name: string;
  price: string;
  numericPrice: number;
  image: string;
  category: string;
  tags: string[];
}

interface ProductGridProps {
  title?: string;
  products: Product[];
  linkText?: string;
  hideHeader?: boolean;
  columns?: string;
  initialVisible?: number;
  useFilters?: boolean;
}

export default function ProductGrid({ 
  title, 
  products, 
  linkText, 
  hideHeader = false,
  columns = "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  initialVisible = 4,
  useFilters = false
}: ProductGridProps) {
  const [showAll, setShowAll] = React.useState(false);
  const initialCount = initialVisible;
  const { searchQuery, selectedCategory, selectedBrand, selectedTag, sortBy } = useProductContext();
  const { addToCart } = useCart();

  let filteredProducts = useFilters ? products.filter(product => {
    // Search filter
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategory === 'Tudo' || product.category === selectedCategory;
    
    // Brand filter (using tags for brand logic)
    const matchesBrand = selectedBrand === 'Todas' || product.tags.includes(selectedBrand);

    // Tag filter
    const matchesTag = selectedTag === 'Todas' || product.tags.includes(selectedTag);

    return matchesSearch && matchesCategory && matchesBrand && matchesTag;
  }) : [...products];

  if (useFilters && sortBy) {
    filteredProducts = filteredProducts.sort((a, b) => {
      if (sortBy === 'price-asc') return a.numericPrice - b.numericPrice;
      if (sortBy === 'price-desc') return b.numericPrice - a.numericPrice;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      return 0; // default / popularidade / novidades
    });
  }

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      numericPrice: product.numericPrice,
      image: product.image,
      quantity: 1
    });
  };

  return (
    <section className={`${hideHeader ? 'py-0' : 'py-24'} bg-white`}>
      <div className={`${hideHeader ? 'px-0' : 'container mx-auto px-4'}`}>
        {!hideHeader && title && (
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <h2 className="text-4xl font-light tracking-tight uppercase">{title}</h2>
            <Link
              to="/shop"
              className="border-b-2 border-black pb-1 text-sm uppercase font-bold tracking-widest hover:text-gray-500 hover:border-gray-500 transition-all mt-4 md:mt-0"
            >
              {linkText}
            </Link>
          </div>
        )}

        {filteredProducts.length > 0 ? (
          <>
            <div className={`grid ${columns} gap-8`}>
              {(showAll ? filteredProducts : filteredProducts.slice(0, initialCount)).map((product) => (
              <div key={product.id} className="group relative">
                <Link to={`/product/${product.id}`} className="aspect-[4/5] bg-gray-50 mb-4 overflow-hidden block relative rounded-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-500"
                  />
                  <button 
                    onClick={(e) => handleQuickAdd(e, product)}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 text-[10px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center space-x-2 whitespace-nowrap z-10 hover:bg-[#72aec8]"
                  >
                    <span>Adicionar</span>
                    <svg className="w-4 h-4"><use xlinkHref="#cart-outline"></use></svg>
                  </button>
                </Link>

                <div className="flex flex-col gap-1 px-1">
                  <h3 className="text-xs md:text-sm font-medium uppercase tracking-widest text-[#212529] line-clamp-2">
                    <Link to={`/product/${product.id}`} className="hover:text-gray-500">{product.name}</Link>
                  </h3>
                  <span className="text-xs md:text-sm font-bold text-[#72aec8]">{product.price}</span>
                </div>
              </div>
            ))}
            </div>

            {filteredProducts.length > initialCount && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowAll(prev => !prev)}
                  className="inline-block px-6 py-3 bg-black text-white uppercase text-xs font-bold rounded-md hover:bg-gray-800 transition-colors"
                >
                  {showAll ? 'Ver menos' : `Ver mais (${filteredProducts.length - initialCount})`}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-light text-gray-400 uppercase tracking-widest">Nenhum produto encontrado</h3>
          </div>
        )}
      </div>
    </section>
  );
}
