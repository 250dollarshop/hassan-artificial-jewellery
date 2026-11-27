// Hassan Artificial Jewellery - products exported from Daraz Seller Center
// Prices are in PKR. USD is auto-converted using USD_TO_PKR in config.

export type OccasionType = 'Bridal' | 'Party Wear' | 'Mehndi' | 'Festive' | 'Gifts';
export type FinishType = 'Gold-Plated' | 'Ruby Stone & Crystal' | 'Crystal & Zircon';

export interface RawDarazProduct {
  id: string;
  name: string;
  category: string;
  pricePKR: number;
  oldPricePKR: number;
  stock: number;
  colors: string[];
  images: string[];
  description: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categoryLabel: string;
  pricePKR: number;
  oldPricePKR?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  material: string;
  finish: FinishType;
  occasion: OccasionType;
  color: string;
  colors: string[];
  sizes: string[];
  images: string[];
  description: string;
  details: string[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isTopRated?: boolean;
  isFlashSale?: boolean;
}

export const RAW_DARAZ_PRODUCTS: RawDarazProduct[] = [
  {
    id: '1980167745',
    name: 'Necklace Set With Earrings',
    category: 'Bridal Sets',
    pricePKR: 1000,
    oldPricePKR: 1199,
    stock: 25,
    colors: [],
    images: ['https://static-01.daraz.pk/p/31cc50018128781cbd8fd69da40ad621.png'],
    description:
      'This elegant Necklace Set with Earrings features a beautiful design that adds charm and sophistication to your look. The matching necklace and earrings create a graceful, coordinated appearance, making this set a lovely addition to your jewellery collection. Its stylish design complements traditional and formal attire effortlessly.',
  },
  {
    id: '1980175520',
    name: 'Red Ruby Lockset Jewellery',
    category: 'Necklace Sets',
    pricePKR: 849,
    oldPricePKR: 999,
    stock: 15,
    colors: ['Red', 'Silver', 'White'],
    images: ['https://static-01.daraz.pk/p/0c43e190706d7abfc6ef2144098588c5.jpg'],
    description:
      'The Red Ruby Lockset Jewellery Set features a beautiful design with rich ruby-red stones and elegant detailing. Its attractive colour and graceful finish create a luxurious appearance, adding charm and sophistication to your jewellery collection. Designed for those who appreciate stylish and eye-catching elegance.',
  },
  {
    id: '1980946572',
    name: 'Ruby Gold Crystal Jewellery Set',
    category: 'Necklace Sets',
    pricePKR: 999,
    oldPricePKR: 1199,
    stock: 25,
    colors: ['Red', 'Silver'],
    images: ['https://static-01.daraz.pk/p/ffa648f4cbfffb94792d5160e13b4164.png'],
    description:
      'The Ruby Gold Crystal Jewellery Set features a stunning combination of rich ruby-red stones, sparkling crystals, and an elegant golden finish. Its beautiful design and intricate detailing create a luxurious and sophisticated appearance, making it a perfect addition to your jewellery collection.',
  },
  {
    id: '1980950520',
    name: 'Ruby Bloom Gold Lockset Jewellery Set',
    category: 'Bridal Sets',
    pricePKR: 899,
    oldPricePKR: 1099,
    stock: 15,
    colors: [],
    images: ['https://static-01.daraz.pk/p/3fce4a45fa5235b34060c69eb5034047.png'],
    description:
      'The Ruby Bloom Gold Lockset Jewellery Set showcases a stunning combination of rich ruby-red stones and a beautiful golden finish. Its elegant floral patterns, intricate detailing, and eye-catching design give it a luxurious and sophisticated appearance. This jewellery set adds charm, beauty, and elegance to any special event.',
  },
  {
    id: '1980175498',
    name: 'Crystal White Gold Jewellery Set',
    category: 'Bridal Sets',
    pricePKR: 999,
    oldPricePKR: 1099,
    stock: 25,
    colors: [],
    images: ['https://static-01.daraz.pk/p/fcc2972ae60dfabee6769eb523cce175.jpg'],
    description:
      'Add timeless elegance to your look with this beautiful Crystal White Gold Jewellery Set. Featuring sparkling crystals and a graceful design, it is perfect for weddings, parties, and special occasions. Pair it with your favorite outfit for a classy and sophisticated appearance.',
  },
  {
    id: '1980167466',
    name: 'Red Stone Artificial Jewellery Set',
    category: 'Bridal Sets',
    pricePKR: 1099,
    oldPricePKR: 1199,
    stock: 14,
    colors: [],
    images: ['https://static-01.daraz.pk/p/806f0ee0b461a11ce11ae1f50718eab1.png'],
    description:
      'Add elegance and beauty to your look with this beautiful Red Stone Artificial Jewellery Set. Featuring attractive red stones and an elegant design, this set is perfect for weddings, parties, festive occasions, and special events. Its stylish appearance complements both traditional and formal outfits.',
  },
  {
    id: '1980670296',
    name: 'Black Crystal Jewellery Set',
    category: 'Bridal Sets',
    pricePKR: 1299,
    oldPricePKR: 1399,
    stock: 15,
    colors: [],
    images: ['https://static-01.daraz.pk/p/bf9f622bbbd9e306a0da8f71cd524468.png'],
    description:
      'Add a touch of elegance to your look with this beautiful Black Crystal Jewellery Set, featuring a matching necklace, earrings, and ring. The stunning black crystal stones are surrounded by sparkling accents, creating a stylish and graceful appearance. Perfect for weddings, parties, and festive occasions.',
  },
  {
    id: '1979835684',
    name: 'Golden Stone Jhumka Earrings',
    category: 'Earrings & Jhumkay',
    pricePKR: 1299,
    oldPricePKR: 1399,
    stock: 25,
    colors: ['Gold', 'Brown'],
    images: [
      'https://static-01.daraz.pk/p/a2bb919b89420a137f3d7fa3a184062a.png',
      'https://static-01.daraz.pk/p/6ed8f5581941470d2447ef1c33ace61c.png',
    ],
    description:
      'Enhance your style with these elegant Golden Stone Jhumka Earrings, featuring a beautiful sunburst design with sparkling clear stones and a gorgeous gold-tone finish. Their eye-catching design adds a touch of glamour to your look, making them perfect for weddings, parties, and festive celebrations.',
  },
  {
    id: '1980700214',
    name: 'Golden Flower Artificial Jewellery Set',
    category: 'Bridal Sets',
    pricePKR: 999,
    oldPricePKR: 1199,
    stock: 40,
    colors: ['Gold', 'Silver'],
    images: [
      'https://static-01.daraz.pk/p/f2a6f5daf75198ff5abf1b7196c4a285.png',
      'https://static-01.daraz.pk/p/ebd559964d1fe8d08a0818c811ec9b7e.png',
    ],
    description:
      'Enhance your beauty with this elegant Golden Flower Artificial Jewellery Set, featuring a beautiful floral pendant necklace and matching flower-shaped earrings. The sparkling clear stones and attractive golden finish create a graceful, stylish look for every occasion.',
  },
  {
    id: '1979769428',
    name: 'Golden Crystal Drop Jewellery Set',
    category: 'Bridal Sets',
    pricePKR: 999,
    oldPricePKR: 1099,
    stock: 10,
    colors: [],
    images: [
      'https://static-01.daraz.pk/p/fc8d96422ed3a5bb65dc6137469356a1.png',
      'https://static-01.daraz.pk/p/168d0ad7c4944b13a8f2647f7d02ceb4.png',
    ],
    description:
      'Add a touch of elegance and sparkle to your look with this beautiful Golden Crystal Drop Jewellery Set. Designed with luminous crystal drops and warm gold-tone craftsmanship for weddings, festive dinners, and celebrations.',
  },
];

function slugify(name: string, id: string): string {
  return `${name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')}-${id.slice(-4)}`;
}

function categoryToSlug(label: string): string {
  if (label === 'Bridal Sets') return 'bridal-sets';
  if (label === 'Necklace Sets') return 'necklace-sets';
  if (label === 'Earrings & Jhumkay') return 'earrings-jhumkay';
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

const METADATA_BY_ID: Record<
  string,
  {
    rating: number;
    reviewCount: number;
    finish: FinishType;
    occasion: OccasionType;
    defaultColor: string;
  }
> = {
  '1980167745': { rating: 4.9, reviewCount: 64, finish: 'Gold-Plated', occasion: 'Bridal', defaultColor: 'Gold' },
  '1980175520': { rating: 4.8, reviewCount: 52, finish: 'Ruby Stone & Crystal', occasion: 'Party Wear', defaultColor: 'Red' },
  '1980946572': { rating: 4.9, reviewCount: 48, finish: 'Ruby Stone & Crystal', occasion: 'Gifts', defaultColor: 'Red' },
  '1980950520': { rating: 4.9, reviewCount: 41, finish: 'Ruby Stone & Crystal', occasion: 'Bridal', defaultColor: 'Ruby Gold' },
  '1980175498': { rating: 4.8, reviewCount: 39, finish: 'Crystal & Zircon', occasion: 'Bridal', defaultColor: 'White Gold' },
  '1980167466': { rating: 4.9, reviewCount: 57, finish: 'Ruby Stone & Crystal', occasion: 'Bridal', defaultColor: 'Red' },
  '1980670296': { rating: 5.0, reviewCount: 44, finish: 'Crystal & Zircon', occasion: 'Party Wear', defaultColor: 'Black Crystal' },
  '1979835684': { rating: 4.9, reviewCount: 73, finish: 'Gold-Plated', occasion: 'Mehndi', defaultColor: 'Gold' },
  '1980700214': { rating: 4.8, reviewCount: 61, finish: 'Gold-Plated', occasion: 'Festive', defaultColor: 'Gold' },
  '1979769428': { rating: 4.9, reviewCount: 36, finish: 'Crystal & Zircon', occasion: 'Gifts', defaultColor: 'Gold' },
};

export const PRODUCTS: Product[] = RAW_DARAZ_PRODUCTS.map((raw) => {
  const meta = METADATA_BY_ID[raw.id] || {
    rating: 4.9,
    reviewCount: 40,
    finish: 'Gold-Plated' as FinishType,
    occasion: 'Bridal' as OccasionType,
    defaultColor: 'Gold',
  };

  // Reuse single image for gallery & hover when product has 1 photo
  const gallery = raw.images.length > 1 ? raw.images : [raw.images[0], raw.images[0]];
  const colorChoices = raw.colors.length > 0 ? raw.colors : [meta.defaultColor];

  return {
    id: raw.id,
    slug: slugify(raw.name, raw.id),
    name: raw.name,
    category: categoryToSlug(raw.category),
    categoryLabel: raw.category,
    pricePKR: raw.pricePKR,
    oldPricePKR: raw.oldPricePKR,
    rating: meta.rating,
    reviewCount: meta.reviewCount,
    stock: raw.stock,
    material: `${meta.finish} Craftsmanship with Anti-Tarnish Finish`,
    finish: meta.finish,
    occasion: meta.occasion,
    color: colorChoices[0],
    colors: colorChoices,
    sizes: ['Free Size (Adjustable)'],
    images: gallery,
    description: raw.description,
    details: [
      `Category: ${raw.category}`,
      `Available Finish: ${colorChoices.join(', ')}`,
      'Premium anti-tarnish protective polish',
      'Arrives safely cushioned in Hassan Artificial Jewellery gift packaging',
    ],
    isBestSeller: true,
    isNewArrival: true,
    isTopRated: true,
    isFlashSale: true,
  };
});
