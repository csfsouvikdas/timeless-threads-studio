export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Hoodies" | "T-Shirts" | "Sweatshirts" | "Custom" | "Limited Edition";
  sizes: string[];
  colors: string[];
  images: string[];
  stock: number;
  visible: boolean;
  careInstructions: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
  customText?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: "Order Received" | "Design In Progress" | "Stitching" | "Shipped" | "Delivered";
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  trackingNumber?: string;
  createdAt: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface CustomOrder {
  id: string;
  userId: string;
  clothingType: string;
  color: string;
  size: string;
  referenceImageUrl?: string;
  customText?: string;
  notes?: string;
  estimatedPrice?: number;
  status: "Pending" | "Approved" | "In Progress" | "Completed" | "Rejected";
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
}
