import { User } from '@/types';
import { IUserRepository } from '@/interfaces/IUserRepository';

interface UserData {
  id: string;
  name: string;
  lastName: string;
  secondLastName: string;
  email: string;
  role: string;
  image?: string;
  active: boolean;
}

const INITIAL_USERS: UserData[] = [
  { id: '1', name: 'Juan', lastName: 'Perez', secondLastName: 'Gomez', email: 'juan.perez@gmail.com', role: 'admin', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', active: true },
  { id: '2', name: 'Ana', lastName: 'García', secondLastName: 'López', email: 'ana.garcia@dulceria.com', role: 'Administrador', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', active: true },
  { id: '3', name: 'Carlos', lastName: 'Ruiz', secondLastName: 'Pérez', email: 'carlos.ruiz@dulceria.com', role: 'Vendedor', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', active: true },
  { id: '4', name: 'Luisa', lastName: 'Méndez', secondLastName: 'Sánchez', email: 'luisa.mendez@dulceria.com', role: 'Almacenista', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', active: false },
  { id: '5', name: 'Jorge', lastName: 'Ramírez', secondLastName: 'Díaz', email: 'jorge.ramirez@dulceria.com', role: 'Vendedor', active: true },
  { id: '6', name: 'María', lastName: 'Torres', secondLastName: 'Vargas', email: 'maria.torres@dulceria.com', role: 'Repartidor', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400', active: true },
  { id: '7', name: 'Pedro', lastName: 'Infante', secondLastName: 'Cruz', email: 'pedro.infante@dulceria.com', role: 'Vendedor', active: false },
  { id: '8', name: 'Sofia', lastName: 'Vergara', secondLastName: 'Rojas', email: 'sofia.vergara@dulceria.com', role: 'Gerente', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400', active: true },
];

export class UserRepository implements IUserRepository {
  private users: UserData[];

  constructor(initialUsers: UserData[] = INITIAL_USERS) {
    this.users = [...initialUsers];
  }

  async getAll(): Promise<User[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return [...this.users];
  }

  async getById(id: string): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const user = this.users.find(u => u.id === id);
    return user ? { ...user } : null;
  }

  async create(userData: Omit<User, 'id'>): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const newUser: UserData = {
      id: Math.random().toString(36).substr(2, 9),
      name: userData.name,
      lastName: userData.lastName || '',
      secondLastName: userData.secondLastName || '',
      email: userData.email,
      role: userData.role,
      active: userData.active ?? true,
    };
    this.users.push(newUser);
    return { ...newUser };
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    this.users[index] = { ...this.users[index], ...userData } as UserData;
    return { ...this.users[index] };
  }

  async delete(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 100));
    this.users = this.users.filter(u => u.id !== id);
  }
}

// Singleton instance
export const userRepository = new UserRepository();
