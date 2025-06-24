import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express'; // Pode ser necessário importar o express
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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

  const config = new DocumentBuilder()
    .setTitle('Biblioteca API')
    .setDescription('Documentação da API da Biblioteca')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();