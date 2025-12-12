import { useState, useEffect } from 'react';
import { RouteOrder } from '@/types/routeOrder';
import { IRouteOrderRepository } from '@/interfaces/IRouteOrderRepository';

interface UseRouteOrdersOptions {
  routeId?: string;
  deliveryPersonId?: string;
}

export function useRouteOrders(repository: IRouteOrderRepository, options?: UseRouteOrdersOptions) {
  const [orders, setOrders] = useState<RouteOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, [options?.routeId, options?.deliveryPersonId]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      let data: RouteOrder[];
      
      if (options?.routeId) {
        data = await repository.getByRouteId(options.routeId);
      } else if (options?.deliveryPersonId) {
        data = await repository.getByDeliveryPerson(options.deliveryPersonId);
      } else {
        data = await repository.getAll();
      }
      
      setOrders(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading orders');
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData: Omit<RouteOrder, 'id'>) => {
    try {
      const newOrder = await repository.create(orderData);
      setOrders(prev => [...prev, newOrder]);
      return newOrder;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating order');
      throw err;
    }
  };

  const updateOrder = async (id: string, orderData: Partial<RouteOrder>) => {
    try {
      const updatedOrder = await repository.update(id, orderData);
      setOrders(prev => prev.map(o => o.id === id ? updatedOrder : o));
      return updatedOrder;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating order');
      throw err;
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      await repository.delete(id);
      setOrders(prev => prev.filter(o => o.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting order');
      throw err;
    }
  };

  return {
    orders,
    loading,
    error,
    createOrder,
    updateOrder,
    deleteOrder,
    refresh: loadOrders,
  };
}
