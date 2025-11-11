CREATE DATABASE IF NOT EXISTS profission
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_general_ci;

USE profission;

-- Categoria e Subcategoria
CREATE TABLE categoria_profissao (
  id_categoria_profissao INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL
);

CREATE TABLE subcategoria_profissao (
  id_subcategoria_profissao INT PRIMARY KEY AUTO_INCREMENT,
  id_categoria_profissao INT NOT NULL,
  nome VARCHAR(255) NOT NULL,
  FOREIGN KEY (id_categoria_profissao) REFERENCES categoria_profissao(id_categoria_profissao)
);

-- Nível de formação
CREATE TABLE nivel_de_formacao (
  id_nivel_de_formacao INT AUTO_INCREMENT PRIMARY KEY,
  nome_nivel VARCHAR(100) NOT NULL,
  descricao VARCHAR(255),
  ordem_hierarquia INT
);

-- Perspectivas futuras
CREATE TABLE perspectivas_futuras (
  id_perspectivas_futuras INT AUTO_INCREMENT PRIMARY KEY,
  objetivo TEXT,
  tendencia_mercado VARCHAR(255),
  horizonte_tempo VARCHAR(50)
);

-- Requisitos de experiência
CREATE TABLE requisitos_experiencia (
  id_requisitos_experiencia INT AUTO_INCREMENT PRIMARY KEY,
  descricao VARCHAR(255),
  area_experiencia VARCHAR(100),
  nivel_experiencia ENUM('Junior','Pleno','Senior')
);

-- Profissão
CREATE TABLE profissao (
  id_profissao INT AUTO_INCREMENT PRIMARY KEY,
  id_subcategoria_profissao INT NOT NULL,
  id_requisitos_experiencia INT,
  id_perspectivas_futuras INT,
  id_nivel_de_formacao INT,
  nome_profissao VARCHAR(255) NOT NULL,
  descricao TEXT,
  area VARCHAR(100),
  nivel_formacao VARCHAR(100),
  salario_medio VARCHAR(100),
  mercado_trabalho TEXT,
  FOREIGN KEY (id_subcategoria_profissao) REFERENCES subcategoria_profissao(id_subcategoria_profissao),
  FOREIGN KEY (id_requisitos_experiencia) REFERENCES requisitos_experiencia(id_requisitos_experiencia),
  FOREIGN KEY (id_perspectivas_futuras) REFERENCES perspectivas_futuras(id_perspectivas_futuras),
  FOREIGN KEY (id_nivel_de_formacao) REFERENCES nivel_de_formacao(id_nivel_de_formacao)
);

-- Habilidade
CREATE TABLE habilidade (
  id_habilidade INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  tipo VARCHAR(50) NOT NULL,
  nivel_recomendado VARCHAR(50),
  descricao TEXT
);

CREATE TABLE habilidade_profissao (
  id_profissao INT NOT NULL,
  id_habilidade INT NOT NULL,
  relevancia VARCHAR(50),
  observacoes TEXT,
  PRIMARY KEY(id_profissao, id_habilidade),
  FOREIGN KEY (id_profissao) REFERENCES profissao(id_profissao),
  FOREIGN KEY (id_habilidade) REFERENCES habilidade(id_habilidade)
);

-- Região
CREATE TABLE regiao (
  id_regiao INT AUTO_INCREMENT PRIMARY KEY,
  nome_regiao VARCHAR(100) NOT NULL,
  tipo_regiao VARCHAR(50) NOT NULL
);

-- Fonte de dados
CREATE TABLE fonte_de_dados (
  id_fonte_de_dados INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150),
  tipo VARCHAR(150)
);

-- Observações
CREATE TABLE observacoes (
  id_observacoes INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100),
  descricao TEXT,
  data_registro DATETIME
);

-- Demanda profissional
CREATE TABLE demanda_profissional (
  id_demanda INT AUTO_INCREMENT PRIMARY KEY,
  id_regiao INT NOT NULL,
  id_fonte_de_dados INT NOT NULL,
  id_profissao INT NOT NULL,
  nivel_demanda VARCHAR(50),
  salario_medio DECIMAL(10, 2),
  fonte_dados VARCHAR(255),
  data_atualizacao DATE NOT NULL,
  quantidade_vagas INT,
  FOREIGN KEY (id_fonte_de_dados) REFERENCES fonte_de_dados(id_fonte_de_dados),
  FOREIGN KEY (id_profissao) REFERENCES profissao(id_profissao),
  FOREIGN KEY (id_regiao) REFERENCES regiao(id_regiao)
);

-- Projeção salarial
CREATE TABLE projecao_salarial (
  id_projecao INT AUTO_INCREMENT PRIMARY KEY,
  id_profissao INT NOT NULL,
  id_fonte_de_dados INT NOT NULL,
  id_regiao INT NOT NULL,
  anos_experiencia INT NOT NULL,
  salario_medio DECIMAL(10,2) NOT NULL,
  fonte_dados VARCHAR(255),
  data_atualizacao DATE NOT NULL,
  FOREIGN KEY (id_profissao) REFERENCES profissao(id_profissao),
  FOREIGN KEY (id_fonte_de_dados) REFERENCES fonte_de_dados(id_fonte_de_dados),
  FOREIGN KEY (id_regiao) REFERENCES regiao(id_regiao)
);

-- Colaborador
CREATE TABLE colaborador (
  id_colaborador INT AUTO_INCREMENT PRIMARY KEY,
  nome_completo VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  cargo VARCHAR(100),
  departamento VARCHAR(100),
  data_admissao DATE,
  status_colaborador VARCHAR(50) NOT NULL,
  nivel_acesso VARCHAR(50),
  telefone VARCHAR(20)
);

-- Artigo
CREATE TABLE artigo (
  id_artigo INT AUTO_INCREMENT PRIMARY KEY,
  id_colaborador INT NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  resumo TEXT,
  conteudo TEXT NOT NULL,
  data_criacao DATETIME NOT NULL,
  data_atualizacao DATETIME,
  FOREIGN KEY (id_colaborador) REFERENCES colaborador(id_colaborador)
);

CREATE TABLE artigo_profissao (
  id_artigo INT NOT NULL,
  id_profissao INT NOT NULL,
  PRIMARY KEY (id_artigo, id_profissao),
  FOREIGN KEY (id_artigo) REFERENCES artigo(id_artigo),
  FOREIGN KEY (id_profissao) REFERENCES profissao(id_profissao)
);

CREATE TABLE artigo_habilidade (
  id_artigo INT NOT NULL,
  id_habilidade INT NOT NULL,
  PRIMARY KEY (id_artigo, id_habilidade),
  FOREIGN KEY (id_artigo) REFERENCES artigo(id_artigo),
  FOREIGN KEY (id_habilidade) REFERENCES habilidade(id_habilidade)
);

CREATE TABLE conta(
	  id_conta INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	  nome VARCHAR(255) NOT NULL,
	  email VARCHAR(255) NOT NULL UNIQUE,
	  senha VARCHAR(255) NOT NULL,
	  data_nascimento DATE,
	  endereco VARCHAR(255),
	  telefone VARCHAR(20),
	  data_cadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	  ultimo_acesso DATETIME,
      foto_perfil VARCHAR(255)
);
-- Usuário
CREATE TABLE usuario (
  id_usuario INT primary KEY auto_increment NOT NULL,
  tipo_usuario VARCHAR(50) NOT NULL,-
  id_conta INT,
  FOREIGN KEY (id_conta) REFERENCES conta(id_conta)

);


-- Favoritos
CREATE TABLE favorito (
  id_favorito INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_profissao INT NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
  FOREIGN KEY (id_profissao) REFERENCES profissao(id_profissao)
);

-- Comparador de profissões
CREATE TABLE comparador_log (
  id_comparador_log INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  data_comparacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  resultado TEXT,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE comparador_log_profissoes (
  id_comparador_log INT,
  id_profissao INT,
  PRIMARY KEY(id_comparador_log, id_profissao),
  FOREIGN KEY (id_comparador_log) REFERENCES comparador_log(id_comparador_log),
  FOREIGN KEY (id_profissao) REFERENCES profissao(id_profissao)
);

-- Multas
CREATE TABLE multa (
  id_multa INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  data_inicio_multa DATE NOT NULL,
  valor_multa DECIMAL(10,2) NOT NULL,
  dias_atraso INT NOT NULL,
  status_multa VARCHAR(50) NOT NULL,
  data_pagamento_multa DATE,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- Usuário Premium
CREATE TABLE usuario_premium (
  id_usuario_premium INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL UNIQUE,
  data_inicio_assinatura DATE NOT NULL,
  data_final_assinatura DATE NOT NULL,
  tipo_assinatura VARCHAR(50),
  status_assinatura VARCHAR(50) NOT NULL,
  metodo_pagamento VARCHAR(50),
  id_conta INT,
  FOREIGN KEY (id_conta) REFERENCES conta(id_conta)
);
-- Disciplinas, metodologias e materiais
CREATE TABLE disciplina (
  id_disciplina INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100),
  descricao TEXT
);

CREATE TABLE metodologia (
  id_metodologia INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  descricao TEXT,
  area_aplicacao VARCHAR(100)
);

CREATE TABLE materiais_recomendados (
  id_materiais_recomendados INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  descricao TEXT,
  nivel_dificuldade ENUM('Basico','Intermediario','Avancado')
);

CREATE TABLE avaliacoes (
  id_avaliacoes INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100),
  descricao TEXT,
  categoria VARCHAR(100)
);

-- Plano de estudo Premium
CREATE TABLE plano_estudo_premium (
  id_plano_estudo_premium INT AUTO_INCREMENT PRIMARY KEY,
  id_profissao INT NOT NULL,
  id_disciplina INT NOT NULL,
  id_avaliacoes INT NOT NULL,
  id_materiais_recomendados INT NOT NULL,
  id_metodologia INT NOT NULL,
  area_estudo VARCHAR(100),
  nome VARCHAR(100),
  FOREIGN KEY (id_profissao) REFERENCES profissao(id_profissao),
  FOREIGN KEY (id_disciplina) REFERENCES disciplina(id_disciplina),
  FOREIGN KEY (id_avaliacoes) REFERENCES avaliacoes(id_avaliacoes),
  FOREIGN KEY (id_materiais_recomendados) REFERENCES materiais_recomendados(id_materiais_recomendados),
  FOREIGN KEY (id_metodologia) REFERENCES metodologia(id_metodologia)
);

CREATE TABLE usuario_plano_estudo (
  id_usuario_premium INT NOT NULL,
  id_plano_estudo_premium INT NOT NULL,
  data_acesso DATETIME,
  progresso_estudo INT,
  PRIMARY KEY(id_usuario_premium, id_plano_estudo_premium),
  FOREIGN KEY (id_usuario_premium) REFERENCES usuario_premium(id_usuario_premium),
  FOREIGN KEY (id_plano_estudo_premium) REFERENCES plano_estudo_premium(id_plano_estudo_premium)
);

-- Benefícios
CREATE TABLE beneficio (
  id_beneficio INT AUTO_INCREMENT PRIMARY KEY,
  id_plano_estudo_premium INT NOT NULL,
  nome VARCHAR(255),
  descricao TEXT,
  FOREIGN KEY (id_plano_estudo_premium) REFERENCES plano_estudo_premium(id_plano_estudo_premium)
);

CREATE TABLE usuario_beneficio (
  id_usuario_premium INT,
  id_beneficio INT,
  data_desbloqueio DATE NOT NULL,
  PRIMARY KEY (id_usuario_premium, id_beneficio),
  FOREIGN KEY (id_usuario_premium) REFERENCES usuario_premium(id_usuario_premium),
  FOREIGN KEY (id_beneficio) REFERENCES beneficio(id_beneficio)
);

-- Simulados e gabaritos
CREATE TABLE simulado (
  id_simulado INT AUTO_INCREMENT PRIMARY KEY,
  id_profissao INT NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  FOREIGN KEY (id_profissao) REFERENCES profissao(id_profissao)
);

CREATE TABLE gabarito (
  id_gabarito INT AUTO_INCREMENT PRIMARY KEY,
  id_profissao INT NOT NULL,
  respostas_corretas TEXT NOT NULL,
  FOREIGN KEY (id_profissao) REFERENCES profissao(id_profissao)
);

-- Quiz vocacional
CREATE TABLE quiz_vocacional (
  id_quiz_vocacional INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  data_realizacao DATETIME NOT NULL,
  score INT,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE quiz_profissao (
  id_quiz_vocacional INT,
  id_profissao INT,
  comentarios_usuario TEXT,
  PRIMARY KEY(id_quiz_vocacional, id_profissao),
  FOREIGN KEY (id_quiz_vocacional) REFERENCES quiz_vocacional(id_quiz_vocacional),
  FOREIGN KEY (id_profissao) REFERENCES profissao(id_profissao)
);

-- Perguntas e respostas
CREATE TABLE perguntas (
  id_pergunta INT AUTO_INCREMENT PRIMARY KEY,
  id_quiz_vocacional INT,
  id_simulado INT,
  enunciado_pergunta TEXT NOT NULL,
  FOREIGN KEY (id_quiz_vocacional) REFERENCES quiz_vocacional(id_quiz_vocacional),
  FOREIGN KEY (id_simulado) REFERENCES simulado(id_simulado)
);

CREATE TABLE respostas_simulado (
  id_resposta_simulado INT AUTO_INCREMENT PRIMARY KEY,
  id_pergunta INT NOT NULL,
  id_usuario INT NOT NULL,
  resposta_enviada TEXT NOT NULL,
  data_envio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_pergunta) REFERENCES perguntas(id_pergunta),
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- Fórum
CREATE TABLE forum (
  id_forum INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  conteudo_inicial TEXT,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE conteudo (
  id_conteudo INT AUTO_INCREMENT PRIMARY KEY,
  id_profissao INT,
  id_habilidade INT,
  id_plano_estudo_premium INT,
  id_forum INT,
  titulo VARCHAR(255) NOT NULL,
  tipo_conteudo VARCHAR(100) NOT NULL,
  FOREIGN KEY (id_profissao) REFERENCES profissao(id_profissao),
  FOREIGN KEY (id_habilidade) REFERENCES habilidade(id_habilidade),
  FOREIGN KEY (id_plano_estudo_premium) REFERENCES plano_estudo_premium(id_plano_estudo_premium),
  FOREIGN KEY (id_forum) REFERENCES forum(id_forum)
);

-- Conversas e mensagens
CREATE TABLE conversa (
  id_conversa INT AUTO_INCREMENT PRIMARY KEY,	
  id_usuario_1 INT NOT NULL,
  id_usuario_2 INT NOT NULL,
  data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario_1) REFERENCES usuario(id_usuario),
  FOREIGN KEY (id_usuario_2) REFERENCES usuario(id_usuario)
);

CREATE TABLE mensagem (
  id_mensagem INT AUTO_INCREMENT PRIMARY KEY,
  id_conversa INT NOT NULL,
  id_forum INT,
  id_usuario INT NOT NULL,
  conteudo TEXT NOT NULL,
  data_envio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_conversa) REFERENCES conversa(id_conversa),
  FOREIGN KEY (id_forum) REFERENCES forum(id_forum),
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

-- Log de ações administrador
CREATE TABLE log_acao_administrador (
  id_log_acao_administrador INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  id_profissao INT,
  id_plano_estudo_premium INT,
  id_habilidade INT,
  id_artigo INT,
  id_forum INT,
  id_mensagem INT,
  id_resposta_simulado INT,
  id_comparador_log INT,
  id_favorito INT,
  id_conteudo INT,
  acao VARCHAR(255) NOT NULL,
  data_hora DATETIME NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
  FOREIGN KEY (id_profissao) REFERENCES profissao(id_profissao),
  FOREIGN KEY (id_plano_estudo_premium) REFERENCES plano_estudo_premium(id_plano_estudo_premium),
  FOREIGN KEY (id_habilidade) REFERENCES habilidade(id_habilidade),
  FOREIGN KEY (id_artigo) REFERENCES artigo(id_artigo),
  FOREIGN KEY (id_forum) REFERENCES forum(id_forum),
  FOREIGN KEY (id_mensagem) REFERENCES mensagem(id_mensagem),
  FOREIGN KEY (id_resposta_simulado) REFERENCES respostas_simulado(id_resposta_simulado),
  FOREIGN KEY (id_comparador_log) REFERENCES comparador_log(id_comparador_log),
  FOREIGN KEY (id_favorito) REFERENCES favorito(id_favorito),
  FOREIGN KEY (id_conteudo) REFERENCES conteudo(id_conteudo)
);

ALTER TABLE profissao MODIFY id_subcategoria_profissao INT NULL;
ALTER TABLE profissao MODIFY id_requisitos_experiencia INT NULL;
ALTER TABLE profissao MODIFY id_perspectivas_futuras INT NULL;
ALTER TABLE profissao MODIFY id_nivel_de_formacao INT NULL;


INSERT INTO conta (nome, email, senha, data_nascimento, endereco, telefone)
VALUES ('Administrador do Sistema', 'admin@profission.com', '1234', '1990-01-01', 'Rua Principal, 100', '(11)99999-9999');

INSERT INTO usuario (tipo_usuario, id_conta)
VALUES ('adm', LAST_INSERT_ID());
