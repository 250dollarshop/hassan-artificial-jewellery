export interface CustomerReview {
  id: string;
  name: string;
  city: string;
  rating: number;
  productName: string;
  date: string;
  comment: string;
  initials: string;
  verified: boolean;
}

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'Ayesha Siddiqui',
    city: 'Lahore',
    rating: 5,
    productName: 'Necklace Set With Earrings',
    date: 'October 2026',
    comment:
      'Ordered the Necklace Set With Earrings for my sister’s nikah in DHA Lahore. The finishing is spotless and everyone thought it was custom boutique jewellery.',
    initials: 'AS',
    verified: true,
  },
  {
    id: 'rev-2',
    name: 'Maham Tariq',
    city: 'Karachi',
    rating: 5,
    productName: 'Red Ruby Lockset Jewellery',
    date: 'October 2026',
    comment:
      'Delivered to Clifton Karachi within 3 days via Cash on Delivery. The Red Ruby Lockset looks rich and luminous under evening lights.',
    initials: 'MT',
    verified: true,
  },
  {
    id: 'rev-3',
    name: 'Zainab Waqar',
    city: 'Islamabad',
    rating: 5,
    productName: 'Crystal White Gold Jewellery Set',
    date: 'September 2026',
    comment:
      'The Crystal White Gold Jewellery Set is lightweight, sparkling, and arrived safely cushioned. Ideal for weddings and formal dinners.',
    initials: 'ZW',
    verified: true,
  },
  {
    id: 'rev-4',
    name: 'Hira Butt',
    city: 'Sialkot',
    rating: 5,
    productName: 'Golden Stone Jhumka Earrings',
    date: 'November 2026',
    comment:
      'The Golden Stone Jhumka Earrings have the prettiest sunburst detail! Ordered via WhatsApp and received prompt service right in Sialkot.',
    initials: 'HB',
    verified: true,
  },
  {
    id: 'rev-5',
    name: 'Fatima Raza',
    city: 'Faisalabad',
    rating: 5,
    productName: 'Black Crystal Jewellery Set',
    date: 'October 2026',
    comment:
      'Love that the Black Crystal Jewellery Set includes necklace, earrings, and matching ring. So classy with black and gold festive outfits!',
    initials: 'FR',
    verified: true,
  },
  {
    id: 'rev-6',
    name: 'Sanaullah Khan',
    city: 'Rawalpindi',
    rating: 5,
    productName: 'Golden Flower Artificial Jewellery Set',
    date: 'November 2026',
    comment:
      'Gifted the Golden Flower Artificial Jewellery Set for Eid. Checking the price in USD and ordering for home delivery in Pakistan was effortless.',
    initials: 'SK',
    verified: true,
  },
];
