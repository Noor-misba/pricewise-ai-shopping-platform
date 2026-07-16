export type StoreName =
  | 'Amazon'
  | 'Flipkart'
  | 'Myntra'
  | 'Croma'
  | 'Meesho'
  | 'Nykaa'
  | 'Tata CLiQ'
  | 'Ajio';

export interface StoreOffer {
  store: StoreName;
  price: number;
  mrp: number;
  rating: number;
  deliveryDays: number;
  inStock: boolean;
  url: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  gallery: string[];
  description: string;
  specs: Record<string, string>;
  offers: StoreOffer[];
  tags: string[];
}

export interface StoreMeta {
  name: StoreName;
  color: string;
  logo: string;
}

export const STORES: StoreMeta[] = [
  { name: 'Amazon', color: '#FF9900', logo: 'A' },
  { name: 'Flipkart', color: '#2874F0', logo: 'F' },
  { name: 'Myntra', color: '#E91E63', logo: 'M' },
  { name: 'Croma', color: '#12664F', logo: 'C' },
  { name: 'Meesho', color: '#F43397', logo: 'Me' },
  { name: 'Nykaa', color: '#FC2776', logo: 'N' },
  { name: 'Tata CLiQ', color: '#1A237E', logo: 'T' },
  { name: 'Ajio', color: '#2E2E2E', logo: 'Aj' },
];

const img = (id: number, w = 800, h = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`;

const buildOffers = (
  base: number,
  mrp: number,
  spread: number,
  stores: StoreName[],
): StoreOffer[] => {
  const ratings: Record<StoreName, number> = {
    Amazon: 4.4,
    Flipkart: 4.3,
    Myntra: 4.2,
    Croma: 4.5,
    Meesho: 4.1,
    Nykaa: 4.6,
    'Tata CLiQ': 4.2,
    Ajio: 4.0,
  };
  const delivery: Record<StoreName, number> = {
    Amazon: 1,
    Flipkart: 2,
    Myntra: 3,
    Croma: 2,
    Meesho: 4,
    Nykaa: 3,
    'Tata CLiQ': 3,
    Ajio: 4,
  };
  return stores.map((store, i) => {
    const price = Math.round((base + (i - stores.length / 2) * spread) * 100) / 100;
    return {
      store,
      price: Math.max(price, Math.round(mrp * 0.4)),
      mrp,
      rating: ratings[store],
      deliveryDays: delivery[store],
      inStock: i % 7 !== 6,
      url: '#',
    };
  });
};

export const PRODUCTS: Product[] = [
  {
    id: 'lakme-lipstick-9to5',
    name: 'Lakmé 9 to 5 Matte Lip Color — Plum Red',
    brand: 'Lakmé',
    category: 'Beauty',
    image: img(2533266),
    gallery: [img(2533266), img(3373736), img(2532523), img(2531531)],
    description:
      'Long-wearing matte lipstick with a creamy, comfortable finish. Enriched with Vitamin E and a lightweight formula that lasts up to 8 hours without drying your lips.',
    specs: {
      Shade: 'Plum Red',
      Finish: 'Matte',
      'Net Weight': '3.2g',
      'Skin Type': 'All',
      'Stay Time': 'Up to 8 hours',
    },
    offers: buildOffers(349, 650, 25, ['Amazon', 'Flipkart', 'Nykaa', 'Meesho', 'Tata CLiQ']),
    tags: ['lipstick', 'lakme', 'beauty', 'makeup', 'matte'],
  },
  {
    id: 'iphone-16-pro-256',
    name: 'Apple iPhone 16 Pro 256GB — Titanium Desert',
    brand: 'Apple',
    category: 'Electronics',
    image: img(788946),
    gallery: [img(788946), img(699122), img(1841841), img(47261)],
    description:
      '6.3-inch Super Retina XDR display, A18 Pro chip, 48MP Fusion camera with 5x Telephoto, and a Grade 5 titanium design. Built for Apple Intelligence.',
    specs: {
      Display: '6.3" Super Retina XDR',
      Chip: 'A18 Pro',
      Storage: '256GB',
      Camera: '48MP + 48MP + 12MP',
      Battery: 'Up to 27h video',
      Build: 'Grade 5 Titanium',
    },
    offers: buildOffers(134900, 144900, 1200, ['Amazon', 'Flipkart', 'Croma', 'Tata CLiQ']),
    tags: ['iphone', 'apple', 'phone', 'smartphone', '16'],
  },
  {
    id: 'samsung-s25-ultra',
    name: 'Samsung Galaxy S25 Ultra 512GB — Titanium Black',
    brand: 'Samsung',
    category: 'Electronics',
    image: img(1647976),
    gallery: [img(1647976), img(47261), img(1841841), img(1092644)],
    description:
      '6.9-inch Dynamic AMOLED 2X display, Snapdragon 8 Elite, 200MP camera with AI ProVisual engine, and an integrated S Pen. Galaxy AI on every app.',
    specs: {
      Display: '6.9" Dynamic AMOLED 2X',
      Chip: 'Snapdragon 8 Elite',
      Storage: '512GB',
      Camera: '200MP + 50MP + 50MP + 12MP',
      Battery: '5000mAh',
      Stylus: 'S Pen included',
    },
    offers: buildOffers(129999, 139999, 1500, ['Amazon', 'Flipkart', 'Croma', 'Tata CLiQ']),
    tags: ['samsung', 's25', 'galaxy', 'phone', 'smartphone'],
  },
  {
    id: 'boat-airdrops-441',
    name: 'boAt Airdopes 441 TWS Earbuds — Active Black',
    brand: 'boAt',
    category: 'Electronics',
    image: img(3780681),
    gallery: [img(3780681), img(3373736), img(2533266), img(1647976)],
    description:
      'True wireless earbuds with 6mm dynamic drivers, IPX4 sweat resistance, up to 25 hours of playback, and Type-C fast charging.',
    specs: {
      Driver: '6mm Dynamic',
      Battery: '25 hours total',
      'Water Rating': 'IPX4',
      Charging: 'Type-C',
      Latency: 'Beast Mode 110ms',
    },
    offers: buildOffers(1299, 2990, 90, ['Amazon', 'Flipkart', 'Croma', 'Meesho']),
    tags: ['boat', 'earbuds', 'tws', 'audio', 'wireless'],
  },
  {
    id: 'nike-air-max-270',
    name: 'Nike Air Max 270 — Triple Black',
    brand: 'Nike',
    category: 'Footwear',
    image: img(2529148),
    gallery: [img(2529148), img(1598505), img(2562623), img(1102777)],
    description:
      'Lifestyle sneaker with a large 270 Air unit for all-day comfort, breathable mesh upper, and a foam midsole for soft, responsive cushioning.',
    specs: {
      Silhouette: 'Air Max 270',
      Upper: 'Engineered Mesh',
      Midsole: 'Phylon Foam',
      'Air Unit': '270 Max Air',
      Outsole: 'Rubber Waffle',
    },
    offers: buildOffers(8999, 14995, 400, ['Amazon', 'Flipkart', 'Myntra', 'Ajio', 'Tata CLiQ']),
    tags: ['nike', 'shoes', 'sneakers', 'air max', 'footwear'],
  },
  {
    id: 'adidas-ultraboost-22',
    name: 'adidas Ultraboost 22 — Core Black',
    brand: 'adidas',
    category: 'Footwear',
    image: img(2529147),
    gallery: [img(2529147), img(1598505), img(2562623), img(1102777)],
    description:
      'Responsive BOOST cushioning, Primeknit upper that wraps the foot, and a Linear Energy Push system for a smooth, energy-returning ride.',
    specs: {
      Silhouette: 'Ultraboost 22',
      Upper: 'Primeknit',
      Midsole: 'BOOST',
      Outsole: 'Continental Rubber',
      Weight: '310g',
    },
    offers: buildOffers(11999, 18999, 600, ['Amazon', 'Flipkart', 'Myntra', 'Ajio']),
    tags: ['adidas', 'shoes', 'ultraboost', 'sneakers', 'footwear'],
  },
  {
    id: 'sony-wh-1000xm5',
    name: 'Sony WH-1000XM5 Wireless Headphones — Black',
    brand: 'Sony',
    category: 'Electronics',
    image: img(1649331),
    gallery: [img(1649331), img(3780681), img(3373736), img(1647976)],
    description:
      'Industry-leading noise cancellation with 8 microphones, 30-hour battery, crystal-clear hands-free calling, and Sony\'s V1 processor for pristine sound.',
    specs: {
      Driver: '30mm',
      'Noise Cancelling': 'Adaptive ANC (V1)',
      Battery: '30 hours',
      'Fast Charge': '3 min = 3 hours',
      Weight: '250g',
    },
    offers: buildOffers(26990, 34990, 800, ['Amazon', 'Flipkart', 'Croma', 'Tata CLiQ']),
    tags: ['sony', 'headphones', 'anc', 'audio', 'wireless'],
  },
  {
    id: 'maybelline-fit-me-foundation',
    name: 'Maybelline Fit Me Matte + Poreless Foundation — 220 Natural',
    brand: 'Maybelline',
    category: 'Beauty',
    image: img(2532523),
    gallery: [img(2532523), img(2533266), img(3373736), img(2531531)],
    description:
      'Lightweight, breathable foundation with a natural matte finish. Blurs pores and controls shine for up to 8 hours. Non-comedogenic and dermatologist tested.',
    specs: {
      Shade: '220 Natural',
      Finish: 'Matte + Poreless',
      Coverage: 'Medium',
      Volume: '30ml',
      'Skin Type': 'Normal to Oily',
    },
    offers: buildOffers(449, 749, 30, ['Amazon', 'Flipkart', 'Nykaa', 'Meesho']),
    tags: ['maybelline', 'foundation', 'beauty', 'makeup'],
  },
  {
    id: 'oneplus-12r',
    name: 'OnePlus 12R 256GB — Cool Blue',
    brand: 'OnePlus',
    category: 'Electronics',
    image: img(1092644),
    gallery: [img(1092644), img(1841841), img(699122), img(47261)],
    description:
      '6.78-inch 120Hz LTPO AMOLED, Snapdragon 8 Gen 2, 100W SUPERVOOC charging, and a 50MP Sony IMX890 main sensor with OIS.',
    specs: {
      Display: '6.78" 120Hz LTPO AMOLED',
      Chip: 'Snapdragon 8 Gen 2',
      Storage: '256GB',
      Charging: '100W SUPERVOOC',
      Battery: '5500mAh',
    },
    offers: buildOffers(39999, 45999, 700, ['Amazon', 'Flipkart', 'Croma']),
    tags: ['oneplus', '12r', 'phone', 'smartphone'],
  },
  {
    id: 'puma-rs-x-shoes',
    name: 'PUMA RS-X — Future Ready White',
    brand: 'PUMA',
    category: 'Footwear',
    image: img(2562623),
    gallery: [img(2562623), img(2529148), img(1598505), img(1102777)],
    description:
      'Chunky silhouette with RS cushioning, layered upper, and a bold color palette. Built for street style with all-day comfort.',
    specs: {
      Silhouette: 'RS-X',
      Upper: 'Synthetic + Mesh',
      Midsole: 'RS Foam',
      Outsole: 'Rubber',
      Weight: '380g',
    },
    offers: buildOffers(6499, 9999, 350, ['Amazon', 'Flipkart', 'Myntra', 'Ajio']),
    tags: ['puma', 'shoes', 'sneakers', 'footwear'],
  },
  {
    id: 'boat-rockerz-450',
    name: 'boAt Rockerz 450 Bluetooth Headphones — Black',
    brand: 'boAt',
    category: 'Electronics',
    image: img(3373736),
    gallery: [img(3373736), img(3780681), img(1649331), img(2533266)],
    description:
      'On-ear wireless headphones with 40mm drivers, up to 15 hours of playback, padded ear cushions, and a lightweight foldable design.',
    specs: {
      Driver: '40mm',
      Battery: '15 hours',
      Connectivity: 'Bluetooth 5.0',
      Charging: 'Micro USB',
      Weight: '220g',
    },
    offers: buildOffers(1499, 2990, 120, ['Amazon', 'Flipkart', 'Croma', 'Meesho']),
    tags: ['boat', 'headphones', 'audio', 'wireless'],
  },
  {
    id: 'mac-studio-fix-foundation',
    name: 'MAC Studio Fix Fluid Foundation — NW25',
    brand: 'MAC',
    category: 'Beauty',
    image: img(2531531),
    gallery: [img(2531531), img(2532523), img(2533266), img(3373736)],
    description:
      'Long-wearing, natural matte foundation with buildable medium-to-full coverage and a comfortable, shine-controlled finish for up to 24 hours.',
    specs: {
      Shade: 'NW25',
      Finish: 'Matte',
      Coverage: 'Medium to Full',
      Volume: '30ml',
      'Stay Time': 'Up to 24 hours',
    },
    offers: buildOffers(2890, 3500, 80, ['Amazon', 'Flipkart', 'Nykaa', 'Tata CLiQ']),
    tags: ['mac', 'foundation', 'beauty', 'makeup'],
  },
];

export const CATEGORIES = Array.from(new Set(PRODUCTS.map((p) => p.category)));
export const BRANDS = Array.from(new Set(PRODUCTS.map((p) => p.brand)));

export const bestOffer = (p: Product) =>
  p.offers.reduce((best, o) => (o.price < best.price ? o : best), p.offers[0]);

export const searchProducts = (q: string): Product[] => {
  const query = q.trim().toLowerCase();
  if (!query) return PRODUCTS;
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.tags.some((t) => t.includes(query)),
  );
};

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
