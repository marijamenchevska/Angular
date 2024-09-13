import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../types/user-role.enum';
import { RolesValidationType } from '../types/roles-validation-type.enum';

export const Roles = (
  roles: UserRole[],
  type: RolesValidationType = RolesValidationType.HasSomeOfThese,
) => SetMetadata('rolesConfig', { roles, type });
