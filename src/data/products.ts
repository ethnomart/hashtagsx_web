import { Product } from '../types';

// Each product follows the Product type in src/types/index.ts.
// colorImages maps a colour name to the index of its photo in `images`.
export const products: Product[] = [
  {
    id: 'hx-knitted-jacquard-polo-sweater',
    slug: 'knitted-jacquard-polo-sweater',
    title: 'Knitted Jacquard Polo Sweater',
    price: 6200,
    formattedPrice: 'Rs 6,200',
    category: 'Shirts',
    description:
      'A cable-knit polo sweater with a contrast tipped collar, cuffs and hem. Soft, structured knit that layers well and holds its shape.',
    details: [
      'Cable-knit jacquard texture',
      'Open polo collar with contrast tipping',
      'Ribbed cuffs and hem with stripe detail',
      'Available in four colours, sizes S to XL',
    ],
    materials: 'Knitted yarn blend',
    fit: 'Regular fit',
    images: [
      '/products/knitted-polo-1.jpg',
      '/products/knitted-polo-2.jpg',
      '/products/knitted-polo-3.jpg',
      '/products/knitted-polo-4.jpg',
      '/products/knitted-polo-5.jpg',
    ],
    colors: ['Midnight Black', 'Classic Beige', 'Charcoal Grey', 'Silver Mist'],
    colorImages: { 'Midnight Black': 0, 'Classic Beige': 1, 'Charcoal Grey': 2, 'Silver Mist': 3 },
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: true,
    inStock: true,
  },
];
