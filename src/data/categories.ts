import { PRODUCTS } from './products';
import { JEWELLERY_IMAGES } from './images';

export interface CategoryInfo {
  slug: string;
  name: string;
  shortDesc: string;
  itemCount: number;
  image: string;
  featured?: boolean;
}

const ALL_CATEGORY_DEFINITIONS: Omit<CategoryInfo, 'itemCount'>[] = [
  {
    slug: 'bridal-sets',
    name: 'Bridal Sets',
    shortDesc: 'Coordinated necklaces, earrings & bridal suites',
    image: JEWELLERY_IMAGES.bridalSet,
    featured: true,
  },
  {
    slug: 'necklace-sets',
    name: 'Necklace Sets',
    shortDesc: 'Ruby locksets & gold crystal collars',
    image: JEWELLERY_IMAGES.necklaceSet,
    featured: true,
  },
  {
    slug: 'earrings-jhumkay',
    name: 'Earrings & Jhumkay',
    shortDesc: 'Sunburst stone jhumkas & gold-tone drops',
    image: JEWELLERY_IMAGES.earringsJhumkay,
  },
];

// Only expose categories that actually have products in PRODUCTS
export const CATEGORIES: CategoryInfo[] = ALL_CATEGORY_DEFINITIONS.map((cat) => {
  const matching = PRODUCTS.filter((p) => p.category === cat.slug);
  return {
    ...cat,
    itemCount: matching.length,
    image: matching[0]?.images[0] || cat.image,
  };
}).filter((cat) => cat.itemCount > 0);
