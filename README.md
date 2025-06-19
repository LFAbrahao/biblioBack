<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Um framework <a href="http://nodejs.org" target="_blank">Node.js</a> progressivo para a construção de aplicações server-side eficientes e escaláveis.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"   target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Siga-nos no Twitter"></a>
</p>
  ## Descrição

Repositório inicial do framework Nest (TypeScript).

## Configuração do Projeto

```bash
$ npm install

## Compilar e Rodar o Projeto

# desenvolvimento
$ npm run start

# modo watch (para desenvolvimento)
$ npm run start:dev

# modo de produção
$ npm run start:prod

## Rodar Testes

# testes de unidade
$ npm run test

# testes e2e
$ npm run test:e2e

# cobertura de testes
$ npm run test:covm run test:cov
```

-- Dropar o banco de dados se ele já existir (apenas para recriar do zero)
DROP DATABASE IF EXISTS `biblioteca`;

-- Criar o banco de dados
CREATE DATABASE `biblioteca` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- Usar o banco de dados recém-criado
USE `biblioteca`;

--
-- Inserir dados de exemplo na tabela `user`
-- (O TypeORM criará a tabela automaticamente com base em user.entity.ts)
--
INSERT INTO `user` (`name`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
('Admin Master', 'admin@example.com', 'senha_hashed_admin123', 'admin', NOW(), NOW()),
('Bibliotecária Maria', 'maria@example.com', 'senha_hashed_bibliotecaria', 'bibliotecaria', NOW(), NOW()),
('João Silva', 'joao.silva@example.com', 'senha_hashed_joao', 'user', NOW(), NOW()),
('Ana Paula', 'ana.paula@example.com', 'senha_hashed_ana', 'user', NOW(), NOW()),
('Carlos Eduardo', 'carlos.eduardo@example.com', 'senha_hashed_carlos', 'user', NOW(), NOW());

--
-- Inserir dados de exemplo na tabela `book`
-- (O TypeORM criará a tabela automaticamente com base em book.entity.ts)
--
INSERT INTO `book` (`id`, `title`, `author`, `publisher`, `publicationYear`, `isbn`, `genre`, `description`, `price`, `stock`, `imageUrl`, `createdAt`, `updatedAt`) VALUES
(100, 'O Senhor dos Anéis', 'J.R.R. Tolkien', 'HarperCollins', 1954, '9780618053267', 'Fantasia', 'Uma épica jornada através da Terra Média.', 49.90, 5, '[https://example.com/lotr.jpg](https://example.com/lotr.jpg)', NOW(), NOW()),
(101, '1984', 'George Orwell', 'Penguin Books', 1949, '9780451524935', 'Distopia', 'Uma crítica severa aos regimes totalitários.', 29.50, 3, '[https://example.com/1984.jpg](https://example.com/1984.jpg)', NOW(), NOW()),
(102, 'Dom Casmurro', 'Machado de Assis', 'Ateliê Editorial', 1899, '9788574800067', 'Romance', 'Clássico da literatura brasileira com narrador não confiável.', 35.00, 7, '[https://example.com/domcasmurro.jpg](https://example.com/domcasmurro.jpg)', NOW(), NOW()),
(103, 'Sapiens: Uma Breve História da Humanidade', 'Yuval Noah Harari', 'Companhia das Letras', 2011, '9788535925026', 'História', 'Explora a história da humanidade desde a Idade da Pedra.', 59.90, 2, '[https://example.com/sapiens.jpg](https://example.com/sapiens.jpg)', NOW(), NOW()),
(104, 'Harry Potter e a Pedra Filosofal', 'J.K. Rowling', 'Rocco', 1997, '9788532511015', 'Fantasia', 'O início da saga do bruxo mais famoso.', 45.00, 10, '[https://example.com/hp1.jpg](https://example.com/hp1.jpg)', NOW(), NOW());

--
-- Inserir dados de exemplo na tabela `reservation`
-- (O TypeORM criará a tabela automaticamente com base em reservation.entity.ts)
-- Certifique-se de que os IDs de usuário e livro existam das inserções acima.
-- (Assumindo que os IDs de user são 1, 2, 3, 4, 5 e os IDs de book são 100, 101, 102, 103, 104 - o TypeORM pode começar os IDs de user a partir de 1)
--
INSERT INTO `reservation` (`userId`, `bookId`, `reservationDate`, `status`, `totalPrice`, `createdAt`, `updatedAt`) VALUES
(3, 100, '2025-06-18 10:00:00', 'pending', 49.90, NOW(), NOW()), -- João reserva O Senhor dos Anéis
(3, 101, '2025-06-18 11:30:00', 'confirmed', 29.50, NOW(), NOW()), -- João reserva 1984
(4, 102, '2025-06-18 14:15:00', 'pending', 35.00, NOW(), NOW()), -- Ana reserva Dom Casmurro
(5, 103, '2025-06-18 16:00:00', 'cancelled', 59.90, NOW(), NOW()), -- Carlos reserva Sapiens (e cancela)
(5, 104, '2025-06-18 17:45:00', 'pending', 45.00, NOW(), NOW()); -- Carlos reserva Harry Potter


Exemplos de JSON para Requisições POST
1. Criar um Novo Livro (POST /books)
Este JSON representa os dados mínimos ou comuns para criar um novo livro.

{
  "title": "A Arte da Guerra",
  "author": "Sun Tzu",
  "publisher": "Editora Aleph",
  "publicationYear": 500,
  "isbn": "9788576570077",
  "genre": "Estratégia",
  "description": "Um tratado militar chinês antigo atribuído a Sun Tzu, um estrategista militar da antiga China.",
  "price": 39.90,
  "stock": 8,
  "imageUrl": "https://example.com/a-arte-da-guerra.jpg"
}

2. Criar uma Nova Reserva (POST /reservations)
Este JSON é para criar uma nova reserva. Note que userId e bookId devem corresponder a IDs existentes no seu banco de dados.

{
  "userId": 3,
  "bookId": 102,
  "reservationDate": "2025-06-20T10:00:00Z"
}

3. Criar um Novo Usuário (POST /users)
Este JSON representa os dados necessários para registrar um novo usuário no sistema.
{
  "name": "Pedro Alvares",
  "email": "pedro.alvares@example.com",
  "password": "senhaSegura123",
  "role": "user"
}
