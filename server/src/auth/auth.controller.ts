import {
  Controller,
  Post,
  Body,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { RefreshTokenResponseDto } from './dto/refresh-token-response.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Register a new user',
    description: 'Register a new user',
  })
  @ApiCreatedResponse({
    description: 'Returns the created user',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Returns bad request error if the email already exists',
    type: BadRequestException,
  })
  @Post('register')
  register(@Body() registerDto: RegisterDto): Promise<Omit<User, 'password'>> {
    return this.authService.register(registerDto);
  }

  @ApiOperation({
    summary: 'Login a user',
    description: 'Login a user',
  })
  @ApiCreatedResponse({
    description: 'Returns the created user',
    type: RefreshTokenDto,
  })
  @ApiNotFoundResponse({
    description: `Returns not found error when the user can't be found`,
    type: NotFoundException,
  })
  @ApiBadRequestResponse({
    description: 'Returns bad request error when the credentials are invalid',
    type: BadRequestException,
  })
  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<RefreshTokenDto> {
    return this.authService.login(loginDto);
  }

  @ApiOperation({
    summary: 'Refresh a user token',
    description: 'Refresh a user token',
  })
  @ApiCreatedResponse({
    description: 'Returns the created tokens',
    type: RefreshTokenResponseDto,
  })
  @ApiNotFoundResponse({
    description: `Returns not found error when the user can't be found`,
    type: NotFoundException,
  })
  @ApiBadRequestResponse({
    description: 'Returns bad request error when the refresh token is invalid',
    type: BadRequestException,
  })
  @Post('refresh-token')
  refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<RefreshTokenResponseDto> {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
