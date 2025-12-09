import { Role, IRoleRepository } from '@/interfaces/IRoleRepository';

const INITIAL_ROLES: Role[] = [
  { 
    id: '1', 
    name: 'Administrador', 
    description: 'Acceso total a todos los módulos del sistema', 
    usersCount: 2, 
    active: true,
    permissions: ['principal-view-dashboard', 'principal-view-reports', 'config-users-view', 'config-users-create', 'config-users-edit', 'config-users-delete', 'config-roles-view', 'config-roles-create']
  },
  { 
    id: '2', 
    name: 'Gerente', 
    description: 'Gestión de reportes, usuarios y configuraciones básicas', 
    usersCount: 1, 
    active: true,
    permissions: ['principal-view-dashboard', 'principal-view-reports', 'config-users-view', 'warehouse-inventory-view']
  },
  { 
    id: '3', 
    name: 'Vendedor', 
    description: 'Acceso a punto de venta y catálogo de productos', 
    usersCount: 12, 
    active: true,
    permissions: ['pos-sales-create', 'pos-sales-history', 'pos-sales-reprint', 'catalog-products-view']
  },
  { 
    id: '4', 
    name: 'Almacenista', 
    description: 'Gestión de inventarios, entradas y salidas', 
    usersCount: 4, 
    active: true,
    permissions: ['warehouse-inventory-view', 'warehouse-inventory-adjust', 'warehouse-movements-view', 'warehouse-movements-entry', 'warehouse-movements-exit']
  },
  { 
    id: '5', 
    name: 'Repartidor', 
    description: 'Acceso a rutas y entregas asignadas', 
    usersCount: 6, 
    active: true,
    permissions: ['routes-routes-view', 'routes-routes-complete']
  },
  { 
    id: '6', 
    name: 'Cajero', 
    description: 'Acceso limitado a movimientos de caja', 
    usersCount: 3, 
    active: false,
    permissions: ['cash-movements-view', 'cash-movements-open', 'cash-movements-close', 'pos-sales-create']
  },
];

export class RoleRepository implements IRoleRepository {
  private roles: Role[];

  constructor(initialRoles: Role[] = INITIAL_ROLES) {
    this.roles = [...initialRoles];
  }

  async getAll(): Promise<Role[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return [...this.roles];
  }

  async getById(id: string): Promise<Role | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const role = this.roles.find(r => r.id === id);
    return role ? { ...role } : null;
  }

  async create(roleData: Omit<Role, 'id' | 'usersCount'>): Promise<Role> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const newRole: Role = {
      id: Math.random().toString(36).substr(2, 9),
      name: roleData.name,
      description: roleData.description,
      usersCount: 0,
      active: roleData.active,
      permissions: roleData.permissions || [],
    };
    this.roles.push(newRole);
    return { ...newRole };
  }

  async update(id: string, roleData: Partial<Role>): Promise<Role> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = this.roles.findIndex(r => r.id === id);
    if (index === -1) {
      throw new Error('Role not found');
    }
    // Preserve usersCount
    const usersCount = this.roles[index].usersCount;
    this.roles[index] = { ...this.roles[index], ...roleData, usersCount };
    return { ...this.roles[index] };
  }

  async delete(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 100));
    this.roles = this.roles.filter(r => r.id !== id);
  }
}

// Singleton instance
export const roleRepository = new RoleRepository();
