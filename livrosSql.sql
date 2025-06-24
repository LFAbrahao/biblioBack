-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.32-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para biblioteca
DROP DATABASE IF EXISTS `biblioteca`;
CREATE DATABASE IF NOT EXISTS `biblioteca` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `biblioteca`;

-- Copiando estrutura para tabela biblioteca.book
DROP TABLE IF EXISTS `book`;
CREATE TABLE IF NOT EXISTS `book` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `genre` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `imageUrl` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Copiando dados para a tabela biblioteca.book: ~1 rows (aproximadamente)
INSERT IGNORE INTO `book` (`id`, `title`, `author`, `genre`, `description`, `stock`, `imageUrl`, `createdAt`, `updatedAt`) VALUES
	(1, 'Cem anos de solidao', 'Garcia Marquez', 'Literatura', 'A jornada da familia buendia ao longo do tempo', 20, 'https://m.media-amazon.com/images/I/817esPahlrL.jpg', '2025-06-20 03:52:49', '2025-06-24 18:09:34'),
	(13, 'Realismo Capitalista', 'Mark Fisher', 'Filosofia', 'É mais facil imaginar o fim do mundo do que o fim do capitalismo?', 1, 'https://m.media-amazon.com/images/I/61MPD9hKDoL.jpg', '2025-06-20 05:52:46', '2025-06-20 05:52:46'),
	(14, 'O desejo dos outros', 'Hannah Limulja', 'Antropologia', 'Em O desejo dos outros, Hanna Limulja oferece uma porta de entrada ao mundo yanomami através dos seus sonhos. Com o que sonham? O que significa sonhar e por que é importante? Entre os Yanomami, os sonhos não são desejos inconscientes do sujeito, como descreve a psicanálise: sonhar é habitar outros mundos, deparar com outros seres e, nesses encontros, mobilizar-se pelo desejo dos outros. ', 15, 'https://m.media-amazon.com/images/I/71QyvYkheOL._UF894,1000_QL80_.jpg', '2025-06-21 22:51:19', '2025-06-24 17:42:44'),
	(15, 'A Arte da Guerra', ' SUN TZU', 'Clássicos', 'O que faz de um tratado militar, escrito por volta de 500 a.C., manter-se atual a ponto de ser publicado praticamente no mundo todo até os dias de hoje? Você verá que, em A arte da guerra, as estratégias transmitidas pelo general chinês Sun Tzu carregam um profundo conhecimento da natureza humana. ', 10, 'https://m.media-amazon.com/images/I/51Fe45NGwkL.jpg', '2025-06-24 17:42:32', '2025-06-24 17:43:17'),
	(16, 'O Povo Brasileiro', 'Darcy Ribeiro', 'Sociologia', 'Obra magistral, e o maior desafio de Darcy Ribeiro, O povo brasileiro é uma tentativa de compreender quem somos, o que somos e a importância do nosso país. Talvez uma tarefa dura, mas imprescindível, pois segundo Darcy: “Este é um livro que quer ser participante, que aspira a influir sobre as pessoas e ajudar o Brasil a encontrar-se a si mesmo”', 10, 'https://m.media-amazon.com/images/I/A1lPmAv2hEL.jpg', '2025-06-24 17:44:49', '2025-06-24 17:45:31'),
	(17, 'A ridícula ideia de nunca mais te ver', 'Rosa Montero', 'Literatura', 'Quando Rosa Montero leu o impressionante diário (incluído como apêndice neste livro) que Marie Curie escreveu após a morte de seu marido, ela sentiu que a história dessa mulher fascinante guardava uma triste sintonia com a sua própria: Pablo Lizcano, seu companheiro durante 21 anos, morrera havia pouco depois de enfrentar um câncer. As consequências dessa perda geraram este livro vertiginoso e tocante a respeito da morte, mas sobretudo dos laços que nos unem ao extremo da vida.', 10, 'https://m.media-amazon.com/images/I/710RanUu5fL.jpg', '2025-06-24 17:46:16', '2025-06-24 17:47:17'),
	(18, 'Ode a Mauro Shampoo e Outras Histórias da Várzea', 'Luiz Antonio Simas', 'Contos', 'Os textos deste livro passam ao largo da análise sociológica ou do rigor histórico. Eles foram escritos com a duvidosa categoria de um peladeiro convicto que mais tomou frangos do que fez golaços. Ao longo de 32 crônicas, o historiador Luiz Antonio Simas conta histórias de times pequenos, derrotas, sonhos e conquistas da várzea. Várzeas são terrenos junto aos rios. Tudo indica que a expressão “futebol de várzea” surgiu em São Paulo, em campos que ficavam às margens do Rio Tietê. Para efeito deste livro, a várzea é qualquer terreno – do campinho de terra ao estádio famoso – onde o futebol inventa, margeando modestos ribeirões, a vida.', 12, 'https://m.media-amazon.com/images/I/71PQWvXAA6L._UF1000,1000_QL80_.jpg', '2025-06-24 17:49:10', '2025-06-24 17:49:20'),
	(19, 'Desenvolvimento Real de Software: um Guia de Projetos Para Fundamentos em Java ', 'Richard Warburton', 'Computação', 'Você deve aprender práticas orientadas a objeto, como o desenvolvimento baseado em testes? Ou aplicar ideias de programação funcional? Este guia fornece uma abordagem prática e baseada em projetos a fim de ajudá-lo a aprender os principais tópicos necessários para ser um desenvolvedor produtivo. Raoul-Gabriel Urma e Richard Warburton mostram como desenvolver vários projetos reais e ainda aprender práticas recomendadas no processo. Cada capítulo foca um projeto que inicia como um programa em batch da linha de comando e se desenvolve em uma aplicação completa. Se você conseguir escrever um código Java básico, aprenderá práticas de desenvolvimento de software avançadas para criar um software Java moderno, robusto e de fácil manutenção.', 5, 'https://m.media-amazon.com/images/I/81gq4TcAmQL._SL1500_.jpg', '2025-06-24 17:50:13', '2025-06-24 17:50:49'),
	(20, 'Todos os fogos o fogo', 'Julio Cortazar', 'Literatura', '“A habilidade de Cortázar em apresentar objetos comuns por novas perspectivas, como se ele tivesse acabado de inventá-los, torna a leitura de seu texto uma experiência única.” Time “Nos livros de Cortázar o autor joga, o narrador joga, os personagens jogam, e o leitor também é obrigado a jogar por causa das inesperadas armadilhas que estão à sua espreita, quando vira a página inocentemente.”', 7, 'https://m.media-amazon.com/images/I/611xdhbB8dL._SL1000_.jpg', '2025-06-24 17:52:37', '2025-06-24 17:53:16'),
	(21, 'Use a Cabeça Java – 3ª Edição: Guia do Aprendiz Para Programação no Mundo Real ', 'Kathy Sierra', 'Programacao', 'O “Use a Cabeça Java” é uma experiência completa de aprendizado em Java e programação orientada a objetos. Com este livro, você aprenderá a linguagem Java de um jeito único, que ultrapassa os manuais de instruções, ajudando-o a se tornar um programador excelente. Por meio de quebra-cabeças, mistérios e entrevistas reveladoras com famosos objetos Java, você ficará por dentro dos fundamentos Java e tópicos avançados, incluindo lambdas, streams, generics, threads, redes e a temida interface gráfica (GUI) para desktop. ', 6, 'https://m.media-amazon.com/images/I/610D1O8WWOL._SL1426_.jpg', '2025-06-24 17:53:45', '2025-06-24 17:54:20'),
	(22, 'Doppelgänger: Uma viagem através do Mundo-Espelho', 'Naomi Klein', 'Sociologia', 'Em Doppelgänger – uma viagem através do Mundo-Espelho , a escritora Naomi Klein faz uma investigação de fôlego no submundo online da desinformação e das teorias conspiratórias. Autora de vários best-sellers e traduzida em mais de trinta idiomas, ela analisa como funciona essa realidade paralela, um mundo invertido no qual as pessoas embarcam em uma teia de verdades facilmente contestáveis e assumem discursos fanáticos, repletos de violência e paranoia, expandindo a polarização das redes sociais para diversas outras esferas da sociedade. ', 7, 'https://m.media-amazon.com/images/I/81iXHL40EBL._SL1500_.jpg', '2025-06-24 17:59:10', '2025-06-24 17:59:16'),
	(23, 'Turma da Mônica - Lendas para Crianças', 'Mauricio de Souza', 'Quadrinhos', 'O folclore do Brasil é fruto da miscigenação entre os saberes tradicionais dos nativos indígenas, povos africanos e europeus. Dessa união, nasceram as nossas lendas. Este livro traz algumas das mais conhecidas e muitas outras, que as crianças adoram, com os queridos personagens da Turma da Mônica ! ', 8, 'https://m.media-amazon.com/images/I/81-ND0C2vXL._SL1500_.jpg', '2025-06-24 18:00:02', '2025-06-24 18:00:28');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
