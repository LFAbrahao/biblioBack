// src/reservations/dto/update-reservation.dto.ts
import { IsOptional, IsDateString, IsString, IsIn, IsNumber } from 'class-validator';

export class UpdateReservationDto {
  @IsOptional()
  @IsDateString()
  reservationDate?: string;

  @IsOptional()
  @IsDateString()
  returnDate?: string;

  @IsOptional()
  @IsString()
  @IsIn(['pending', 'confirmed', 'cancelled', 'returned']) // Define os status permitidos
  status?: string;

  @IsOptional()
  @IsNumber()
  totalPrice?: number;
}