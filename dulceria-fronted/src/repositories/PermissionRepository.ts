import { Permission, PermissionModule, IPermissionRepository } from '@/interfaces/IPermissionRepository';

const PERMISSIONS_DATA: PermissionModule[] = [
  {
    id: 'principal',
    name: 'Principal',
    icon: 'LayoutDashboard',
    permissions: [
      { id: 'principal-view-dashboard', name: 'Ver Dashboard', description: 'Acceso al dashboard principal', moduleId: 'principal', action: 'view' },
      { id: 'principal-view-reports', name: 'Ver Reportes', description: 'Visualizar reportes generales', moduleId: 'principal', action: 'view' },
    ],
  },
  {
    id: 'configuracion',
    name: 'Configuración',
    icon: 'Settings',
    subModules: [
      {
        id: 'usuarios',
        name: 'Usuarios',
        permissions: [
          { id: 'config-users-view', name: 'Ver usuarios', description: 'Ver listado de usuarios', moduleId: 'configuracion', subModuleId: 'usuarios', action: 'view' },
          { id: 'config-users-create', name: 'Crear usuarios', description: 'Crear nuevos usuarios', moduleId: 'configuracion', subModuleId: 'usuarios', action: 'create' },
          { id: 'config-users-edit', name: 'Editar usuarios', description: 'Modificar usuarios existentes', moduleId: 'configuracion', subModuleId: 'usuarios', action: 'edit' },
          { id: 'config-users-delete', name: 'Eliminar usuarios', description: 'Eliminar usuarios', moduleId: 'configuracion', subModuleId: 'usuarios', action: 'delete' },
        ],
      },
      {
        id: 'roles',
        name: 'Roles',
        permissions: [
          { id: 'config-roles-view', name: 'Ver roles', description: 'Ver listado de roles', moduleId: 'configuracion', subModuleId: 'roles', action: 'view' },
          { id: 'config-roles-create', name: 'Crear roles', description: 'Crear nuevos roles', moduleId: 'configuracion', subModuleId: 'roles', action: 'create' },
          { id: 'config-roles-edit', name: 'Editar roles', description: 'Modificar roles existentes', moduleId: 'configuracion', subModuleId: 'roles', action: 'edit' },
          { id: 'config-roles-delete', name: 'Eliminar roles', description: 'Eliminar roles', moduleId: 'configuracion', subModuleId: 'roles', action: 'delete' },
        ],
      },
      {
        id: 'permisos',
        name: 'Permisos',
        permissions: [
          { id: 'config-perms-view', name: 'Ver permisos', description: 'Ver permisos', moduleId: 'configuracion', subModuleId: 'permisos', action: 'view' },
          { id: 'config-perms-assign', name: 'Asignar permisos', description: 'Asignar permisos a roles', moduleId: 'configuracion', subModuleId: 'permisos', action: 'manage' },
        ],
      },
    ],
    permissions: [],
  },
  {
    id: 'catalogos',
    name: 'Catálogos',
    icon: 'Package',
    subModules: [
      {
        id: 'proveedores',
        name: 'Proveedores',
        permissions: [
          { id: 'catalog-suppliers-view', name: 'Ver proveedores', description: 'Ver proveedores', moduleId: 'catalogos', subModuleId: 'proveedores', action: 'view' },
          { id: 'catalog-suppliers-create', name: 'Crear proveedores', description: 'Crear proveedores', moduleId: 'catalogos', subModuleId: 'proveedores', action: 'create' },
          { id: 'catalog-suppliers-edit', name: 'Editar proveedores', description: 'Editar proveedores', moduleId: 'catalogos', subModuleId: 'proveedores', action: 'edit' },
          { id: 'catalog-suppliers-delete', name: 'Eliminar proveedores', description: 'Eliminar proveedores', moduleId: 'catalogos', subModuleId: 'proveedores', action: 'delete' },
        ],
      },
      {
        id: 'productos',
        name: 'Productos',
        permissions: [
          { id: 'catalog-products-view', name: 'Ver productos', description: 'Ver productos', moduleId: 'catalogos', subModuleId: 'productos', action: 'view' },
          { id: 'catalog-products-create', name: 'Crear productos', description: 'Crear productos', moduleId: 'catalogos', subModuleId: 'productos', action: 'create' },
          { id: 'catalog-products-edit', name: 'Editar productos', description: 'Editar productos', moduleId: 'catalogos', subModuleId: 'productos', action: 'edit' },
          { id: 'catalog-products-delete', name: 'Eliminar productos', description: 'Eliminar productos', moduleId: 'catalogos', subModuleId: 'productos', action: 'delete' },
        ],
      },
      {
        id: 'sucursales',
        name: 'Sucursales',
        permissions: [
          { id: 'catalog-branches-view', name: 'Ver sucursales', description: 'Ver sucursales', moduleId: 'catalogos', subModuleId: 'sucursales', action: 'view' },
          { id: 'catalog-branches-manage', name: 'Gestionar sucursales', description: 'Gestionar sucursales', moduleId: 'catalogos', subModuleId: 'sucursales', action: 'manage' },
        ],
      },
      {
        id: 'almacenes',
        name: 'Almacenes',
        permissions: [
          { id: 'catalog-warehouses-view', name: 'Ver almacenes', description: 'Ver almacenes', moduleId: 'catalogos', subModuleId: 'almacenes', action: 'view' },
          { id: 'catalog-warehouses-manage', name: 'Gestionar almacenes', description: 'Gestionar almacenes', moduleId: 'catalogos', subModuleId: 'almacenes', action: 'manage' },
        ],
      },
    ],
    permissions: [],
  },
  {
    id: 'almacen',
    name: 'Almacén',
    icon: 'Warehouse',
    subModules: [
      {
        id: 'pedidos-almacen',
        name: 'Pedidos',
        permissions: [
          { id: 'warehouse-orders-view', name: 'Ver pedidos', description: 'Ver pedidos', moduleId: 'almacen', subModuleId: 'pedidos-almacen', action: 'view' },
          { id: 'warehouse-orders-create', name: 'Crear pedidos', description: 'Crear pedidos', moduleId: 'almacen', subModuleId: 'pedidos-almacen', action: 'create' },
          { id: 'warehouse-orders-process', name: 'Procesar pedidos', description: 'Procesar pedidos', moduleId: 'almacen', subModuleId: 'pedidos-almacen', action: 'manage' },
          { id: 'warehouse-orders-cancel', name: 'Cancelar pedidos', description: 'Cancelar pedidos', moduleId: 'almacen', subModuleId: 'pedidos-almacen', action: 'delete' },
        ],
      },
      {
        id: 'inventario',
        name: 'Inventario',
        permissions: [
          { id: 'warehouse-inventory-view', name: 'Ver inventario', description: 'Ver inventario', moduleId: 'almacen', subModuleId: 'inventario', action: 'view' },
          { id: 'warehouse-inventory-adjust', name: 'Ajustar inventario', description: 'Ajustar inventario', moduleId: 'almacen', subModuleId: 'inventario', action: 'edit' },
        ],
      },
      {
        id: 'movimientos',
        name: 'Movimientos (E/S)',
        permissions: [
          { id: 'warehouse-movements-view', name: 'Ver movimientos', description: 'Ver movimientos', moduleId: 'almacen', subModuleId: 'movimientos', action: 'view' },
          { id: 'warehouse-movements-entry', name: 'Registrar entrada', description: 'Registrar entradas', moduleId: 'almacen', subModuleId: 'movimientos', action: 'create' },
          { id: 'warehouse-movements-exit', name: 'Registrar salida', description: 'Registrar salidas', moduleId: 'almacen', subModuleId: 'movimientos', action: 'create' },
        ],
      },
    ],
    permissions: [],
  },
  {
    id: 'promotoria',
    name: 'Promotoría',
    icon: 'Megaphone',
    subModules: [
      {
        id: 'promociones',
        name: 'Promociones',
        permissions: [
          { id: 'promo-promos-view', name: 'Ver promociones', description: 'Ver promociones', moduleId: 'promotoria', subModuleId: 'promociones', action: 'view' },
          { id: 'promo-promos-create', name: 'Crear promociones', description: 'Crear promociones', moduleId: 'promotoria', subModuleId: 'promociones', action: 'create' },
          { id: 'promo-promos-edit', name: 'Editar promociones', description: 'Editar promociones', moduleId: 'promotoria', subModuleId: 'promociones', action: 'edit' },
          { id: 'promo-promos-delete', name: 'Eliminar promociones', description: 'Eliminar promociones', moduleId: 'promotoria', subModuleId: 'promociones', action: 'delete' },
          { id: 'promo-promos-toggle', name: 'Activar/Desactivar promociones', description: 'Cambiar estado', moduleId: 'promotoria', subModuleId: 'promociones', action: 'manage' },
        ],
      },
    ],
    permissions: [],
  },
  {
    id: 'movimiento-cajas',
    name: 'Movimiento Cajas',
    icon: 'ArrowUpDown',
    permissions: [
      { id: 'cash-movements-view', name: 'Ver Movimientos', description: 'Ver movimientos de caja', moduleId: 'movimiento-cajas', action: 'view' },
      { id: 'cash-movements-open', name: 'Abrir Caja', description: 'Abrir caja', moduleId: 'movimiento-cajas', action: 'create' },
      { id: 'cash-movements-close', name: 'Cerrar Caja', description: 'Cerrar caja', moduleId: 'movimiento-cajas', action: 'manage' },
      { id: 'cash-movements-cuts', name: 'Ver Cortes', description: 'Ver cortes de caja', moduleId: 'movimiento-cajas', action: 'view' },
    ],
  },
  {
    id: 'caja',
    name: 'Caja',
    icon: 'Monitor',
    permissions: [
      { id: 'pos-sales-create', name: 'Realizar Ventas', description: 'Realizar ventas', moduleId: 'caja', action: 'create' },
      { id: 'pos-sales-cancel', name: 'Cancelar Ventas', description: 'Cancelar ventas', moduleId: 'caja', action: 'delete' },
      { id: 'pos-sales-history', name: 'Ver Historial', description: 'Ver historial de ventas', moduleId: 'caja', action: 'view' },
      { id: 'pos-sales-discount', name: 'Aplicar Descuentos', description: 'Aplicar descuentos', moduleId: 'caja', action: 'manage' },
      { id: 'pos-sales-return', name: 'Devoluciones', description: 'Procesar devoluciones', moduleId: 'caja', action: 'manage' },
      { id: 'pos-sales-reprint', name: 'Reimprimir Tickets', description: 'Reimprimir tickets', moduleId: 'caja', action: 'view' },
    ],
  },
  {
    id: 'rutas',
    name: 'Rutas',
    icon: 'Map',
    subModules: [
      {
        id: 'repartidores',
        name: 'Repartidores',
        permissions: [
          { id: 'routes-drivers-view', name: 'Ver repartidores', description: 'Ver repartidores', moduleId: 'rutas', subModuleId: 'repartidores', action: 'view' },
          { id: 'routes-drivers-manage', name: 'Gestionar repartidores', description: 'Gestionar repartidores', moduleId: 'rutas', subModuleId: 'repartidores', action: 'manage' },
        ],
      },
      {
        id: 'rutas-listado',
        name: 'Rutas',
        permissions: [
          { id: 'routes-routes-view', name: 'Ver rutas', description: 'Ver rutas', moduleId: 'rutas', subModuleId: 'rutas-listado', action: 'view' },
          { id: 'routes-routes-create', name: 'Crear rutas', description: 'Crear rutas', moduleId: 'rutas', subModuleId: 'rutas-listado', action: 'create' },
          { id: 'routes-routes-assign', name: 'Asignar rutas', description: 'Asignar rutas', moduleId: 'rutas', subModuleId: 'rutas-listado', action: 'edit' },
          { id: 'routes-routes-complete', name: 'Completar rutas', description: 'Completar rutas', moduleId: 'rutas', subModuleId: 'rutas-listado', action: 'manage' },
        ],
      },
    ],
    permissions: [],
  },
];

export class PermissionRepository implements IPermissionRepository {
  private modules: PermissionModule[];

  constructor(modules: PermissionModule[] = PERMISSIONS_DATA) {
    this.modules = modules;
  }

  async getAll(): Promise<Permission[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const allPermissions: Permission[] = [];
    
    this.modules.forEach(module => {
      allPermissions.push(...module.permissions);
      if (module.subModules) {
        module.subModules.forEach(subModule => {
          allPermissions.push(...subModule.permissions);
        });
      }
    });
    
    return allPermissions;
  }

  async getByModule(moduleId: string): Promise<Permission[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const module = this.modules.find(m => m.id === moduleId);
    if (!module) return [];
    
    const permissions = [...module.permissions];
    if (module.subModules) {
      module.subModules.forEach(subModule => {
        permissions.push(...subModule.permissions);
      });
    }
    
    return permissions;
  }

  async getAllModules(): Promise<PermissionModule[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return [...this.modules];
  }
}

// Singleton instance
export const permissionRepository = new PermissionRepository();
