// src/reservations/reservation.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../users/user.entity';
import { Book } from '../books/book.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  // Relacionamento com User
  @ManyToOne(() => User, user => user.reservations) // 'user.reservations' é a propriedade no User que se refere a reservas
  user: User;

  // Relacionamento com Book
  @ManyToOne(() => Book, book => book.reservations) // 'book.reservations' é a propriedade no Book que se refere a reservas
  book: Book;

  @Column({ type: 'timestamp' })
  reservationDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  returnDate: Date;

  @Column({ length: 50, default: 'pending' }) // Adicione o campo status
  status: string; // Ex: 'pending', 'confirmed', 'cancelled', 'returned'

  @Column({ type: 'decimal', precision: 10, scale: 2 }) // Adicione o campo totalPrice
  totalPrice: number; // Preço do livro no momento da reserva
}