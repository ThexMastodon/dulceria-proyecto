export interface Supplier {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  rfc: string;
  logo?: string;
  active: boolean;
  createdAt?: string;
}
