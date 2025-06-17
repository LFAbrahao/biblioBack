// src/reservations/reservations.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { Book } from '../books/book.entity'; // Importar Book para o serviço poder interagir com ele
import { User } from '../users/user.entity'; // Importar User para o serviço poder interagir com ele
import { BooksService } from '../books/books.service'; // Importar o serviço de livros
import { UsersService } from '../users/users.service'; // Importar o serviço de usuários

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, Book, User]), // Registra as entidades para este módulo
  ],
  providers: [ReservationsService, BooksService, UsersService], // Registra os serviços
  controllers: [ReservationsController], // Registra os controladores
  exports: [ReservationsService], // Opcional: se outros módulos precisarem usar ReservationsService
})
export class ReservationsModule {}