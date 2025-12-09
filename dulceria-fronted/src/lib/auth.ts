// This file is deprecated. Use AuthService instead.
// Kept for backwards compatibility

import { User } from '@/types';
import { authService } from '@/services/AuthService';

/**
 * @deprecated Use authService.authenticate() instead
 */
export const authenticateUser = async (email: string, password: string): Promise<User> => {
  return authService.authenticate(email, password);
};