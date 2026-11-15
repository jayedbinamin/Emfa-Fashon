export type Language = 'en' | 'bn';

export enum ThreePieceCategory {
  ALL = 'All',
  COTTON = 'Cotton',
  LAWN = 'Lawn',
  SILK = 'Silk',
  CHIFFON = 'Chiffon',
  GEORGETTE = 'Georgette',
}

export enum StitchOption {
  UNSTITCHED = 'Unstitched 3-Piece',
  SMALL = 'Stitched - S (36")',
  MEDIUM = 'Stitched - M (38")',
  LARGE = 'Stitched - L (40")',
  XL = 'Stitched - XL (42")',
}

export enum PaymentMethod {
  COD = 'Cash on Delivery',
  BKASH = 'bKash',
  NAGAD = 'Nagad',
  CARD = 'Visa / Mastercard',
}

export enum DeliveryZone {
  INSIDE_DHAKA = 'Inside Dhaka',
  OUTSIDE_DHAKA = 'Outside Dhaka',
}

export interface ColorSwatch {
  name: string;
  nameBn: string;
  hex: string;
  image: string;
}

export interface FabricSpecs {
  kameez: string;
  salwar: string;
  dupatta: string;
  work: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  nameBn: string;
  category: Exclude<ThreePieceCategory, ThreePieceCategory.ALL>;
  price: number;
  originalPrice: number;
  discountPercent: number;
  image: string;
  secondaryImage: string;
  swatches: ColorSwatch[];
  description: string;
  descriptionBn: string;
  specs: FabricSpecs;
  specsBn: FabricSpecs;
  inStock: boolean;
  isNewArrival: boolean;
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  key: string;
  product: Product;
  selectedSwatch: ColorSwatch;
  stitchOption: StitchOption;
  quantity: number;
}

export interface OrderRecord {
  orderId: string;
  createdAt: string;
  customerName: string;
  phone: string;
  address: string;
  deliveryZone: DeliveryZone;
  paymentMethod: PaymentMethod;
  items: {
    productId: string;
    name: string;
    nameBn: string;
    swatchName: string;
    stitchOption: StitchOption;
    quantity: number;
    unitPrice: number;
    image: string;
  }[];
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  status: 'Confirmed — Preparing Shipment' | 'Dispatched' | 'Delivered';
  notes?: string;
}
