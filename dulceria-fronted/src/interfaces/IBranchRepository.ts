import { Branch } from '@/types/branch';

export interface IBranchRepository {
  getAll(): Promise<Branch[]>;
  getById(id: string): Promise<Branch | null>;
  create(branch: Omit<Branch, 'id'>): Promise<Branch>;
  update(id: string, branch: Partial<Branch>): Promise<Branch>;
  delete(id: string): Promise<void>;
}
