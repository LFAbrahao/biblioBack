// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { ReservationsModule } from './reservations/reservations.module'; // Importar ReservationsModule
import { User } from './users/user.entity';
import { Book } from './books/book.entity';
import { Reservation } from './reservations/reservation.entity'; // Importar Reservation

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', // ajuste para o seu usuário
      password: '', // ajuste para sua senha
      database: 'biblioteca', // já criado no seu MySQL
      entities: [User, Book, Reservation], // ADICIONE Reservation AQUI!
      synchronize: true,
    }),
    UsersModule,
    BooksModule,
    ReservationsModule, // ADICIONE ReservationsModule AQUI!
  ],
})
export class AppModule {}