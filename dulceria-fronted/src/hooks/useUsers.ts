import { useState, useEffect, useMemo } from 'react';
import { User } from '@/types';
import { IUserRepository } from '@/interfaces/IUserRepository';

export function useUsers(repository: IUserRepository) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await repository.getAll();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading users');
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: Omit<User, 'id'>) => {
    try {
      const newUser = await repository.create(userData);
      setUsers(prev => [...prev, newUser]);
      return newUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error creating user');
      throw err;
    }
  };

  const updateUser = async (id: string, userData: Partial<User>) => {
    try {
      const updatedUser = await repository.update(id, userData);
      setUsers(prev => prev.map(u => u.id === id ? updatedUser : u));
      return updatedUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating user');
      throw err;
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await repository.delete(id);
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error deleting user');
      throw err;
    }
  };

  return {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
    refresh: loadUsers,
  };
}
