export type FilterCategory =
  | 'All'
  | 'Hoodies'
  | 'Shirts'
  | 'Leather Jackets'
  | 'Bottoms'
  | 'Sports'
  | 'Accessories';

export interface Product {
  id: string;
  slug: string;
  title: string;
  price: number;
  formattedPrice: string;
  category: 'Hoodies' | 'Shirts' | 'Leather Jackets' | 'Bottoms' | 'Sports' | 'Accessories';
  description: string;
  details: string[];
  materials: string;
  fit: string;
  images: string[];
  colors: string[];
  colorImages?: Record<string, number>;
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
