import { IsEnum, IsNotEmpty } from 'class-validator';
import { UserRole } from '../../common/types/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserRoleDto {
  @IsEnum(UserRole)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Role of the user',
    enum: UserRole,
    example: UserRole.User,
  })
  role: UserRole;
}
