export type FilterCategory =
  | 'All'
  | 'Hoodies'
  | 'Shirts'
  | 'Leather Jackets'
  | 'Bottoms'
  | 'Sports'
  | 'Accessories'
  | 'Perfumes';

export interface Product {
  id: string;
  slug: string;
  title: string;
  price: number;
  formattedPrice: string;
  category: 'Hoodies' | 'Shirts' | 'Leather Jackets' | 'Bottoms' | 'Sports' | 'Accessories' | 'Perfumes';
  description: string;
  details: string[];
  materials: string;
  fit: string;
  images: string[];
  colors: string[];
  colorImages?: Record<string, number>;
  sizesByColor?: Record<string, string[]>;
  sizes: string[];
  isNew?: boolean;
  inStock?: boolean;
}

export interface CartItem {
  product: Product;
  size: string;
  color?: string;
  quantity: number;
}

export type ViewMode = 'grid-3' | 'grid-2' | 'list';
