import { useState, useEffect } from 'react';
import { Role, IRoleRepository } from '@/interfaces/IRoleRepository';

export function useRoles(repository: IRoleRepository) {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    try {
      setLoading(true);
      const data = await repository.getAll();
      setRoles(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading roles');
    } finally {
      setLoading(false);
    }
  };

  const createRole = async (roleData: Omit<Role, 'id' | 'usersCount'>) => {
    try {
      const newRole = await repository.create(roleData);
      setRoles(prev => [...prev, newRole]);
      return newRole;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating role');
      throw err;
    }
  };

  const updateRole = async (id: string, roleData: Partial<Role>) => {
    try {
      const updatedRole = await repository.update(id, roleData);
      setRoles(prev => prev.map(r => r.id === id ? updatedRole : r));
      return updatedRole;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating role');
      throw err;
    }
  };

  const deleteRole = async (id: string) => {
    try {
      await repository.delete(id);
      setRoles(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting role');
      throw err;
    }
  };

  return {
    roles,
    loading,
    error,
    createRole,
    updateRole,
    deleteRole,
    refresh: loadRoles,
  };
}
