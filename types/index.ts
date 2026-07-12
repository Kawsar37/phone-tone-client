export interface IUser {
  _id: string;
  name: string;
  email: string;
  photoURL?: string;
  phone?: string;
  role: "user" | "admin";
  status: "active" | "blocked";
  createdAt: string;
}

export interface IPhone {
  _id: string;
  name: string;
  slug: string;
  brand: string;
  images: string[];
  shortDescription: string;
  description: string;
  price: number;
  operatingSystem: string;
  processor: string;
  chipset: string;
  gpu: string;
  ram: string;
  storage: string;
  display: {
    type: string;
    size: string;
    resolution: string;
    refreshRate: string;
  };
  battery: { capacity: string; charging: string };
  camera: { rear: string; front: string };
  connectivity: {
    network: string;
    wifi: string;
    bluetooth: string;
    nfc: string;
  };
  colors: string[];
  releaseDate: string;
  rating: number;
  stock: number;
  createdBy: string;
  createdAt: string;
}

export interface ICartItem {
  _id: string;
  userId: string;
  phoneId: IPhone;
  quantity: number;
}

export interface IOrder {
  _id: string;
  userId: IUser;
  items: { phoneId: IPhone; quantity: number; price: number }[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
  paymentMethod: "cod" | "bkash";
  paymentStatus: "pending" | "paid";
  orderStatus: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  shippingAddress: {
    fullName: string;
    phone: string;
    district: string;
    area: string;
    address: string;
  };
  createdAt: string;
}

export interface IReview {
  _id: string;
  phoneId: string;
  userId: IUser;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface IApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  [key: string]: unknown;
}
