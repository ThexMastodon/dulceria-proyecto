import { RouteCustomer } from '@/types/routeOrder';
import { ICustomerRepository } from '@/interfaces/ICustomerRepository';

const INITIAL_CUSTOMERS: RouteCustomer[] = [
  {
    id: 'cust-101',
    name: 'Juan Pérez',
    phone: '55-1111-2222',
    businessName: 'Abarrotes La Esquina',
    email: 'contacto@laesquina.com',
    address: 'Calle 5 de Mayo 123',
    neighborhood: 'Centro',
    city: 'CDMX',
    zipCode: '06000',
    imageUrl: undefined,
    rfc: 'JUPE800101AAA',
    routeId: 'route-1',
    routeName: 'Ruta Norte - Zona 1',
    lat: 19.437,
    lng: -99.133,
  },
  {
    id: 'cust-102',
    name: 'María Gómez',
    phone: '55-3333-4444',
    businessName: 'Mini Súper Las Palmas',
    email: 'ventas@laspalmas.mx',
    address: 'Av. Reforma 456',
    neighborhood: 'Juárez',
    city: 'CDMX',
    zipCode: '06600',
    imageUrl: undefined,
    rfc: 'MAGO810202BBB',
    routeId: 'route-2',
    routeName: 'Ruta Sur - Zona 2',
    lat: 19.427,
    lng: -99.154,
  },
  {
    id: 'cust-103',
    name: 'Pedro López',
    phone: '55-5555-6666',
    businessName: 'Tienda Don Pepe',
    email: 'donpepe@tienda.com',
    address: 'Insurgentes Sur 789',
    neighborhood: 'Del Valle',
    city: 'CDMX',
    zipCode: '03100',
    imageUrl: undefined,
    rfc: 'PELO820303CCC',
    routeId: 'route-3',
    routeName: 'Ruta Centro - Zona 3',
    lat: 19.381,
    lng: -99.162,
  },
];

class CustomerRepository implements ICustomerRepository {
  private customers: RouteCustomer[] = INITIAL_CUSTOMERS;
  private nextId = this.customers.length + 1;

  async getAll(): Promise<RouteCustomer[]> {
    return new Promise((resolve) => setTimeout(() => resolve([...this.customers]), 200));
  }

  async getById(id: string): Promise<RouteCustomer | null> {
    return new Promise((resolve) => setTimeout(() => {
      const c = this.customers.find(x => x.id === id) || null;
      resolve(c);
    }, 150));
  }

  async search(query: string): Promise<RouteCustomer[]> {
    const q = query.trim().toLowerCase();
    if (!q) return this.getAll();
    return new Promise((resolve) => setTimeout(() => {
      const results = this.customers.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q)
      );
      resolve(results);
    }, 180));
  }

  async create(customer: Omit<RouteCustomer, 'id'>): Promise<RouteCustomer> {
    return new Promise((resolve) => setTimeout(() => {
      const newCustomer: RouteCustomer = {
        ...customer,
        id: `cust-${this.nextId++}`,
      };
      this.customers.push(newCustomer);
      resolve(newCustomer);
    }, 200));
  }

  async update(id: string, updates: Partial<RouteCustomer>): Promise<RouteCustomer> {
    return new Promise((resolve, reject) => setTimeout(() => {
      const idx = this.customers.findIndex(c => c.id === id);
      if (idx === -1) {
        reject(new Error('Customer not found'));
        return;
      }
      this.customers[idx] = { ...this.customers[idx], ...updates };
      resolve({ ...this.customers[idx] });
    }, 200));
  }

  async delete(id: string): Promise<void> {
    return new Promise((resolve, reject) => setTimeout(() => {
      const idx = this.customers.findIndex(c => c.id === id);
      if (idx === -1) {
        reject(new Error('Customer not found'));
        return;
      }
      this.customers.splice(idx, 1);
      resolve();
    }, 200));
  }
}

export const customerRepository = new CustomerRepository();
