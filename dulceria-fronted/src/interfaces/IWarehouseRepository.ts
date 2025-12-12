import { Warehouse } from '@/types/warehouse';

export interface IWarehouseRepository {
  getAll(): Promise<Warehouse[]>;
  getById(id: string): Promise<Warehouse | null>;
  getByBranchId(branchId: string): Promise<Warehouse[]>;
  create(warehouse: Omit<Warehouse, 'id'>): Promise<Warehouse>;
  update(id: string, warehouse: Partial<Warehouse>): Promise<Warehouse>;
  delete(id: string): Promise<void>;
}
