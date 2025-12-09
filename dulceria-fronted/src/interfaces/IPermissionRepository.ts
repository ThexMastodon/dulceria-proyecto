export interface Permission {
  id: string;
  name: string;
  description: string;
  moduleId: string;
  subModuleId?: string;
  action: string; // 'view', 'create', 'edit', 'delete', 'manage', etc.
}

export interface PermissionModule {
  id: string;
  name: string;
  icon: string;
  subModules?: PermissionSubModule[];
  permissions: Permission[];
}

export interface PermissionSubModule {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface IPermissionRepository {
  getAll(): Promise<Permission[]>;
  getByModule(moduleId: string): Promise<Permission[]>;
  getAllModules(): Promise<PermissionModule[]>;
}
