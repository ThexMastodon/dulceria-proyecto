import { useState, useEffect } from 'react';
import { Permission, PermissionModule, IPermissionRepository } from '@/interfaces/IPermissionRepository';

export function usePermissions(repository: IPermissionRepository) {
  const [modules, setModules] = useState<PermissionModule[]>([]);
  const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPermissions();
  }, []);

  const loadPermissions = async () => {
    try {
      setLoading(true);
      const [modulesData, permissionsData] = await Promise.all([
        repository.getAllModules(),
        repository.getAll(),
      ]);
      setModules(modulesData);
      setAllPermissions(permissionsData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading permissions');
    } finally {
      setLoading(false);
    }
  };

  const getPermissionsByModule = async (moduleId: string) => {
    try {
      return await repository.getByModule(moduleId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading module permissions');
      return [];
    }
  };

  return {
    modules,
    allPermissions,
    loading,
    error,
    getPermissionsByModule,
    refresh: loadPermissions,
  };
}
