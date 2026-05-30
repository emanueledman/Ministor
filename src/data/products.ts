export interface Product {
  id: string;
  name: string;
  price: string;
  numericPrice: number;
  image: string;
  category: 'Phones' | 'Watches' | 'Accessories' | 'Computers' | 'IT Materials';
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
    image: 'https://demo.templatesjungle.com/ministore/images/product-item1.jpg',
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
    image: 'https://demo.templatesjungle.com/ministore/images/product-item2.jpg',
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
    image: 'https://demo.templatesjungle.com/ministore/images/product-item3.jpg',
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
    image: 'https://demo.templatesjungle.com/ministore/images/product-item4.jpg',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBM_UFd4WWVjE58W64eoJZSECU-5uTRKmJqbm0UN2Et2j0k9dNfa3Fv-sUpbjXcjgYo14VzgE4t9AMsmB1R94XInzY5XCnCVjJEJkcm1_8kZEut9bcaBoi5Z_OzzQYnB4WqMiSwAvfb1h-XajthD43rloxxme94wkFzxoZvIv791f9IpAJpbJG0methcE07vLPiz4Vb8LfxgHq-OJhUP0YJ-BzS47Leq4V2JNJXqdmFL76iuRO7rNGkjn4nc-tdlipcpjqsDh5V8g',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXBUTWYp6LfUeK928-R43iJJQgX0ohJGvcOLWuBLFMmYKtRifg334Tl8RVwkCw1sGRulI4Vb49331E6fOXkwJ2oKcf_nf5HDwHQwSHgmr6QyFjjQb4xYrD7HuxxD_csSUeHKZBOvDaRda3QlvcYTqb8RQOvYhHXQ10c7sf77r4Nwkid3MxrxNYRI87G1CdLDWeFNNlaKkZTXqrYa9lpO-b9z57x1NILp4Jla8rmnerSdFEMLhfcnVjv_bMcQPWDedcUmfPpxshRQ',
    category: 'Watches',
    tags: ['Relógio', 'Minimalista', 'Preto'],
    sku: 'WT-004',
    description: 'Minimalismo puro. O acabamento em preto profundo e o mostrador simples tornam este o companheiro perfeito para qualquer traje profissional.',
    rating: 4.8
  },
  {
    id: '5',
    name: 'iPhone 14 Pro',
    price: '180.000 Kz',
    numericPrice: 180000,
    image: 'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?q=80&w=800&auto=format&fit=crop',
    category: 'Phones',
    tags: ['Móvel', 'Apple', 'Moderno'],
    sku: 'PH-005',
    description: 'Pro além dos limites. Com a Ilha Dinâmica, uma nova forma mágica de interagir com o iPhone.',
    rating: 4.8
  },
  {
    id: '6',
    name: 'iPhone 15 Pro Max',
    price: '230.000 Kz',
    numericPrice: 230000,
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800&auto=format&fit=crop',
    category: 'Phones',
    tags: ['Móvel', 'Apple', 'Moderno'],
    sku: 'PH-006',
    description: 'Titânio. Tão forte. Tão leve. Tão Pro. O maior e mais avançado ecrã num iPhone.',
    rating: 5.0
  },
  {
    id: '7',
    name: 'Galaxy S23 Ultra',
    price: '190.000 Kz',
    numericPrice: 190000,
    image: 'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?q=80&w=800&auto=format&fit=crop',
    category: 'Phones',
    tags: ['Móvel', 'Samsung', 'Moderno'],
    sku: 'PH-007',
    description: 'O desempenho mais épico da Samsung num smartphone, com câmara de alta resolução e S Pen incluída.',
    rating: 4.9
  },
  {
    id: 'a1',
    name: 'AirPods Pro 2',
    price: '45.000 Kz',
    numericPrice: 45000,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=800&auto=format&fit=crop',
    category: 'Accessories',
    tags: ['Fone', 'Apple', 'Moderno'],
    sku: 'AC-001',
    description: 'Cancelamento ativo de ruído até 2x melhor, Transparência Adaptativa e Áudio Espacial Personalizado.',
    rating: 4.9
  },
  {
    id: 'w5',
    name: 'Apple Watch Ultra',
    price: '120.000 Kz',
    numericPrice: 120000,
    image: 'https://images.unsplash.com/photo-1696446702334-a2c686735e07?q=80&w=800&auto=format&fit=crop',
    category: 'Watches',
    tags: ['Relógio', 'Apple', 'Moderno'],
    sku: 'WT-005',
    description: 'O Apple Watch mais robusto e capaz. Construído para a exploração, aventura e resiliência.',
    rating: 4.9
  },
  {
    id: 'c1',
    name: 'MacBook Pro 16"',
    price: '950.000 Kz',
    numericPrice: 950000,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop',
    category: 'Computers',
    tags: ['Laptop', 'Apple', 'Profissional'],
    sku: 'CP-001',
    description: 'O MacBook Pro redefine o desempenho com os processadores M2 Pro e M2 Max, bateria de longa duração e ecrã Liquid Retina XDR.',
    rating: 5.0
  },
  {
    id: 'c2',
    name: 'Dell XPS 15',
    price: '850.000 Kz',
    numericPrice: 850000,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=800&auto=format&fit=crop',
    category: 'Computers',
    tags: ['Laptop', 'Dell', 'Moderno'],
    sku: 'CP-002',
    description: 'O Dell XPS 15 combina elegância e potência, ideal para criadores de conteúdo e profissionais exigentes.',
    rating: 4.8
  },
  {
    id: 'c3',
    name: 'Asus ROG Strix',
    price: '1.200.000 Kz',
    numericPrice: 1200000,
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=800&auto=format&fit=crop',
    category: 'Computers',
    tags: ['Laptop', 'Asus', 'Gaming'],
    sku: 'CP-003',
    description: 'Para os jogadores mais sérios. Gráficos incríveis, ecrã de alta taxa de atualização e refrigeração avançada.',
    rating: 4.9
  },
  {
    id: 'it1',
    name: 'Teclado Mecânico Logitech G Pro X',
    price: '85.000 Kz',
    numericPrice: 85000,
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop',
    category: 'IT Materials',
    tags: ['Teclado', 'Logitech', 'Gaming'],
    sku: 'IT-001',
    description: 'Teclado mecânico de nível profissional. Interruptores substituíveis para uma personalização máxima.',
    rating: 4.7
  },
  {
    id: 'it2',
    name: 'Rato Sem Fios MX Master 3',
    price: '70.000 Kz',
    numericPrice: 70000,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd11b645b21?q=80&w=800&auto=format&fit=crop',
    category: 'IT Materials',
    tags: ['Rato', 'Logitech', 'Produtividade'],
    sku: 'IT-002',
    description: 'A ferramenta perfeita para criadores e programadores. Precisão milimétrica e formato ergonómico.',
    rating: 4.9
  },
  {
    id: 'it3',
    name: 'Monitor UltraWide LG 34"',
    price: '250.000 Kz',
    numericPrice: 250000,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=800&auto=format&fit=crop',
    category: 'IT Materials',
    tags: ['Monitor', 'LG', 'Produtividade'],
    sku: 'IT-003',
    description: 'Mais espaço para as suas ideias. Este monitor UltraWide oferece um campo de visão expandido perfeito para multitasking.',
    rating: 4.8
  },
  {
    id: 'a2',
    name: 'Hub USB-C 8-em-1',
    price: '25.000 Kz',
    numericPrice: 25000,
    image: 'https://plus.unsplash.com/premium_photo-1678129712799-7ee466d69e46?q=80&w=800&auto=format&fit=crop',
    category: 'Accessories',
    tags: ['Cabo', 'Hub', 'Prático'],
    sku: 'AC-002',
    description: 'Expanda as conectividades do seu laptop. Inclui portas USB, HDMI 4K, leitor de cartões e muito mais.',
    rating: 4.5
  }
];
