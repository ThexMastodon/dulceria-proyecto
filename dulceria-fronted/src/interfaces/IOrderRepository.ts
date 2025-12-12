import { Order } from '@/types/order';

export interface IOrderRepository {
  getAll(): Promise<Order[]>;
  getByWarehouseId(warehouseId: string): Promise<Order[]>;
  getById(id: string): Promise<Order | null>;
  create(order: Omit<Order, 'id'>): Promise<Order>;
  update(id: string, order: Partial<Order>): Promise<Order>;
  delete(id: string): Promise<void>;
}
