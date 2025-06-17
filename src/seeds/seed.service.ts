import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../users/user.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async seed() {
    const users = [
      { name: 'User1', email: 'user1@library.com', password: 'user123', role: UserRole.USER },
      { name: 'Admin', email: 'admin@library.com', password: 'admin123', role: UserRole.ADMIN },
      { name: 'Bibliotecaria', email: 'bib@library.com', password: 'bib123', role: UserRole.BIBLIOTECARIA },
    ];
    for (const user of users) {
      const exists = await this.usersRepository.findOneBy({ email: user.email });
      if (!exists) {
        await this.usersRepository.save(user);
      }
    }
  }
}