// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module'; // <-- IMPORTE O USERS MODULE

@Module({
  imports: [UsersModule], // <-- ADICIONE O USERS MODULE AQUI
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}