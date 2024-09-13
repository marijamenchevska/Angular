import { Exclude, Expose } from 'class-transformer';
import { UserRole } from '../../common/types/user-role.enum';
import { User } from '../entities/user.entity';

export class BasicUser extends User {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  role: UserRole;

  @Exclude()
  password: string;

  @Exclude()
  refreshTokens: string[];

  @Exclude()
  createdAt: Date;

  @Exclude()
  createdBy: string;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  updatedBy: string;
}
