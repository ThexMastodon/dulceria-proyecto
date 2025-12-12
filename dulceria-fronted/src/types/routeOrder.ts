export type RouteOrderStatus = 'pending' | 'confirmed' | 'delivered' | 'rejected' | 'rescheduled';

export interface RouteOrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface RouteCustomer {
  id: string;
  name: string;
  phone: string;
  businessName: string;
  email: string;
  address: string;
  neighborhood: string;
  city: string;
  zipCode: string;
  imageUrl?: string;
  rfc?: string;
  routeId: string;
  routeName?: string;
  lat?: number;
  lng?: number;
}

export interface RouteOrder {
  id: string;
  orderNumber: string;
  routeId: string;
  routeName?: string;
  deliveryPersonId: string;
  deliveryPersonName?: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  lat?: number;
  lng?: number;
  items: RouteOrderItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: RouteOrderStatus;
  paymentMethod: 'cash' | 'card' | 'transfer';
  paymentStatus: 'pending' | 'paid' | 'partial';
  notes?: string;
  deliveryDate: string;
  deliveryTime?: string;
  createdAt: string;
  updatedAt?: string;
  deliveredAt?: string;
  rejectionReason?: string;
}
