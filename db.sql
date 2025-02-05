CREATE DATABASE pp_2a;

USE pp_2a;

CREATE TABLE usuarios (
	nome VARCHAR(50) NOT NULL DEFAULT '',
	email VARCHAR(50) NOT NULL DEFAULT '',
	senha VARCHAR(50) NOT NULL DEFAULT ''
);

CREATE TABLE gastos (
	descricao VARCHAR(50) NOT NULL,
	valor FLOAT NOT NULL,
	categoria VARCHAR(50) NOT NULL DEFAULT '',
	dono VARCHAR(50) NOT NULL DEFAULT ''
);

CREATE TABLE investimentos (
	dono VARCHAR(50) NOT NULL,
	nome VARCHAR(50) NOT NULL,
	valor FLOAT NOT NULL,
	data DATE NOT NULL
);