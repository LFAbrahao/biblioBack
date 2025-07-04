import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { Reservation } from '../reservations/reservation.entity'; // Adicione este import

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  // ANTES (com erro de tipo):
  // findOne(id: number): Promise<Book | null> {

  // DEPOIS (corrigido - removemos o '| null'):
  async findOne(id: number): Promise<Book> {
    const book = await this.booksRepository.findOneBy({ id });
    if (!book) {
      // Esta linha garante que a função nunca retornará 'null'
      throw new NotFoundException(`Livro com o ID "${id}" não encontrado`);
    }
    return book;
  }

  create(book: Partial<Book>): Promise<Book> {
    const newBook = this.booksRepository.create(book);
    return this.booksRepository.save(newBook);
  }
  
  async update(id: number, updateBookDto: Partial<Book>): Promise<Book> {
    const result = await this.booksRepository.update(id, updateBookDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Livro com o ID "${id}" não encontrado`);
    }

    // Agora o TypeScript está feliz, pois sabe que findOne(id) sempre retornará um Book
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.booksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Livro com o ID "${id}" não encontrado`);
    }
  }

  async getStatistics() {
    // Soma total de livros em estoque
    const { sum } = await this.booksRepository
      .createQueryBuilder('book')
      .select('SUM(book.stock)', 'sum')
      .getRawOne();

    // Total de reservas pendentes
    const pending = await this.booksRepository.manager
      .getRepository(Reservation)
      .createQueryBuilder('reservation')
      .where('reservation.status = :status', { status: 'pending' })
      .getCount();

    // Total de reservas devolvidas
    const returned = await this.booksRepository.manager
      .getRepository(Reservation)
      .createQueryBuilder('reservation')
      .where('reservation.status = :status', { status: 'returned' })
      .getCount();

    return {
      totalStock: Number(sum) || 0,
      totalReserved: pending,
      totalReturned: returned,
    };
  }
}