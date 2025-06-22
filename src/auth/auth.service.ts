// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service'; // Importe o UsersService
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, // Injete o UsersService
  ) {}

  async login(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email); // Precisaremos criar este método

    // ATENÇÃO: Esta é uma comparação de senha em texto plano.
    // Em uma aplicação real, você DEVE usar hashing (ex: com a biblioteca bcrypt).
    // Exemplo com bcrypt seria: const isMatch = await bcrypt.compare(pass, user.password);
    if (user?.password !== pass) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user; // Remove a senha do objeto de retorno
    
    // Em uma aplicação real, aqui você geraria e retornaria um JWT (JSON Web Token)
    return result;
  }
}