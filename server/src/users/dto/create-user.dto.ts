import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsStrongPassword } from 'class-validator';
import { UserRole } from '../../common/types/user-role.enum';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    description: 'Email of the user, must be unique, will be used as username',
    example: 'john.doe@example.com',
  })
  email: string;

  @IsStrongPassword()
  @ApiProperty({
    description:
      'Password of the user, must include at least one uppercase letter, one lowercase letter, one number, and one special character',
    example: 'Pas$w0rd',
  })
  password: string;

  @IsEnum(UserRole)
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Role of the user',
    enum: UserRole,
    example: UserRole.User,
  })
  role: UserRole = UserRole.User;
}
