import { useEffect, useState } from 'react';
import { RouteCustomer } from '@/types/routeOrder';
import { ICustomerRepository } from '@/interfaces/ICustomerRepository';

export function useCustomers(repository: ICustomerRepository) {
  const [customers, setCustomers] = useState<RouteCustomer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      const data = await repository.getAll();
      setCustomers(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading customers');
    } finally {
      setLoading(false);
    }
  };

  const search = async (q: string) => {
    try {
      const results = await repository.search(q);
      setCustomers(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error searching customers');
    }
  };

  const createCustomer = async (data: Omit<RouteCustomer, 'id'>) => {
    const created = await repository.create(data);
    setCustomers(prev => [created, ...prev]);
    return created;
  };

  const updateCustomer = async (id: string, updates: Partial<RouteCustomer>) => {
    const updated = await repository.update(id, updates);
    setCustomers(prev => prev.map(c => c.id === id ? updated : c));
    return updated;
  };

  const deleteCustomer = async (id: string) => {
    await repository.delete(id);
    setCustomers(prev => prev.filter(c => c.id !== id));
  };

  return { customers, loading, error, refresh: load, search, createCustomer, updateCustomer, deleteCustomer };
}
