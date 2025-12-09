export type Role = 'client' | 'admin' | 'almacen' | 'cashier' | 'delivery' | 'promoter' | 'RH' | 'manager';

export interface User {
  id: string;
  name: string;
  lastName?: string;
  secondLastName?: string;
  role: Role | string;
  email: string;
  avatar?: string;
  active?: boolean;
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