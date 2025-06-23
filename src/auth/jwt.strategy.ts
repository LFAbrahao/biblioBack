import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey', // Use env var em produção!
    });
  }

  async validate(payload: any) {
    // Retorna o usuário completo incluindo o role necessário para o RolesGuard
    return { 
      userId: payload.sub, 
      username: payload.username,
      role: payload.role // ADICIONADO: role necessário para autorização
    };
  }
}