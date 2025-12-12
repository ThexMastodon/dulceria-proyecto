import { Supplier } from '@/types/supplier';

export interface ISupplierRepository {
  getAll(): Promise<Supplier[]>;
  getById(id: string): Promise<Supplier | null>;
  create(supplier: Omit<Supplier, 'id'>): Promise<Supplier>;
  update(id: string, supplier: Partial<Supplier>): Promise<Supplier>;
  delete(id: string): Promise<void>;
}
