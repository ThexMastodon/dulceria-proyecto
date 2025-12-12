export interface Branch {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  manager: string;
  openingTime: string;
  closingTime: string;
  warehouseCount?: number;
  active: boolean;
  image?: string;
  createdAt?: string;
}
