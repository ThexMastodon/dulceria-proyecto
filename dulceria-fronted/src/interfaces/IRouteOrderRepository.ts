import { RouteOrder } from '@/types/routeOrder';

export interface IRouteOrderRepository {
  getAll(): Promise<RouteOrder[]>;
  getByRouteId(routeId: string): Promise<RouteOrder[]>;
  getByDeliveryPerson(deliveryPersonId: string): Promise<RouteOrder[]>;
  getById(id: string): Promise<RouteOrder | null>;
  create(order: Omit<RouteOrder, 'id'>): Promise<RouteOrder>;
  update(id: string, order: Partial<RouteOrder>): Promise<RouteOrder>;
  delete(id: string): Promise<void>;
}
