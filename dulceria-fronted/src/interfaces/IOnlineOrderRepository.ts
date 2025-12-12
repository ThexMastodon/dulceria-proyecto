import { OnlineOrder } from '@/types/onlineOrder';

export interface IOnlineOrderRepository {
  getAll(): Promise<OnlineOrder[]>;
  getByStatus(status: string): Promise<OnlineOrder[]>;
  getById(id: string): Promise<OnlineOrder | null>;
  create(order: Omit<OnlineOrder, 'id'>): Promise<OnlineOrder>;
  update(id: string, order: Partial<OnlineOrder>): Promise<OnlineOrder>;
  delete(id: string): Promise<void>;
}
