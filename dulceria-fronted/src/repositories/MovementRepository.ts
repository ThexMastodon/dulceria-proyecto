import { Movement } from '@/types/movement';

class MovementRepository {
  private movements: Movement[] = [
    {
      id: 'm1',
      date: new Date().toISOString(),
      type: 'Entrada',
      productId: 'p1',
      productName: 'Chocolate Barra',
      warehouseId: 'w1',
      warehouseName: 'Almacén Central',
      quantity: 50,
      unit: 'pza',
      reference: 'OC-001',
      notes: 'Recepción de compra',
      createdBy: 'admin'
    },
    {
      id: 'm2',
      date: new Date().toISOString(),
      type: 'Salida',
      productId: 'p2',
      productName: 'Gomitas',
      warehouseId: 'w1',
      warehouseName: 'Almacén Central',
      quantity: 20,
      unit: 'pza',
      reference: 'PED-1024',
      notes: 'Despacho a ruta',
      createdBy: 'admin'
    }
  ];

  async getAll(): Promise<Movement[]> {
    return this.movements;
  }

  async create(data: Omit<Movement, 'id'>): Promise<Movement> {
    const m: Movement = { id: crypto.randomUUID(), ...data };
    this.movements.unshift(m);
    return m;
  }

  async update(id: string, data: Partial<Movement>): Promise<Movement | null> {
    const idx = this.movements.findIndex(m => m.id === id);
    if (idx === -1) return null;
    this.movements[idx] = { ...this.movements[idx], ...data };
    return this.movements[idx];
  }

  async remove(id: string): Promise<boolean> {
    const before = this.movements.length;
    this.movements = this.movements.filter(m => m.id !== id);
    return this.movements.length < before;
  }
}

export const movementRepository = new MovementRepository();
