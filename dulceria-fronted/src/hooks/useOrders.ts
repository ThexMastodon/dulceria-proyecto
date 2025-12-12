import { useState, useEffect } from 'react';
import { Order } from '@/types/order';
import { IOrderRepository } from '@/interfaces/IOrderRepository';

export function useOrders(repository: IOrderRepository, warehouseId?: string) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, [warehouseId]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = warehouseId 
        ? await repository.getByWarehouseId(warehouseId)
        : await repository.getAll();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading orders');
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData: Omit<Order, 'id'>) => {
    try {
      const newOrder = await repository.create(orderData);
      setOrders(prev => [...prev, newOrder]);
      return newOrder;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating order');
      throw err;
    }
  };

  const updateOrder = async (id: string, orderData: Partial<Order>) => {
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
