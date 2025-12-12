import { Product } from '@/types/product';
import { IProductRepository } from '@/interfaces/IProductRepository';

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Chocolate con Leche Premium',
    description: 'Chocolate suave con leche de alta calidad',
    sku: 'CHOC-001',
    price: 45.00,
    cost: 30.00,
    stock: 150,
    minStock: 20,
    category: 'Chocolates',
    unit: 'pza',
    supplierId: '2',
    supplierName: 'Chocolates Premium',
    image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&h=400&fit=crop',
    active: true,
    createdAt: '2024-01-20',
  },
  {
    id: '2',
    name: 'Gomitas de Ositos',
    description: 'Gomitas en forma de osito con sabores surtidos',
    sku: 'GOM-001',
    price: 25.00,
    cost: 15.00,
    stock: 300,
    minStock: 50,
    category: 'Gomitas',
    unit: 'paquete',
    supplierId: '3',
    supplierName: 'Gomitas y Más',
    image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400&h=400&fit=crop',
    active: true,
    createdAt: '2024-01-22',
  },
  {
    id: '3',
    name: 'Paletas de Caramelo',
    description: 'Paletas tradicionales de caramelo macizo',
    sku: 'CAR-001',
    price: 8.00,
    cost: 4.00,
    stock: 500,
    minStock: 100,
    category: 'Caramelos',
    unit: 'pza',
    supplierId: '1',
    supplierName: 'Dulces Tradicionales SA',
    image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400&h=400&fit=crop',
    active: true,
    createdAt: '2024-02-01',
  },
  {
    id: '4',
    name: 'Chocolate Obscuro 70%',
    description: 'Chocolate amargo con 70% de cacao',
    sku: 'CHOC-002',
    price: 65.00,
    cost: 45.00,
    stock: 80,
    minStock: 15,
    category: 'Chocolates',
    unit: 'pza',
    supplierId: '2',
    supplierName: 'Chocolates Premium',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4f0c3e0c?w=400&h=400&fit=crop',
    active: true,
    createdAt: '2024-02-05',
  },
  {
    id: '5',
    name: 'Gomitas Ácidas',
    description: 'Gomitas con cobertura ácida sabor frutas',
    sku: 'GOM-002',
    price: 30.00,
    cost: 18.00,
    stock: 200,
    minStock: 40,
    category: 'Gomitas',
    unit: 'paquete',
    supplierId: '3',
    supplierName: 'Gomitas y Más',
    image: 'https://images.unsplash.com/photo-1603481587555-9a2c0c9ca8c4?w=400&h=400&fit=crop',
    active: true,
    createdAt: '2024-02-10',
  },
  {
    id: '6',
    name: 'Dulce de Tamarindo',
    description: 'Dulce regional de tamarindo enchilado',
    sku: 'REG-001',
    price: 15.00,
    cost: 8.00,
    stock: 350,
    minStock: 60,
    category: 'Dulces Regionales',
    unit: 'pza',
    supplierId: '1',
    supplierName: 'Dulces Tradicionales SA',
    active: true,
    createdAt: '2024-02-12',
  },
  {
    id: '7',
    name: 'Caramelos Importados Surtidos',
    description: 'Variedad de caramelos importados de Europa',
    sku: 'IMP-001',
    price: 120.00,
    cost: 80.00,
    stock: 50,
    minStock: 10,
    category: 'Importados',
    unit: 'caja',
    supplierId: '6',
    supplierName: 'Dulces Importados',
    image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400&h=400&fit=crop',
    active: true,
    createdAt: '2024-02-15',
  },
  {
    id: '8',
    name: 'Mazapán',
    description: 'Dulce tradicional de cacahuate',
    sku: 'REG-002',
    price: 12.00,
    cost: 6.00,
    stock: 10,
    minStock: 30,
    category: 'Dulces Regionales',
    unit: 'pza',
    supplierId: '1',
    supplierName: 'Dulces Tradicionales SA',
    active: false,
    createdAt: '2024-02-18',
  },
];

export class ProductRepository implements IProductRepository {
  private products: Product[];

  constructor(initialProducts: Product[] = INITIAL_PRODUCTS) {
    this.products = [...initialProducts];
  }

  async getAll(): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return [...this.products];
  }

  async getById(id: string): Promise<Product | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const product = this.products.find(p => p.id === id);
    return product ? { ...product } : null;
  }

  async getBySupplierId(supplierId: string): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.products.filter(p => p.supplierId === supplierId);
  }

  async create(productData: Omit<Product, 'id'>): Promise<Product> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const newProduct: Product = {
      id: Math.random().toString(36).substr(2, 9),
      ...productData,
      createdAt: new Date().toISOString().split('T')[0],
    };
    this.products.push(newProduct);
    return { ...newProduct };
  }

  async update(id: string, productData: Partial<Product>): Promise<Product> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Producto no encontrado');
    }
    this.products[index] = { ...this.products[index], ...productData };
    return { ...this.products[index] };
  }

  async delete(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Producto no encontrado');
    }
    this.products.splice(index, 1);
  }
}

// Singleton instance
export const productRepository = new ProductRepository();
