import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRole } from '../common/types/user-role.enum';

type JwtStrategyPayload = {
  username: string;
  role: UserRole;
  sub: string;
  iat: number;
  exp: number;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    console.log('validate auth constructor', { auth: process.env.NO_AUTH });
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate({ username, sub, role }: JwtStrategyPayload) {
    return {
      username,
      userId: sub,
      role,
    };
  }
}
