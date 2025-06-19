// src/reservations/dto/update-reservation.dto.ts
import { IsOptional, IsDateString, IsString, IsIn, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Importe ApiProperty

export class UpdateReservationDto {
  @ApiProperty({
    description: 'Nova data e hora da reserva (formato ISO 8601)',
    example: '2025-06-19T10:00:00Z',
    required: false, // Indica que o campo é opcional
  })
  @IsOptional()
  @IsDateString()
  reservationDate?: string;

  @ApiProperty({
    description: 'Data e hora da devolução (formato ISO 8601)',
    example: '2025-06-25T17:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  returnDate?: string;

  @ApiProperty({
    description: 'Status da reserva',
    enum: ['pending', 'confirmed', 'cancelled', 'returned'], // Mostra as opções válidas
    example: 'confirmed',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(['pending', 'confirmed', 'cancelled', 'returned']) // Define os status permitidos
  status?: string;

  @ApiProperty({
    description: 'Preço total atualizado da reserva',
    example: 25.99,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  totalPrice?: number;
}