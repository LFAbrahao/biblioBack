// src/books/book.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'; // Adicione OneToMany aqui
import { ApiProperty } from '@nestjs/swagger';
import { Reservation } from '../reservations/reservation.entity'; // <-- Adicione esta linha!

@Entity()
export class Book {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  author: string;

  // Adicionei outras propriedades que havíamos discutido para um e-commerce de livros
  // Você pode ajustar conforme as suas necessidades
  //@ApiProperty({ nullable: true })
  //@Column({ nullable: true, length: 255 })
  //publisher: string;

  //@ApiProperty({ nullable: true })
  //@Column({ type: 'int', nullable: true })
  //publicationYear: number;

  @ApiProperty({ nullable: true })
  @Column({ nullable: true, length: 100 })
  genre: string;

  @ApiProperty({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description: string;

  //@ApiProperty()
  //@Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00 })
  //price: number; // Preço do livro

  @ApiProperty()
  @Column({ type: 'int', default: 0 })
  stock: number; // Quantidade em estoque! Crucial para e-commerce

  @ApiProperty({ nullable: true })
  @Column({ nullable: true, length: 255 })
  imageUrl: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => Reservation, reservation => reservation.book)
  reservations: Reservation[];
}