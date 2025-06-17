// src/users/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'; // Adicione OneToMany aqui
import { ApiProperty } from '@nestjs/swagger';
import { Reservation } from '../reservations/reservation.entity'; // <-- Adicione esta linha!

export enum UserRole {
  ADMIN = 'admin',
  BIBLIOTECARIA = 'bibliotecaria',
  USER = 'user',
}

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty({ enum: UserRole, default: UserRole.USER })
  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => Reservation, reservation => reservation.user)
  reservations: Reservation[];
}