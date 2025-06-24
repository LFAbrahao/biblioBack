/* eslint-disable prettier/prettier */
// src/reservations/reservations.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto'; // Vamos criar este DTO
import { UpdateReservationDto } from './dto/update-reservation.dto'; // Vamos criar este DTO
import { Book } from '../books/book.entity'; // Importar entidade Book
import { User } from '../users/user.entity'; // Importar entidade User

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationsRepository: Repository<Reservation>,
    @InjectRepository(Book) // Injetar o repositório de livros
    private booksRepository: Repository<Book>,
    @InjectRepository(User) // Injetar o repositório de usuários
    private usersRepository: Repository<User>,
  ) {}

  async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const { userId, bookId, reservationDate } = createReservationDto;

    // 1. Verificar se o usuário existe
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // 2. Verificar se o livro existe e tem estoque disponível
    const book = await this.booksRepository.findOne({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }
    if (book.stock <= 0) {
      throw new BadRequestException(`Book "${book.title}" is out of stock.`);
    }

    // 3. Decrementar o estoque do livro
    book.stock -= 1;
    await this.booksRepository.save(book); // Salva a alteração no estoque

    // 4. Criar e salvar a reserva
    const reservation = this.reservationsRepository.create({
      user, // TypeORM vai lidar com a associação
      book, // TypeORM vai lidar com a associação
      reservationDate: new Date(reservationDate),
      status: 'pending', // Status inicial da reserva
      //totalPrice: book.price, // Preço do livro no momento da reserva
    });

    return this.reservationsRepository.save(reservation);
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationsRepository.find({ relations: ['user', 'book'] }); // Incluir user e book
  }

  async findOne(id: number): Promise<Reservation> {
    const reservation = await this.reservationsRepository.findOne({
      where: { id },
      relations: ['user', 'book'],
    });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found.`);
    }
    return reservation;
  }

  async update(id: number, updateReservationDto: UpdateReservationDto): Promise<Reservation> {
    const reservation = await this.reservationsRepository.findOne({ where: { id }, relations: ['book'] });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found.`);
    }

    // Se o status está sendo alterado para 'cancelled' e ainda não estava cancelado
    if (
      updateReservationDto.status &&
      updateReservationDto.status === 'cancelled' &&
      reservation.status !== 'cancelled'
    ) {
      const book = reservation.book;
      book.stock += 1;
      await this.booksRepository.save(book);
    }

    // Se o status está sendo alterado para 'returned' e ainda não estava retornado
    if (
      updateReservationDto.status &&
      updateReservationDto.status === 'returned' &&
      reservation.status !== 'returned'
    ) {
      const book = reservation.book;
      book.stock += 1;
      await this.booksRepository.save(book);
    }

    // Atualiza apenas os campos que estão presentes no DTO
    Object.assign(reservation, updateReservationDto);

    return this.reservationsRepository.save(reservation);
  }

  async remove(id: number): Promise<void> {
    const reservation = await this.reservationsRepository.findOne({ where: { id }, relations: ['book'] });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found.`);
    }

    // Ao remover uma reserva, geralmente o estoque do livro deve ser reposto (se a reserva não foi concluída)
    if (reservation.status !== 'returned' && reservation.status !== 'cancelled') { // Ajuste a lógica conforme seu fluxo
        const book = reservation.book;
        book.stock += 1;
        await this.booksRepository.save(book);
    }

    await this.reservationsRepository.delete(id);
  }
}