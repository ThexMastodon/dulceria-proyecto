import { User, Role } from '@/types';
import { IAuthService } from '@/interfaces/IAuthService';

const MOCK_DB = [
  { id: '1', email: 'admin@dulceria.com', password: 'admin123', name: 'Administrador', role: 'admin' as Role },
  { id: '2', email: 'almacen@dulceria.com', password: 'almacen123', name: 'Almacen', role: 'almacen' as Role },
  { id: '3', email: 'cashier@dulceria.com', password: 'cashier123', name: 'Cajero', role: 'cashier' as Role },
  { id: '4', email: 'delivery@dulceria.com', password: 'delivery123', name: 'Repartidor', role: 'delivery' as Role },
  { id: '5', email: 'promoter@dulceria.com', password: 'promoter123', name: 'Promotor', role: 'promoter' as Role },
  { id: '6', email: 'rh@dulceria.com', password: 'rh123', name: 'Recursos Humanos', role: 'RH' as Role },
  { id: '7', email: 'manager@dulceria.com', password: 'manager123', name: 'Gerente', role: 'manager' as Role },
  { id: '8', email: 'cliente@dulceria.com', password: 'cliente123', name: 'Cliente', role: 'client' as Role }
];

const ADMIN_ROLES = ['admin', 'manager', 'almacen', 'cashier', 'delivery', 'promoter', 'RH'];

export class AuthService implements IAuthService {
  private adminRoles: string[];

  constructor(adminRoles: string[] = ADMIN_ROLES) {
    this.adminRoles = adminRoles;
  }

  async authenticate(email: string, password: string): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 1500));

    const userFound = MOCK_DB.find(u => u.email === email && u.password === password);

    if (!userFound) {
      throw new Error('Credenciales inválidas');
    }

    const { password: _, ...userWithoutPassword } = userFound;
    return userWithoutPassword;
  }

  getRedirectPath(role: string): string {
    return this.isAdminRole(role) ? '/dashboard' : '/';
  }

  getLogoutRedirectPath(role: string): string {
    return this.isAdminRole(role) ? '/login' : '/';
  }

  private isAdminRole(role: string): boolean {
    return this.adminRoles.includes(role);
  }
}

// Singleton instance
export const authService = new AuthService();
