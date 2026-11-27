import { JEWELLERY_IMAGES } from './images';

export interface CareArticle {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  excerpt: string;
  sections: { heading: string; body: string }[];
}

export interface LookbookItem {
  id: string;
  title: string;
  subtitle: string;
  occasion: string;
  image: string;
  productSlug: string;
  hotspots: {
    x: number;
    y: number;
    productSlug: string;
    label: string;
  }[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const CARE_ARTICLES: CareArticle[] = [
  {
    slug: 'preserve-gold-plated-crystal-jewellery',
    title: 'How to Preserve the Lustre of Gold-Plated & Crystal Jewellery',
    category: 'Jewellery Care',
    readTime: '4 min read',
    date: 'November 2026',
    image: JEWELLERY_IMAGES.bridalSet,
    excerpt:
      'Simple atelier rituals that keep your ruby locksets, crystal sets, and gold-tone jhumkay gleaming for years across humid summers and festive seasons.',
    sections: [
      {
        heading: '1. Last On, First Off Rule',
        body: 'Always apply perfume, hairspray, and moisturizers at least 10 minutes before putting on your jewellery. Alcohol and oils gradually dull gold-tone plating and crystal facets.',
      },
      {
        heading: '2. Individual Soft Storage',
        body: 'Store each necklace set and jhumka pair separately inside a soft zip pouch or lined jewellery box so stones do not scratch adjacent metal.',
      },
      {
        heading: '3. Gentle Dry Buffing Only',
        body: 'After every wear, wipe gently using a dry microfibre cloth before sealing inside your box. Never soak artificial stone sets in liquid cleaners.',
      },
    ],
  },
  {
    slug: 'styling-ruby-and-crystal-sets',
    title: 'Styling Ruby, Black Crystal & Golden Sets for Pakistani Weddings',
    category: 'Bridal Styling',
    readTime: '5 min read',
    date: 'October 2026',
    image: JEWELLERY_IMAGES.rubyLockset,
    excerpt:
      'Pair rich ruby locksets with deep maroon ensembles, crystal white gold sets with pastel walima gowns, and sunburst jhumkas with festive mehndi outfits.',
    sections: [
      {
        heading: 'Bridal & Festive Crimson',
        body: 'Ruby Gold Crystal and Red Stone Artificial Sets bring unmistakable bridal depth against ivory, gold, and crimson outfits.',
      },
      {
        heading: 'Reception & Evening Sparkle',
        body: 'The Black Crystal Jewellery Set and Crystal White Gold Set frame sleek evening necklines with high-contrast stone brilliance.',
      },
    ],
  },
  {
    slug: 'jhumka-styling-guide',
    title: 'The Art of Wearing Statement Golden Stone Jhumka Earrings',
    category: 'Craftsmanship',
    readTime: '3 min read',
    date: 'October 2026',
    image: JEWELLERY_IMAGES.earringsJhumkay,
    excerpt:
      'Let sunburst gold-tone jhumkay take centre stage by pairing them with swept-back hair or sheer dupattas.',
    sections: [
      {
        heading: 'Balanced Framing',
        body: 'When wearing statement jhumkas like our Golden Stone Jhumka Earrings, keep necklines clean or pair with a delicate matching lockset.',
      },
    ],
  },
  {
    slug: 'how-to-measure-bangle-and-ring-size-at-home',
    title: 'Measuring Ring & Bangle Sizes Accurately at Home',
    category: 'Sizing Guide',
    readTime: '3 min read',
    date: 'September 2026',
    image: JEWELLERY_IMAGES.goldenFlower,
    excerpt:
      'Ensure a comfortable fit before ordering adjustable locksets, rings, and earrings online with our quick home ruler method.',
    sections: [
      {
        heading: 'Adjustable Comfort Fit',
        body: 'All of our necklace sets include adjustable clasps or chains so they rest gracefully on any collarbone.',
      },
    ],
  },
];

export const LOOKBOOK_ITEMS: LookbookItem[] = [
  {
    id: 'look-1',
    title: 'Classic Bridal Necklace Set',
    subtitle: 'Coordinated Necklace & Earrings · Gold Finish',
    occasion: 'Bridal',
    image: JEWELLERY_IMAGES.bridalSet,
    productSlug: 'necklace-set-with-earrings-7745',
    hotspots: [
      { x: 50, y: 52, productSlug: 'necklace-set-with-earrings-7745', label: 'Necklace Set With Earrings' },
    ],
  },
  {
    id: 'look-2',
    title: 'Royal Ruby Lockset',
    subtitle: 'Ruby-Red Stones · Red, Silver & White Finishes',
    occasion: 'Party Wear',
    image: JEWELLERY_IMAGES.rubyLockset,
    productSlug: 'red-ruby-lockset-jewellery-5520',
    hotspots: [
      { x: 50, y: 54, productSlug: 'red-ruby-lockset-jewellery-5520', label: 'Red Ruby Lockset Jewellery' },
    ],
  },
  {
    id: 'look-3',
    title: 'Sunburst Stone Jhumkay',
    subtitle: 'Sparkling Clear Stones · Gold & Brown Tones',
    occasion: 'Mehndi',
    image: JEWELLERY_IMAGES.earringsJhumkay,
    productSlug: 'golden-stone-jhumka-earrings-5684',
    hotspots: [
      { x: 50, y: 50, productSlug: 'golden-stone-jhumka-earrings-5684', label: 'Golden Stone Jhumka Earrings' },
    ],
  },
  {
    id: 'look-4',
    title: 'Ruby Gold Crystal Sparkle',
    subtitle: 'Rich Ruby Stones · Intricate Gold Detailing',
    occasion: 'Gifts',
    image: JEWELLERY_IMAGES.necklaceSet,
    productSlug: 'ruby-gold-crystal-jewellery-set-6572',
    hotspots: [
      { x: 50, y: 50, productSlug: 'ruby-gold-crystal-jewellery-set-6572', label: 'Ruby Gold Crystal Jewellery Set' },
    ],
  },
  {
    id: 'look-5',
    title: 'Midnight Black Crystal Suite',
    subtitle: 'Necklace, Matching Earrings & Ring',
    occasion: 'Party Wear',
    image: JEWELLERY_IMAGES.blackCrystal,
    productSlug: 'black-crystal-jewellery-set-0296',
    hotspots: [
      { x: 50, y: 52, productSlug: 'black-crystal-jewellery-set-0296', label: 'Black Crystal Jewellery Set' },
    ],
  },
  {
    id: 'look-6',
    title: 'Golden Flower Radiance',
    subtitle: 'Floral Pendant & Matching Flower Earrings',
    occasion: 'Festive',
    image: JEWELLERY_IMAGES.goldenFlower,
    productSlug: 'golden-flower-artificial-jewellery-set-0214',
    hotspots: [
      { x: 50, y: 50, productSlug: 'golden-flower-artificial-jewellery-set-0214', label: 'Golden Flower Jewellery Set' },
    ],
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    category: 'Orders & Delivery',
    question: 'How long does Cash on Delivery take across Pakistan?',
    answer:
      'Orders placed from Sialkot ship within 24 hours. Delivery takes 1–2 working days in Punjab (Sialkot, Lahore, Gujranwala, Islamabad, Rawalpindi, Faisalabad) and 2–4 working days to Karachi, Peshawar, Quetta, and nationwide.',
  },
  {
    category: 'Orders & Delivery',
    question: 'Do you offer Free Delivery?',
    answer:
      'Yes! Orders above Rs. 5,000 ($18 USD) enjoy complimentary insured nationwide delivery across Pakistan. Orders below Rs. 5,000 carry a flat Rs. 250 courier fee.',
  },
  {
    category: 'Quality & Care',
    question: 'How should I care for my crystal and stone jewellery sets?',
    answer:
      'Put your jewellery on after perfume and hairspray have dried, wipe gently with a dry soft cloth after wear, and store each set in its own cushioned pouch away from moisture.',
  },
  {
    category: 'Payments & Currency',
    question: 'What payment methods do you accept?',
    answer:
      'We accept Cash on Delivery (COD) nationwide, Bank Transfer (IBFT), JazzCash, and Easypaisa. You can browse and review totals in both PKR and USD using our currency switch.',
  },
  {
    category: 'Exchange & Returns',
    question: 'What is your 7-day exchange policy?',
    answer:
      'If an item arrives damaged in transit, message us on WhatsApp (+923298025766) within 7 days of delivery with an unboxing photo. Unused items in original packaging are exchanged swiftly.',
  },
];
