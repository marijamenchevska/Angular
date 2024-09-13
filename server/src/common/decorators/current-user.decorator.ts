import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { CurrentUser } from '../types/current-user.interface';
import { UserRole } from '../types/user-role.enum';

export const GetUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): CurrentUser => {
    if (process.env.NO_AUTH === 'true') {
      return {
        email: 'admin@example.com',
        userId: '2a23b510-e5d1-4688-a9d6-01cb92afc87d',
        role: UserRole.Admin,
      };
    }

    const request = context.switchToHttp().getRequest();

    return request.user;
  },
);
