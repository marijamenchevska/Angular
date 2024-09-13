import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class RegisterDto {
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
}
