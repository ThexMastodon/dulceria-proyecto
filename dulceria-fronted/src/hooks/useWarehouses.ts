import { useState, useEffect } from 'react';
import { Warehouse } from '@/types/warehouse';
import { IWarehouseRepository } from '@/interfaces/IWarehouseRepository';

export function useWarehouses(repository: IWarehouseRepository) {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadWarehouses();
  }, []);

  const loadWarehouses = async () => {
    try {
      setLoading(true);
      const data = await repository.getAll();
      setWarehouses(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading warehouses');
    } finally {
      setLoading(false);
    }
  };

  const createWarehouse = async (warehouseData: Omit<Warehouse, 'id'>) => {
    try {
      const newWarehouse = await repository.create(warehouseData);
      setWarehouses(prev => [...prev, newWarehouse]);
      return newWarehouse;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating warehouse');
      throw err;
    }
  };

  const updateWarehouse = async (id: string, warehouseData: Partial<Warehouse>) => {
    try {
      const updatedWarehouse = await repository.update(id, warehouseData);
      setWarehouses(prev => prev.map(w => w.id === id ? updatedWarehouse : w));
      return updatedWarehouse;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating warehouse');
      throw err;
    }
  };

  const deleteWarehouse = async (id: string) => {
    try {
      await repository.delete(id);
      setWarehouses(prev => prev.filter(w => w.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting warehouse');
      throw err;
    }
  };

  const getWarehousesByBranchId = async (branchId: string) => {
    try {
      return await repository.getByBranchId(branchId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading branch warehouses');
      return [];
    }
  };

  return {
    warehouses,
    loading,
    error,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse,
    getWarehousesByBranchId,
    refresh: loadWarehouses,
  };
}
