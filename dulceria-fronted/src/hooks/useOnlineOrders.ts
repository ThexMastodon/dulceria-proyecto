import { useState, useEffect } from 'react';
import { OnlineOrder } from '@/types/onlineOrder';
import { IOnlineOrderRepository } from '@/interfaces/IOnlineOrderRepository';

export function useOnlineOrders(repository: IOnlineOrderRepository, status?: string) {
  const [orders, setOrders] = useState<OnlineOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, [status]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = status 
        ? await repository.getByStatus(status)
        : await repository.getAll();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading orders');
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData: Omit<OnlineOrder, 'id'>) => {
    try {
      const newOrder = await repository.create(orderData);
      setOrders(prev => [...prev, newOrder]);
      return newOrder;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating order');
      throw err;
    }
  };

  const updateOrder = async (id: string, orderData: Partial<OnlineOrder>) => {
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
