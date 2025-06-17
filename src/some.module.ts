import { Module, Injectable } from '@nestjs/common';

@Injectable()
export class SomeService {
  // Implemente métodos conforme necessário
}

@Module({
  providers: [SomeService],
})
export class SomeModule {}