import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../common/types/user-role.enum';
import { RegisterDto } from './dto/register.dto';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokenResponseDto } from './dto/refresh-token-response.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<Omit<User, 'password'>> {
    const { email, password } = registerDto;
    // check for existing user
    const user = await this.userRepository.findOneBy({ email });

    if (user) {
      throw new BadRequestException(`User with email ${email} already exists`);
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.BCRYPT_SALT),
    );

    const { password: _, ...passwordlessUser } = await this.userRepository.save(
      {
        email,
        password: hashedPassword,
        role: UserRole.User,
      },
    );

    return passwordlessUser;
  }

  async login(loginDto: LoginDto): Promise<RefreshTokenResponseDto> {
    const user = await this.userRepository.findOneBy({
      email: loginDto.email,
    });

    if (!user) {
      throw new NotFoundException(
        `User with email ${loginDto.email} not found`,
      );
    }

    const isPasswordCorrect = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new BadRequestException('Invalid credentials');
    }

    const { token, refreshToken } = await this.#generateTokens(user);

    await this.#addRefreshToken(user, refreshToken);

    return {
      token,
      refreshToken,
    };
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const { userId } = this.jwtService.decode(refreshTokenDto.refreshToken);

    const user = await this.userRepository.findOneBy({
      id: userId,
    });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    await this.#validateUsersRefreshToken(refreshTokenDto.refreshToken, user);

    await this.#removeRefreshToken(user, refreshTokenDto.refreshToken);

    const { token, refreshToken } = await this.#generateTokens(user);

    await this.#addRefreshToken(user, refreshToken);

    return {
      token,
      refreshToken,
    };
  }

  async #generateTokens(user: User): Promise<RefreshTokenResponseDto> {
    const token = await this.jwtService.signAsync(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      {
        expiresIn: '1h',
        secret: process.env.ACCESS_TOKEN_SECRET,
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      {
        expiresIn: '7d',
        secret: process.env.REFRESH_TOKEN_SECRET,
      },
    );

    return {
      token,
      refreshToken,
    };
  }

  async #validateUsersRefreshToken(token: string, user: User): Promise<void> {
    const isTokenValid = user.refreshTokens.some(
      (refreshToken) => refreshToken === token,
    );

    if (!isTokenValid) {
      throw new BadRequestException('Invalid refresh token');
    }
  }

  async #addRefreshToken(user: User, refreshToken: string): Promise<void> {
    await this.userRepository.update(user.id, {
      refreshTokens: [...user.refreshTokens, refreshToken],
    });
  }

  async #removeRefreshToken(user: User, refreshToken: string): Promise<void> {
    user.refreshTokens = user.refreshTokens.filter(
      (token) => token !== refreshToken,
    );
    await this.userRepository.save(user);
  }

  async backfillRegister(users: User[]) {
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(
        user.password,
        Number(process.env.BCRYPT_SALT),
      );

      user.password = hashedPassword;

      this.userRepository.save(user);
    }
  }
}
