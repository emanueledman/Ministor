export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: string;
  image: string;
}
