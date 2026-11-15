import heroBannerImg from '../assets/images/hero_three_piece_banner_1794729959857.jpg';
import cottonMaroonImg from '../assets/images/three_piece_cotton_maroon_1794729959503.jpg';
import lawnEmeraldImg from '../assets/images/three_piece_lawn_emerald_1794729960225.jpg';
import silkNavyImg from '../assets/images/three_piece_silk_navy_1794729960770.jpg';
import chiffonRoseImg from '../assets/images/three_piece_chiffon_rose_1794729961436.jpg';
import georgettePlumImg from '../assets/images/three_piece_georgette_plum_1794729961683.jpg';
import { Product, ThreePieceCategory } from '../types/store';

export interface HeroSlide {
  id: string;
  kicker: string;
  kickerBn: string;
  title: string;
  titleBn: string;
  subtitle: string;
  subtitleBn: string;
  bengaliTagline: string;
  ctaLabel: string;
  ctaLabelBn: string;
  filterCategory: ThreePieceCategory;
  image: string;
}

export interface CategoryTile {
  category: Exclude<ThreePieceCategory, ThreePieceCategory.ALL>;
  title: string;
  titleBn: string;
  subtitle: string;
  subtitleBn: string;
  image: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-signature',
    kicker: 'Premium Quality',
    kickerBn: 'প্রিমিয়াম কোয়ালিটি',
    title: 'Three Piece',
    titleBn: 'থ্রি পিস কালেকশন',
    subtitle: 'Tradition Meets Elegance',
    subtitleBn: 'ঐতিহ্য ও আভিজাত্যের অপূর্ব মেলবন্ধন',
    bengaliTagline: 'সুন্দর পোশাকে আরও সুন্দর হোন',
    ctaLabel: 'Shop Now',
    ctaLabelBn: 'এখনই কিনুন',
    filterCategory: ThreePieceCategory.ALL,
    image: heroBannerImg,
  },
  {
    id: 'slide-lawn',
    kicker: 'Festive Swiss Edition',
    kickerBn: 'উৎসবের এক্সক্লুসিভ লন',
    title: 'Luxury Lawn',
    titleBn: 'লাক্সারি লন থ্রি পিস',
    subtitle: 'Breathable Cotton & Delicate Floral Zari',
    subtitleBn: 'আরামদায়ক সুতি ও নিখুঁত ফ্লোরাল কারুকাজ',
    bengaliTagline: 'গরমে আরামদায়ক ও নজরকাড়া ডিজাইন',
    ctaLabel: 'Explore Lawn',
    ctaLabelBn: 'লন কালেকশন দেখুন',
    filterCategory: ThreePieceCategory.LAWN,
    image: lawnEmeraldImg,
  },
  {
    id: 'slide-silk',
    kicker: 'Royal Evening Edit',
    kickerBn: 'রয়্যাল সিল্ক এডিট',
    title: 'Katan & Silk',
    titleBn: 'কাতান ও সিল্ক থ্রি পিস',
    subtitle: 'Handcrafted Threadwork for Celebrations',
    subtitleBn: 'দাওয়াত ও বিয়ের অনুষ্ঠানের অনন্য পছন্দ',
    bengaliTagline: 'নিখুঁত বুননে আভিজাত্যের ছোঁয়া',
    ctaLabel: 'Explore Silk',
    ctaLabelBn: 'সিল্ক দেখুন',
    filterCategory: ThreePieceCategory.SILK,
    image: silkNavyImg,
  },
];

export const CATEGORY_TILES: CategoryTile[] = [
  {
    category: ThreePieceCategory.LAWN,
    title: 'Lawn Three Piece',
    titleBn: 'লন থ্রি পিস',
    subtitle: 'Swiss & Digital Lawn',
    subtitleBn: 'সুইস ও ডিজিটাল লন',
    image: lawnEmeraldImg,
  },
  {
    category: ThreePieceCategory.COTTON,
    title: 'Cotton Three Piece',
    titleBn: 'কটন থ্রি পিস',
    subtitle: 'Pure Combed Cotton',
    subtitleBn: 'খাঁটি সুতি এমব্রয়ডারি',
    image: cottonMaroonImg,
  },
  {
    category: ThreePieceCategory.SILK,
    title: 'Silk Three Piece',
    titleBn: 'সিল্ক থ্রি পিস',
    subtitle: 'Soft Katan & Jamdani',
    subtitleBn: 'সফট কাতান ও সিল্ক',
    image: silkNavyImg,
  },
  {
    category: ThreePieceCategory.CHIFFON,
    title: 'Chiffon Three Piece',
    titleBn: 'শিফন থ্রি পিস',
    subtitle: 'Sheer Embroidered Drape',
    subtitleBn: 'হালকা জর্জেট ও শিফন',
    image: chiffonRoseImg,
  },
  {
    category: ThreePieceCategory.GEORGETTE,
    title: 'Georgette Three Piece',
    titleBn: 'জর্জেট থ্রি পিস',
    subtitle: 'Party & Bridal Zari',
    subtitleBn: 'পার্টি ও জরি কারুকাজ',
    image: georgettePlumImg,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'nf-cotton-01',
    sku: 'EF-CT-101',
    name: 'Premium Cotton Three Piece',
    nameBn: 'প্রিমিয়াম কটন থ্রি পিস',
    category: ThreePieceCategory.COTTON,
    price: 1200,
    originalPrice: 1500,
    discountPercent: 20,
    image: cottonMaroonImg,
    secondaryImage: georgettePlumImg,
    swatches: [
      { name: 'Deep Plum Maroon', nameBn: 'ডিপ মেরুন', hex: '#5E1832', image: cottonMaroonImg },
      { name: 'Wine Magenta', nameBn: 'ওয়াইন ম্যাজেন্টা', hex: '#7A1238', image: georgettePlumImg },
    ],
    description:
      'Breathable 100% combed cotton kameez finished with intricate rose-gold resham floral embroidery along the neckline and an airy embroidered cotton-voile dupatta.',
    descriptionBn:
      '১০০% খাঁটি সুতি কাপড়ে তৈরি কামিজের গলায় রোজ-গোল্ড রেশম সুতার নিখুঁত ফ্লোরাল এমব্রয়ডারি এবং ম্যাচিং এমব্রয়ডারি ওড়না।',
    specs: {
      kameez: 'Pure Combed Cotton (2.75 Yards)',
      salwar: 'Soft Dyed Cotton (2.50 Yards)',
      dupatta: 'Embroidered Cotton Voile (2.50 Yards)',
      work: 'Neckline & Border Resham Threadwork',
    },
    specsBn: {
      kameez: 'খাঁটি সুতি কাপড় (২.৭৫ গজ)',
      salwar: 'সফট কটন সেলোয়ার (২.৫০ গজ)',
      dupatta: 'এমব্রয়ডারি কটন ভয়েল ওড়না (২.৫০ গজ)',
      work: 'গলা ও পাড়ে রেশম সুতার কাজ',
    },
    inStock: true,
    isNewArrival: true,
    rating: 4.9,
    reviewsCount: 142,
  },
  {
    id: 'nf-lawn-02',
    sku: 'EF-LW-204',
    name: 'Luxury Lawn Three Piece',
    nameBn: 'লাক্সারি লন থ্রি পিস',
    category: ThreePieceCategory.LAWN,
    price: 1250,
    originalPrice: 1470,
    discountPercent: 15,
    image: lawnEmeraldImg,
    secondaryImage: cottonMaroonImg,
    swatches: [
      { name: 'Olive Emerald', nameBn: 'অলিভ এমারেল্ড', hex: '#3A4F30', image: lawnEmeraldImg },
      { name: 'Deep Plum', nameBn: 'ডিপ প্লাম', hex: '#5E1832', image: cottonMaroonImg },
    ],
    description:
      'Feather-light Swiss lawn ensemble in olive emerald adorned with coral botanical thread embroidery and scalloped gold crochet lace along the organza-soft dupatta.',
    descriptionBn:
      'হালকা ও আরামদায়ক সুইস লন কাপড়ে কোরাল ফ্লোরাল এমব্রয়ডারি এবং সোনালি লেস বর্ডার যুক্ত দৃষ্টিনন্দন ওড়না।',
    specs: {
      kameez: 'Swiss Premium Lawn (2.75 Yards)',
      salwar: 'Cambric Cotton (2.50 Yards)',
      dupatta: 'Chiffon Lace-Bordered Dupatta (2.50 Yards)',
      work: 'Coral Botanical Embroidery & Gold Crochet Lace',
    },
    specsBn: {
      kameez: 'সুইস প্রিমিয়াম লন (২.৭৫ গজ)',
      salwar: 'ক্যামব্রিক কটন সেলোয়ার (২.৫০ গজ)',
      dupatta: 'লেস বর্ডার শিফন ওড়না (২.৫০ গজ)',
      work: 'কোরাল ফ্লোরাল এমব্রয়ডারি ও সোনালি লেস',
    },
    inStock: true,
    isNewArrival: true,
    rating: 4.8,
    reviewsCount: 98,
  },
  {
    id: 'nf-silk-03',
    sku: 'EF-SL-308',
    name: 'Exclusive Silk Three Piece',
    nameBn: 'এক্সক্লুসিভ সিল্ক থ্রি পিস',
    category: ThreePieceCategory.SILK,
    price: 1100,
    originalPrice: 1470,
    discountPercent: 25,
    image: silkNavyImg,
    secondaryImage: georgettePlumImg,
    swatches: [
      { name: 'Midnight Navy', nameBn: 'মিডনাইট নেভি', hex: '#1B2848', image: silkNavyImg },
      { name: 'Royal Wine', nameBn: 'রয়্যাল ওয়াইন', hex: '#7A1238', image: georgettePlumImg },
    ],
    description:
      'Lustrous midnight navy soft silk kameez crafted with rich crimson-rose and antique gold zari floral motifs, paired with a statement wide-border silk dupatta.',
    descriptionBn:
      'মিডনাইট নেভি সফট সিল্কে অ্যান্টিক গোল্ড জরি ও গোলাপি ফুলের নিখুঁত কাজ, সাথে চওড়া পাড়ের আকর্ষণীয় সিল্ক ওড়না।',
    specs: {
      kameez: 'Soft Katan Silk (2.75 Yards)',
      salwar: 'Shantoon Silk Blend (2.50 Yards)',
      dupatta: 'Zari-Bordered Soft Silk (2.50 Yards)',
      work: 'Antique Gold Zari & Rose Thread Embroidery',
    },
    specsBn: {
      kameez: 'সফট কাতান সিল্ক (২.৭৫ গজ)',
      salwar: 'শান্তুন সিল্ক ব্লেন্ড (২.৫০ গজ)',
      dupatta: 'জরি বর্ডার সফট সিল্ক ওড়না (২.৫০ গজ)',
      work: 'অ্যান্টিক গোল্ড জরি ও গোলাপি সুতার কাজ',
    },
    inStock: true,
    isNewArrival: true,
    rating: 4.9,
    reviewsCount: 176,
  },
  {
    id: 'nf-georgette-04',
    sku: 'EF-GR-412',
    name: 'Elegant Georgette Three Piece',
    nameBn: 'এলিগ্যান্ট জর্জেট থ্রি পিস',
    category: ThreePieceCategory.GEORGETTE,
    price: 1300,
    originalPrice: 1580,
    discountPercent: 18,
    image: georgettePlumImg,
    secondaryImage: chiffonRoseImg,
    swatches: [
      { name: 'Royal Magenta Wine', nameBn: 'রয়্যাল ম্যাজেন্টা', hex: '#72103A', image: georgettePlumImg },
      { name: 'Dusty Rose Pink', nameBn: 'ডাস্টি রোজ পিঙ্ক', hex: '#C88D96', image: chiffonRoseImg },
    ],
    description:
      'Flowing wine-magenta georgette three-piece enriched with dense antique gold zari border patterns and subtle micro-sequins that catch evening light effortlessly.',
    descriptionBn:
      'আভিজাত্যপূর্ণ ওয়াইন-ম্যাজেন্টা জর্জেট থ্রি পিসে ঘন সোনালি জরি পাড় ও হালকা সিকুইনের ঝলক, রাতের যেকোনো দাওয়াতের জন্য আদর্শ।',
    specs: {
      kameez: 'Pure Crinkle Georgette with Inner (2.75 Yards)',
      salwar: 'Soft Butter Silk (2.50 Yards)',
      dupatta: 'Heavy Border Georgette Dupatta (2.50 Yards)',
      work: 'Dense Zari Floral Border & Micro-Sequins',
    },
    specsBn: {
      kameez: 'ইনারসহ পিওর ক্রিংকেল জর্জেট (২.৭৫ গজ)',
      salwar: 'সফট বাটার সিল্ক সেলোয়ার (২.৫০ গজ)',
      dupatta: 'হেভি বর্ডার জর্জেট ওড়না (২.৫০ গজ)',
      work: 'ঘন জরি ফ্লোরাল বর্ডার ও সিকুইন কাজ',
    },
    inStock: true,
    isNewArrival: true,
    rating: 4.9,
    reviewsCount: 118,
  },
  {
    id: 'nf-chiffon-05',
    sku: 'EF-CH-505',
    name: 'Pastel Rose Chiffon Three Piece',
    nameBn: 'প্যাস্টেল রোজ শিফন থ্রি পিস',
    category: ThreePieceCategory.CHIFFON,
    price: 1450,
    originalPrice: 1750,
    discountPercent: 17,
    image: chiffonRoseImg,
    secondaryImage: silkNavyImg,
    swatches: [
      { name: 'Dusty Rose Pink', nameBn: 'ডাস্টি রোজ', hex: '#C88D96', image: chiffonRoseImg },
      { name: 'Midnight Navy', nameBn: 'মিডনাইট নেভি', hex: '#1B2848', image: silkNavyImg },
    ],
    description:
      'Soft dusty-rose pure chiffon dress featuring silver zari vines, pastel floral threadwork, and pearl-tassel finishing along the sheer dupatta.',
    descriptionBn:
      'মিষ্টি ডাস্টি রোজ পিওর শিফনে রুপালি জরি লতা, প্যাস্টেল ফুলের কাজ ও ওড়নার পাড়ে মুক্তার ট্যাসেল ফিনিশিং।',
    specs: {
      kameez: 'Bemberg Chiffon with Silk Inner (2.75 Yards)',
      salwar: 'Soft Malai Silk (2.50 Yards)',
      dupatta: 'Pearl-Tassel Sheer Chiffon (2.50 Yards)',
      work: 'Silver Zari, Pastel Thread & Pearl Edging',
    },
    specsBn: {
      kameez: 'সিল্ক ইনারসহ বেমবার্গ শিফন (২.৭৫ গজ)',
      salwar: 'সফট মালাই সিল্ক (২.৫০ গজ)',
      dupatta: 'পার্ল-ট্যাসেল শিফন ওড়না (২.৫০ গজ)',
      work: 'সিলভার জরি ও প্যাস্টেল ফ্লোরাল এমব্রয়ডারি',
    },
    inStock: true,
    isNewArrival: false,
    rating: 4.8,
    reviewsCount: 84,
  },
  {
    id: 'nf-cotton-06',
    sku: 'EF-CT-118',
    name: 'Heritage Aari Cotton Set',
    nameBn: 'হেরিটেজ আরি কটন সেট',
    category: ThreePieceCategory.COTTON,
    price: 1350,
    originalPrice: 1650,
    discountPercent: 18,
    image: cottonMaroonImg,
    secondaryImage: lawnEmeraldImg,
    swatches: [
      { name: 'Mulberry Wine', nameBn: 'মালবেরি ওয়াইন', hex: '#5E1832', image: cottonMaroonImg },
      { name: 'Olive Emerald', nameBn: 'অলিভ এমারেল্ড', hex: '#3A4F30', image: lawnEmeraldImg },
    ],
    description:
      'Crafted for all-day grace with high-twist breathable cotton, heirloom aari-inspired floral placket, and soft matching handloom dupatta.',
    descriptionBn:
      'সারাদিনের আরামের জন্য হাই-টুইস্ট ব্রিদেবল কটন, ঐতিহ্যবাহী আরি এমব্রয়ডারি ও ম্যাচিং হ্যান্ডলুম ওড়না।',
    specs: {
      kameez: 'High-Twist Breathable Cotton (2.75 Yards)',
      salwar: 'Pure Cotton Poplin (2.50 Yards)',
      dupatta: 'Handloom Bordered Cotton (2.50 Yards)',
      work: 'Aari Floral Placket & Damani Border',
    },
    specsBn: {
      kameez: 'হাই-টুইস্ট ব্রিদেবল কটন (২.৭৫ গজ)',
      salwar: 'পিওর কটন পপলিন (২.৫০ গজ)',
      dupatta: 'হ্যান্ডলুম বর্ডার কটন ওড়না (২.৫০ গজ)',
      work: 'আরি ফ্লোরাল গলা ও দামান কাজ',
    },
    inStock: true,
    isNewArrival: false,
    rating: 4.7,
    reviewsCount: 63,
  },
  {
    id: 'nf-lawn-07',
    sku: 'EF-LW-219',
    name: 'Botanical Swiss Lawn Edit',
    nameBn: 'বোটানিক্যাল সুইস লন এডিট',
    category: ThreePieceCategory.LAWN,
    price: 1380,
    originalPrice: 1620,
    discountPercent: 15,
    image: lawnEmeraldImg,
    secondaryImage: chiffonRoseImg,
    swatches: [
      { name: 'Forest Moss', nameBn: 'ফরেস্ট মস', hex: '#3A4F30', image: lawnEmeraldImg },
      { name: 'Blush Rose', nameBn: 'ব্লাশ রোজ', hex: '#C88D96', image: chiffonRoseImg },
    ],
    description:
      'Signature summer luxury lawn with multi-head coral and gold botanical embroidery and feather-soft scalloped chiffon dupatta.',
    descriptionBn:
      'সামার লাক্সারি সুইস লনে মাল্টি-হেড কোরাল ও গোল্ড বোটানিক্যাল এমব্রয়ডারি এবং স্ক্যালপড শিফন ওড়না।',
    specs: {
      kameez: '80-Count Swiss Lawn (2.75 Yards)',
      salwar: 'Dyed Lawn Cotton (2.50 Yards)',
      dupatta: 'Scalloped Swiss Chiffon (2.50 Yards)',
      work: 'Multi-Head Botanical Thread & Lace',
    },
    specsBn: {
      kameez: '৮০-কাউন্ট সুইস লন (২.৭৫ গজ)',
      salwar: 'ডাইড লন কটন (২.৫০ গজ)',
      dupatta: 'স্ক্যালপড সুইস শিফন ওড়না (২.৫০ গজ)',
      work: 'মাল্টি-হেড ফ্লোরাল এমব্রয়ডারি ও লেস',
    },
    inStock: true,
    isNewArrival: false,
    rating: 4.9,
    reviewsCount: 110,
  },
  {
    id: 'nf-silk-08',
    sku: 'EF-SL-324',
    name: 'Nawab Mahal Katan Silk',
    nameBn: 'নবাব মহল কাতান সিল্ক',
    category: ThreePieceCategory.SILK,
    price: 1680,
    originalPrice: 2100,
    discountPercent: 20,
    image: silkNavyImg,
    secondaryImage: cottonMaroonImg,
    swatches: [
      { name: 'Indigo Zari', nameBn: 'ইন্ডিগো জরি', hex: '#1B2848', image: silkNavyImg },
      { name: 'Royal Maroon', nameBn: 'রয়্যাল মেরুন', hex: '#5E1832', image: cottonMaroonImg },
    ],
    description:
      'Festive Katan silk three-piece woven with heirloom floral medallions, delicate gold zari trim, and rich contrasting silk trouser fabric.',
    descriptionBn:
      'উৎসবের বিশেষ কাতান সিল্ক থ্রি পিসে রাজকীয় ফ্লোরাল মেডেলিয়ন, সোনালি জরি পাড় ও ম্যাচিং সিল্ক সেলোয়ার।',
    specs: {
      kameez: 'Handloom Blend Katan Silk (2.75 Yards)',
      salwar: 'Lustrous Raw Silk (2.50 Yards)',
      dupatta: 'Woven Zari Pallu Silk Dupatta (2.50 Yards)',
      work: 'Heirloom Zari Medallions & Resham Motifs',
    },
    specsBn: {
      kameez: 'হ্যান্ডলুম ব্লেন্ড কাতান সিল্ক (২.৭৫ গজ)',
      salwar: 'লাস্ট্রাস র-সিল্ক (২.৫০ গজ)',
      dupatta: 'জরি পল্লু সিল্ক ওড়না (২.৫০ গজ)',
      work: 'রাজকীয় জরি মেডেলিয়ন ও রেশম কাজ',
    },
    inStock: true,
    isNewArrival: true,
    rating: 5.0,
    reviewsCount: 91,
  },
];

export const COUPONS: Record<string, { discountRate: number; label: string }> = {
  EID10: { discountRate: 0.1, label: '10% Festive Discount' },
  EMFA15: { discountRate: 0.15, label: '15% Welcome Boutique Offer' },
};
