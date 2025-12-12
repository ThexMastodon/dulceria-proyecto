import { Supplier } from '@/types/supplier';
import { ISupplierRepository } from '@/interfaces/ISupplierRepository';

const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: '1',
    name: 'Dulces Tradicionales SA',
    contactName: 'María González',
    email: 'maria@dulcestradicionales.com',
    phone: '55-1234-5678',
    address: 'Av. Insurgentes 123',
    city: 'Ciudad de México',
    state: 'CDMX',
    rfc: 'DTS850101ABC',
    logo: 'https://ui-avatars.com/api/?name=DT&background=ec4899&color=fff&size=128',
    active: true,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Chocolates Premium',
    contactName: 'Roberto Sánchez',
    email: 'roberto@chocolatespremium.com',
    phone: '33-9876-5432',
    address: 'Calzada del Valle 456',
    city: 'Guadalajara',
    state: 'Jalisco',
    rfc: 'CPR900215XYZ',
    logo: 'https://ui-avatars.com/api/?name=CP&background=8b5cf6&color=fff&size=128',
    active: true,
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    name: 'Gomitas y Más',
    contactName: 'Ana Martínez',
    email: 'ana@gomitasymas.com',
    phone: '81-5555-1234',
    address: 'Av. Constitución 789',
    city: 'Monterrey',
    state: 'Nuevo León',
    rfc: 'GYM950320DEF',
    logo: 'https://ui-avatars.com/api/?name=GM&background=10b981&color=fff&size=128',
    active: true,
    createdAt: '2024-03-10',
  },
  {
    id: '4',
    name: 'Distribuidora Nacional',
    contactName: 'Carlos Ramírez',
    email: 'carlos@distnacional.com',
    phone: '55-8888-9999',
    address: 'Calle Principal 321',
    city: 'Ciudad de México',
    state: 'CDMX',
    rfc: 'DIN880425GHI',
    active: false,
    createdAt: '2023-12-05',
  },
  {
    id: '5',
    name: 'Caramelos del Sur',
    contactName: 'Laura Pérez',
    email: 'laura@caramelossur.com',
    phone: '998-777-6666',
    address: 'Boulevard Kukulcán 555',
    city: 'Cancún',
    state: 'Quintana Roo',
    rfc: 'CDS920530JKL',
    logo: 'https://ui-avatars.com/api/?name=CS&background=f59e0b&color=fff&size=128',
    active: true,
    createdAt: '2024-01-25',
  },
  {
    id: '6',
    name: 'Dulces Importados',
    contactName: 'Fernando López',
    email: 'fernando@dulcesimportados.com',
    phone: '55-4444-3333',
    address: 'Av. Reforma 888',
    city: 'Ciudad de México',
    state: 'CDMX',
    rfc: 'DIM870615MNO',
    logo: 'https://ui-avatars.com/api/?name=DI&background=3b82f6&color=fff&size=128',
    active: true,
    createdAt: '2024-04-01',
  },
];

export class SupplierRepository implements ISupplierRepository {
  private suppliers: Supplier[];

  constructor(initialSuppliers: Supplier[] = INITIAL_SUPPLIERS) {
    this.suppliers = [...initialSuppliers];
  }

  async getAll(): Promise<Supplier[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return [...this.suppliers];
  }

  async getById(id: string): Promise<Supplier | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const supplier = this.suppliers.find(s => s.id === id);
    return supplier ? { ...supplier } : null;
  }

  async create(supplierData: Omit<Supplier, 'id'>): Promise<Supplier> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const newSupplier: Supplier = {
      id: Math.random().toString(36).substr(2, 9),
      ...supplierData,
      createdAt: new Date().toISOString().split('T')[0],
    };
    this.suppliers.push(newSupplier);
    return { ...newSupplier };
  }

  async update(id: string, supplierData: Partial<Supplier>): Promise<Supplier> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = this.suppliers.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error('Proveedor no encontrado');
    }
    this.suppliers[index] = { ...this.suppliers[index], ...supplierData };
    return { ...this.suppliers[index] };
  }

  async delete(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = this.suppliers.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error('Proveedor no encontrado');
    }
    this.suppliers.splice(index, 1);
  }
}

// Singleton instance
export const supplierRepository = new SupplierRepository();
