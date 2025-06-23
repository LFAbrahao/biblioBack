import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus, Patch, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('books')
@Controller('books')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @Roles('admin', 'bibliotecaria', 'user')
  @ApiOperation({ summary: 'Lista todos os livros' })
  @ApiResponse({ status: 200, description: 'Lista de livros.', type: [Book] })
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'bibliotecaria', 'user')
  @ApiOperation({ summary: 'Busca um livro pelo ID' })
  @ApiResponse({ status: 200, description: 'Livro encontrado.', type: Book })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(Number(id));
  }

  @Post()
  @Roles('admin', 'bibliotecaria')
  @ApiBody({ type: Book })
  @ApiOperation({ summary: 'Cria um novo livro' })
  @ApiResponse({ status: 201, description: 'Livro criado.', type: Book })
  create(@Body() book: Partial<Book>) {
    console.log('2. Backend [Controller] recebeu a requisição para criar:', book);
    return this.booksService.create(book);
  }

  @Patch(':id')
  @Roles('admin', 'bibliotecaria')
  @ApiOperation({ summary: 'Atualiza um livro existente' })
  @ApiResponse({ status: 200, description: 'Livro atualizado com sucesso.', type: Book })
  @ApiResponse({ status: 404, description: 'Livro não encontrado.' })
  @ApiBody({ type: Book })
  update(@Param('id') id: string, @Body() updateBookDto: Partial<Book>) {
    return this.booksService.update(Number(id), updateBookDto);
  }

  @Delete(':id')
  @Roles('admin', 'bibliotecaria')
  @ApiOperation({ summary: 'Deleta um livro pelo ID' })
  @ApiResponse({ status: 204, description: 'Livro deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Livro não encontrado.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.booksService.remove(Number(id));
  }
}