import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express'; // Pode ser necessário importar o express

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ========================================================================
  // ADICIONE ESTA LINHA PARA HABILITAR O PARSE DO BODY COMO JSON
  // ========================================================================
  // Isso permite que o NestJS entenda os dados enviados no corpo de requisições POST, PUT, etc.
  // Adicionei um limite maior por precaução, caso você envie imagens em base64 no futuro.
  app.use(express.json({ limit: '50mb' }));

  // Habilita o CORS (sua configuração existente)
  app.enableCors({
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();