import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProductContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  clearFilters: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tudo');
  const [selectedBrand, setSelectedBrand] = useState('Todas');
  const [selectedTag, setSelectedTag] = useState('Todas');

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Tudo');
    setSelectedBrand('Todas');
    setSelectedTag('Todas');
  };

  return (
    <ProductContext.Provider value={{
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      selectedBrand,
      setSelectedBrand,
      selectedTag,
      setSelectedTag,
      clearFilters
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
}
