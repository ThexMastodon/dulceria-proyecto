export interface Role {
  id: string;
  name: string;
  description: string;
  usersCount: number;
  active: boolean;
  permissions: string[]; // Array of permission IDs
}

export interface IRoleRepository {
  getAll(): Promise<Role[]>;
  getById(id: string): Promise<Role | null>;
  create(role: Omit<Role, 'id' | 'usersCount'>): Promise<Role>;
  update(id: string, role: Partial<Role>): Promise<Role>;
  delete(id: string): Promise<void>;
}
