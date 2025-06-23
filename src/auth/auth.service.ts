// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService, // Injeta o JwtService
  ) {}

  async login(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    // ATENÇÃO: Esta é uma comparação de senha em texto plano.
    // Em uma aplicação real, você DEVE usar hashing (ex: com a biblioteca bcrypt).
    // Exemplo com bcrypt seria: const isMatch = await bcrypt.compare(pass, user.password);
    if (user?.password !== pass) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // Gera o payload do JWT incluindo informações essenciais
    const payload = { 
      username: user.email, 
      sub: user.id,
      role: user.role // IMPORTANTE: inclui o role no payload
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    
    // Retorna o token JWT e os dados do usuário
    return {
      access_token: this.jwtService.sign(payload),
      user: userWithoutPassword,
    };
  }
}