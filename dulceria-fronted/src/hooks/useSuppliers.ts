import { useState, useEffect } from 'react';
import { Supplier } from '@/types/supplier';
import { ISupplierRepository } from '@/interfaces/ISupplierRepository';

export function useSuppliers(repository: ISupplierRepository) {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      setLoading(true);
      const data = await repository.getAll();
      setSuppliers(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading suppliers');
    } finally {
      setLoading(false);
    }
  };

  const createSupplier = async (supplierData: Omit<Supplier, 'id'>) => {
    try {
      const newSupplier = await repository.create(supplierData);
      setSuppliers(prev => [...prev, newSupplier]);
      return newSupplier;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating supplier');
      throw err;
    }
  };

  const updateSupplier = async (id: string, supplierData: Partial<Supplier>) => {
    try {
      const updatedSupplier = await repository.update(id, supplierData);
      setSuppliers(prev => prev.map(s => s.id === id ? updatedSupplier : s));
      return updatedSupplier;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating supplier');
      throw err;
    }
  };

  const deleteSupplier = async (id: string) => {
    try {
      await repository.delete(id);
      setSuppliers(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting supplier');
      throw err;
    }
  };

  return {
    suppliers,
    loading,
    error,
    createSupplier,
    updateSupplier,
    deleteSupplier,
    refresh: loadSuppliers,
  };
}
