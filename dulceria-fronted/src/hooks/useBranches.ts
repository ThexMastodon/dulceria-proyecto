import { useState, useEffect } from 'react';
import { Branch } from '@/types/branch';
import { IBranchRepository } from '@/interfaces/IBranchRepository';

export function useBranches(repository: IBranchRepository) {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBranches();
  }, []);

  const loadBranches = async () => {
    try {
      setLoading(true);
      const data = await repository.getAll();
      setBranches(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading branches');
    } finally {
      setLoading(false);
    }
  };

  const createBranch = async (branchData: Omit<Branch, 'id'>) => {
    try {
      const newBranch = await repository.create(branchData);
      setBranches(prev => [...prev, newBranch]);
      return newBranch;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating branch');
      throw err;
    }
  };

  const updateBranch = async (id: string, branchData: Partial<Branch>) => {
    try {
      const updatedBranch = await repository.update(id, branchData);
      setBranches(prev => prev.map(b => b.id === id ? updatedBranch : b));
      return updatedBranch;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating branch');
      throw err;
    }
  };

  const deleteBranch = async (id: string) => {
    try {
      await repository.delete(id);
      setBranches(prev => prev.filter(b => b.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting branch');
      throw err;
    }
  };

  return {
    branches,
    loading,
    error,
    createBranch,
    updateBranch,
    deleteBranch,
    refresh: loadBranches,
  };
}
