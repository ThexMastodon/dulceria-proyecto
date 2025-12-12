import { Branch } from '@/types/branch';
import { IBranchRepository } from '@/interfaces/IBranchRepository';

const INITIAL_BRANCHES: Branch[] = [
  {
    id: '1',
    name: 'Sucursal Centro',
    code: 'SUC-001',
    address: 'Av. Hidalgo 123',
    city: 'Ciudad de México',
    state: 'CDMX',
    phone: '55-1111-2222',
    email: 'centro@dulceria.com',
    manager: 'Juan Pérez',
    openingTime: '08:00',
    closingTime: '20:00',
    warehouseCount: 3,
    active: true,
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
    createdAt: '2024-01-10',
  },
  {
    id: '2',
    name: 'Sucursal Norte',
    code: 'SUC-002',
    address: 'Av. Insurgentes Norte 456',
    city: 'Ciudad de México',
    state: 'CDMX',
    phone: '55-3333-4444',
    email: 'norte@dulceria.com',
    manager: 'María García',
    openingTime: '09:00',
    closingTime: '21:00',
    warehouseCount: 2,
    active: true,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
    createdAt: '2024-01-15',
  },
  {
    id: '3',
    name: 'Sucursal Sur',
    code: 'SUC-003',
    address: 'Calz. de Tlalpan 789',
    city: 'Ciudad de México',
    state: 'CDMX',
    phone: '55-5555-6666',
    email: 'sur@dulceria.com',
    manager: 'Carlos López',
    openingTime: '08:00',
    closingTime: '20:00',
    warehouseCount: 2,
    active: true,
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400',
    createdAt: '2024-02-01',
  },
  {
    id: '4',
    name: 'Sucursal Guadalajara',
    code: 'SUC-004',
    address: 'Av. Chapultepec 321',
    city: 'Guadalajara',
    state: 'Jalisco',
    phone: '33-7777-8888',
    email: 'gdl@dulceria.com',
    manager: 'Ana Martínez',
    openingTime: '09:00',
    closingTime: '20:00',
    warehouseCount: 1,
    active: true,
    image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=400',
    createdAt: '2024-02-10',
  },
  {
    id: '5',
    name: 'Sucursal Monterrey',
    code: 'SUC-005',
    address: 'Av. Constitución 654',
    city: 'Monterrey',
    state: 'Nuevo León',
    phone: '81-9999-0000',
    email: 'mty@dulceria.com',
    manager: 'Roberto Sánchez',
    openingTime: '08:00',
    closingTime: '21:00',
    warehouseCount: 2,
    active: true,    image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=400',    createdAt: '2024-02-15',
  },
  {
    id: '6',
    name: 'Sucursal Puebla (Cerrada)',
    code: 'SUC-006',
    address: 'Av. Reforma 987',
    city: 'Puebla',
    state: 'Puebla',
    phone: '222-1111-2222',
    email: 'puebla@dulceria.com',
    manager: 'Laura Torres',
    openingTime: '09:00',
    closingTime: '19:00',
    warehouseCount: 0,
    active: false,
    createdAt: '2023-11-20',
  },
];

export class BranchRepository implements IBranchRepository {
  private branches: Branch[];

  constructor(initialBranches: Branch[] = INITIAL_BRANCHES) {
    this.branches = [...initialBranches];
  }

  async getAll(): Promise<Branch[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return [...this.branches];
  }

  async getById(id: string): Promise<Branch | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const branch = this.branches.find(b => b.id === id);
    return branch ? { ...branch } : null;
  }

  async create(branchData: Omit<Branch, 'id'>): Promise<Branch> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const newBranch: Branch = {
      id: Math.random().toString(36).substr(2, 9),
      ...branchData,
      warehouseCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    this.branches.push(newBranch);
    return { ...newBranch };
  }

  async update(id: string, branchData: Partial<Branch>): Promise<Branch> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = this.branches.findIndex(b => b.id === id);
    if (index === -1) {
      throw new Error('Sucursal no encontrada');
    }
    this.branches[index] = { ...this.branches[index], ...branchData };
    return { ...this.branches[index] };
  }

  async delete(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = this.branches.findIndex(b => b.id === id);
    if (index === -1) {
      throw new Error('Sucursal no encontrada');
    }
    this.branches.splice(index, 1);
  }
}

// Singleton instance
export const branchRepository = new BranchRepository();
