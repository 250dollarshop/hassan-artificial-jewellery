export const USD_TO_PKR = 280;

export type CurrencyCode = 'PKR' | 'USD';

export const STORE_INFO = {
  name: 'HASSAN ARTIFICIAL JEWELLERY',
  shortName: 'Hassan Jewellery',
  tagline: 'Royal Craftsmanship, Timeless Radiance',
  phoneDisplay: '+92 329 8025766',
  phoneRaw: '+923298025766',
  whatsappUrl: 'https://wa.me/923298025766',
  email: '250dollarshop@gmail.com',
  location: 'Sialkot, Punjab, Pakistan',
  logoPath: './assets/logo.png',
  freeDeliveryThresholdPKR: 5000,
  standardDeliveryFeePKR: 250,
  payments: ['Cash on Delivery', 'Bank Transfer', 'JazzCash', 'Easypaisa'] as const,
};

export const PAKISTANI_CITIES = [
  'Sialkot',
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Gujranwala',
  'Peshawar',
  'Quetta',
  'Gujrat',
  'Bahawalpur',
  'Sargodha',
  'Hyderabad',
  'Abbottabad',
  'Sahiwal',
  'Mirpur (AJK)',
  'Other City',
];

export function pkrToUsd(pkr: number): number {
  return pkr / USD_TO_PKR;
}

export function formatPKR(pkr: number): string {
  return `Rs. ${Math.round(pkr).toLocaleString('en-PK')}`;
}

export function formatUSD(pkr: number): string {
  return `$${pkrToUsd(pkr).toFixed(2)}`;
}

export function formatDualPrice(
  pkr: number,
  currency: CurrencyCode
): { primary: string; secondary: string } {
  if (currency === 'USD') {
    return {
      primary: formatUSD(pkr),
      secondary: formatPKR(pkr),
    };
  }
  return {
    primary: formatPKR(pkr),
    secondary: formatUSD(pkr),
  };
}

export function buildWhatsAppLink(message: string): string {
  return `${STORE_INFO.whatsappUrl}?text=${encodeURIComponent(message)}`;
}
