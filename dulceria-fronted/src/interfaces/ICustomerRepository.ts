import { RouteCustomer } from '@/types/routeOrder';

export interface ICustomerRepository {
  getAll(): Promise<RouteCustomer[]>;
  getById(id: string): Promise<RouteCustomer | null>;
  search(query: string): Promise<RouteCustomer[]>;
  create(customer: Omit<RouteCustomer, 'id'>): Promise<RouteCustomer>;
  update(id: string, updates: Partial<RouteCustomer>): Promise<RouteCustomer>;
  delete(id: string): Promise<void>;
}
