import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Usuário com o ID "${id}" não encontrado`);
    }
    return user;
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

   async create(user: Partial<User>): Promise<User> {
    // 1. VERIFICA SE O EMAIL FOI ENVIADO E SE JÁ EXISTE
    if (user.email) {
      const existingUser = await this.findByEmail(user.email);
      if (existingUser) {
        // 2. LANÇA UM ERRO '409 CONFLICT' SE O EMAIL JÁ ESTIVER EM USO
        throw new ConflictException('Este email já está em uso.');
      }
    }
    
    // 3. SE NÃO EXISTIR, PROSSEGUE COM A CRIAÇÃO
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async update(id: number, updateUserDto: Partial<User>): Promise<User> {
    const result = await this.usersRepository.update(id, updateUserDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Usuário com o ID "${id}" não encontrado`);
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Usuário com o ID "${id}" não encontrado`);
    }
  }
}