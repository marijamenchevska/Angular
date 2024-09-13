import { UserRole } from './user-role.enum';

export interface CurrentUser {
  email: string;
  userId: string;
  role: UserRole;
}
