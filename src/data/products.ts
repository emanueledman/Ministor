export interface Product {
  id: string;
  name: string;
  price: string;
  numericPrice: number;
  image: string;
  category: 'Phones' | 'Watches' | 'Accessories';
  tags: string[];
  sku: string;
  description: string;
  rating: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 10',
    price: '98.000 Kz',
    numericPrice: 98000,
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=800&auto=format&fit=crop',
    category: 'Phones',
    tags: ['Móvel', 'Apple', 'Moderno'],
    sku: 'PH-001',
    description: 'A base da era moderna dos smartphones. Um design deslumbrante em vidro e aço inoxidável com um ecrã Super Retina de ponta a ponta.',
    rating: 4.8
  },
  {
    id: '2',
    name: 'iPhone 11',
    price: '110.000 Kz',
    numericPrice: 110000,
    image: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?q=80&w=800&auto=format&fit=crop',
    category: 'Phones',
    tags: ['Móvel', 'Apple', 'Moderno'],
    sku: 'PH-002',
    description: 'A quantidade certa de tudo. Um novo sistema de câmara dupla capta mais do que vê e adora.',
    rating: 4.9
  },
  {
    id: '3',
    name: 'iPhone 8',
    price: '78.000 Kz',
    numericPrice: 78000,
    image: 'https://images.unsplash.com/photo-1523206489230-c012cdd4cc2a?q=80&w=800&auto=format&fit=crop',
    category: 'Phones',
    tags: ['Móvel', 'Apple', 'Clássico'],
    sku: 'PH-003',
    description: 'Um design bonito em vidro. A câmara mais popular do mundo, agora ainda melhor. O chip mais inteligente e potente de sempre num smartphone.',
    rating: 4.5
  },
  {
    id: '4',
    name: 'iPhone 13',
    price: '150.000 Kz',
    numericPrice: 150000,
    image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=800&auto=format&fit=crop',
    category: 'Phones',
    tags: ['Móvel', 'Apple', 'Moderno'],
    sku: 'PH-004',
    description: 'O nosso sistema de câmara dupla mais avançado de sempre. Ecrã Super Retina XDR super brilhante. Chip A15 Bionic ultra-rápido.',
    rating: 5.0
  },
  {
    id: 'w1',
    name: 'Pink Watch',
    price: '87.000 Kz',
    numericPrice: 87000,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
    category: 'Watches',
    tags: ['Relógio', 'Clássico', 'Moderno'],
    sku: 'WT-001',
    description: 'Justo, cum feugiat imperdiet nulla molestie ac vulputate scelerisque amet. Bibendum adipiscing platea blandit sit sed quam semper rhoncus.',
    rating: 5.2
  },
  {
    id: 'w2',
    name: 'Heavy Watch',
    price: '68.000 Kz',
    numericPrice: 68000,
    image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=800&auto=format&fit=crop',
    category: 'Watches',
    tags: ['Relógio', 'Clássico', 'Pesado'],
    sku: 'WT-002',
    description: 'Durável e elegante. Este relógio foi concebido para aqueles que apreciam o peso da qualidade e da engenharia de precisão.',
    rating: 4.7
  },
  {
    id: 'w3',
    name: 'Spotted Watch',
    price: '75.000 Kz',
    numericPrice: 75000,
    image: 'https://images.unsplash.com/photo-1508685096489-775b0af3976d?q=80&w=800&auto=format&fit=crop',
    category: 'Watches',
    tags: ['Relógio', 'Moderno', 'Padrão'],
    sku: 'WT-003',
    description: 'Um padrão único para um estilo único. Destaque-se com este design manchado que equilibra originalidade e classe.',
    rating: 4.6
  },
  {
    id: 'w4',
    name: 'Black Watch',
    price: '65.000 Kz',
    numericPrice: 65000,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop',
    category: 'Watches',
    tags: ['Relógio', 'Minimalista', 'Preto'],
    sku: 'WT-004',
    description: 'Minimalismo puro. O acabamento em preto profundo e o mostrador simples tornam este o companheiro perfeito para qualquer traje profissional.',
    rating: 4.8
  }
];
