import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, Patch } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos os livros' })
  @ApiResponse({ status: 200, description: 'Lista de livros.', type: [Book] })
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um livro pelo ID' })
  @ApiResponse({ status: 200, description: 'Livro encontrado.', type: Book })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(Number(id));
  }

  @Post()
  @ApiBody({ type: Book })
  @ApiOperation({ summary: 'Cria um novo livro' })
  @ApiResponse({ status: 201, description: 'Livro criado.', type: Book })
  create(@Body() book: Partial<Book>) {
    console.log('2. Backend [Controller] recebeu a requisição para criar:', book);
    return this.booksService.create(book);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um livro existente' })
  @ApiResponse({ status: 200, description: 'Livro atualizado com sucesso.', type: Book })
  @ApiResponse({ status: 404, description: 'Livro não encontrado.' })
  @ApiBody({ type: Book }) // Descreve o corpo da requisição esperado
  update(@Param('id') id: string, @Body() updateBookDto: Partial<Book>) {
    return this.booksService.update(Number(id), updateBookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um livro pelo ID' })
  @ApiResponse({ status: 204, description: 'Livro deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Livro não encontrado.' })
  @HttpCode(HttpStatus.NO_CONTENT) // Define o status de sucesso como 204 No Content
  remove(@Param('id') id: string) {
    return this.booksService.remove(Number(id));
  }


}