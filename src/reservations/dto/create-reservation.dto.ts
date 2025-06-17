// src/reservations/dto/create-reservation.dto.ts
import { IsNotEmpty, IsInt, IsDateString } from 'class-validator';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsInt()
  userId: number; // ID do usuário que faz a reserva

  @IsNotEmpty()
  @IsInt()
  bookId: number; // ID do livro reservado

  @IsNotEmpty()
  @IsDateString()
  reservationDate: string; // Data da reserva (string no formato ISO 8601, ex: "2025-06-17T10:00:00Z")
}