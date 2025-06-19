// src/reservations/dto/create-reservation.dto.ts
import { IsNotEmpty, IsInt, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Importe ApiProperty

export class CreateReservationDto {
  @ApiProperty({ description: 'ID do usuário que está fazendo a reserva', example: 1 })
  @IsNotEmpty()
  @IsInt()
  userId: number; // ID do usuário que faz a reserva

  @ApiProperty({ description: 'ID do livro a ser reservado', example: 101 })
  @IsNotEmpty()
  @IsInt()
  bookId: number; // ID do livro reservado

  @ApiProperty({
    description: 'Data e hora da reserva (formato ISO 8601)',
    example: '2025-06-18T15:30:00Z', // Ajuste para a data/hora atual
  })
  @IsNotEmpty()
  @IsDateString()
  reservationDate: string; // Data da reserva (string no formato ISO 8601)
}