import { Warehouse } from '@/types/warehouse';
import { IWarehouseRepository } from '@/interfaces/IWarehouseRepository';

const INITIAL_WAREHOUSES: Warehouse[] = [
  {
    id: '1',
    name: 'Almacén Principal Centro',
    code: 'ALM-001',
    branchId: '1',
    branchName: 'Sucursal Centro',
    type: 'Principal',
    capacity: 1000,
    currentStock: 750,
    manager: 'Pedro Ramírez',
    description: 'Almacén principal para productos de alta rotación',
    active: true,
    createdAt: '2024-01-10',
  },
  {
    id: '2',
    name: 'Almacén Refrigerado Centro',
    code: 'ALM-002',
    branchId: '1',
    branchName: 'Sucursal Centro',
    type: 'Refrigerado',
    capacity: 300,
    currentStock: 200,
    manager: 'Luis González',
    description: 'Almacén con refrigeración para chocolates premium',
    active: true,
    createdAt: '2024-01-10',
  },
  {
    id: '3',
    name: 'Almacén Temporal Centro',
    code: 'ALM-003',
    branchId: '1',
    branchName: 'Sucursal Centro',
    type: 'Temporal',
    capacity: 500,
    currentStock: 120,
    manager: 'Pedro Ramírez',
    description: 'Almacén para mercancía en tránsito',
    active: true,
    createdAt: '2024-01-12',
  },
  {
    id: '4',
    name: 'Almacén Principal Norte',
    code: 'ALM-004',
    branchId: '2',
    branchName: 'Sucursal Norte',
    type: 'Principal',
    capacity: 800,
    currentStock: 600,
    manager: 'Andrea Flores',
    description: 'Almacén principal sucursal norte',
    active: true,
    createdAt: '2024-01-15',
  },
  {
    id: '5',
    name: 'Almacén Secundario Norte',
    code: 'ALM-005',
    branchId: '2',
    branchName: 'Sucursal Norte',
    type: 'Secundario',
    capacity: 400,
    currentStock: 250,
    manager: 'Andrea Flores',
    description: 'Almacén secundario para excedentes',
    active: true,
    createdAt: '2024-01-15',
  },
  {
    id: '6',
    name: 'Almacén Principal Sur',
    code: 'ALM-006',
    branchId: '3',
    branchName: 'Sucursal Sur',
    type: 'Principal',
    capacity: 700,
    currentStock: 450,
    manager: 'Miguel Ángel',
    description: 'Almacén principal sucursal sur',
    active: true,
    createdAt: '2024-02-01',
  },
  {
    id: '7',
    name: 'Almacén Refrigerado Sur',
    code: 'ALM-007',
    branchId: '3',
    branchName: 'Sucursal Sur',
    type: 'Refrigerado',
    capacity: 250,
    currentStock: 180,
    manager: 'Miguel Ángel',
    description: 'Almacén refrigerado',
    active: true,
    createdAt: '2024-02-01',
  },
  {
    id: '8',
    name: 'Almacén Principal Guadalajara',
    code: 'ALM-008',
    branchId: '4',
    branchName: 'Sucursal Guadalajara',
    type: 'Principal',
    capacity: 600,
    currentStock: 400,
    manager: 'Sofia Ruiz',
    description: 'Almacén principal Guadalajara',
    active: true,
    createdAt: '2024-02-10',
  },
  {
    id: '9',
    name: 'Almacén Principal Monterrey',
    code: 'ALM-009',
    branchId: '5',
    branchName: 'Sucursal Monterrey',
    type: 'Principal',
    capacity: 900,
    currentStock: 700,
    manager: 'Fernando Díaz',
    description: 'Almacén principal Monterrey',
    active: true,
    createdAt: '2024-02-15',
  },
  {
    id: '10',
    name: 'Almacén Secundario Monterrey',
    code: 'ALM-010',
    branchId: '5',
    branchName: 'Sucursal Monterrey',
    type: 'Secundario',
    capacity: 500,
    currentStock: 50,
    manager: 'Fernando Díaz',
    description: 'Almacén para productos de baja rotación',
    active: false,
    createdAt: '2024-02-15',
  },
];

export class WarehouseRepository implements IWarehouseRepository {
  private warehouses: Warehouse[];

  constructor(initialWarehouses: Warehouse[] = INITIAL_WAREHOUSES) {
    this.warehouses = [...initialWarehouses];
  }

  async getAll(): Promise<Warehouse[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return [...this.warehouses];
  }

  async getById(id: string): Promise<Warehouse | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const warehouse = this.warehouses.find(w => w.id === id);
    return warehouse ? { ...warehouse } : null;
  }

  async getByBranchId(branchId: string): Promise<Warehouse[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return this.warehouses.filter(w => w.branchId === branchId);
  }

  async create(warehouseData: Omit<Warehouse, 'id'>): Promise<Warehouse> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const newWarehouse: Warehouse = {
      id: Math.random().toString(36).substr(2, 9),
      ...warehouseData,
      createdAt: new Date().toISOString().split('T')[0],
    };
    this.warehouses.push(newWarehouse);
    return { ...newWarehouse };
  }

  async update(id: string, warehouseData: Partial<Warehouse>): Promise<Warehouse> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = this.warehouses.findIndex(w => w.id === id);
    if (index === -1) {
      throw new Error('Almacén no encontrado');
    }
    this.warehouses[index] = { ...this.warehouses[index], ...warehouseData };
    return { ...this.warehouses[index] };
  }

  async delete(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = this.warehouses.findIndex(w => w.id === id);
    if (index === -1) {
      throw new Error('Almacén no encontrado');
    }
    this.warehouses.splice(index, 1);
  }
}

// Singleton instance
export const warehouseRepository = new WarehouseRepository();
