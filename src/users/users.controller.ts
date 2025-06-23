import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('admin')
  @ApiOperation({ summary: 'Lista todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários.', type: [User] })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'bibliotecaria')
  @ApiOperation({ summary: 'Busca um usuário pelo ID' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado.', type: User })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  @Post()
  @Roles('admin')
  @ApiBody({ type: User })
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado.', type: User })
  create(@Body() user: Partial<User>) {
    return this.usersService.create(user);
  }

  @Patch(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Atualiza um usuário existente' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.', type: User })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @ApiBody({ type: User, description: 'Dados parciais do usuário para atualização' })
  update(@Param('id') id: string, @Body() updateUserDto: Partial<User>) {
    return this.usersService.update(Number(id), updateUserDto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Deleta um usuário' })
  @ApiResponse({ status: 204, description: 'Usuário deletado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.usersService.remove(Number(id));
  }
}