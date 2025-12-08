export type Role = 'client' | 'admin' | 'manager' | 'cashier' | 'delivery' | 'promoter';

export interface User {
  id: string;
  name: string;
  role: Role;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Chocolate' | 'Gomitas' | 'Desechable' | 'Bedidas';
  unit: 'kg' | 'g' | 'l' | 'ml' | 'unit';
  stock: number;
  color?: string;
}