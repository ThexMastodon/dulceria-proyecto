import { User } from '@/types';

export interface IAuthService {
  authenticate(email: string, password: string): Promise<User>;
  getRedirectPath(role: string): string;
  getLogoutRedirectPath(role: string): string;
}
