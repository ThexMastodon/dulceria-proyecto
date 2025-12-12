export interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  category: 'Chocolates' | 'Gomitas' | 'Caramelos' | 'Dulces Regionales' | 'Importados' | 'Otros';
  unit: 'kg' | 'g' | 'l' | 'ml' | 'pza' | 'caja' | 'paquete';
  supplierId: string;
  supplierName?: string;
  image?: string;
  active: boolean;
  createdAt?: string;
}
