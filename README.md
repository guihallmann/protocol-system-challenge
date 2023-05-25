# Sistema de Protocolos

# Objetivo

Desenvolver um sistema de atendimento ao contribuinte , possibilitanto o cadastro dos mesmos e de protocolos com suas demandas, além da possibilidade de listar, editar e excluir ambos.

## Tecnologias utilizadas

Backend:

- Laravel (PHP)
- MySQL

Frontend:

- React (Typescript)
- Axios
- TailwindCSS

## Requisitos para rodar o projeto

Backend:

- PHP
- MySQL
- Composer (gerenciador de dependências PHP)

Frontend:

- Node
- NPM (gerenciador de pacotes Node)

## Como rodar:

```bash
git clone git@github.com:guihallmann/protocol-system-challenge.git
```

- Importar protocol_system.sql para o MySQL
- Backend:

```bash
cd server
```

```bash
composer install
```

```bash
php artisan migrate
```

```bash
php artisan serve
```

- Frontend:

```bash
npm install
```

```bash
npm run dev
```

## Melhorias:

- Validação de CPF e datas
- Paginação de resultados
- Responsividade
- Aumentar tratamento de erros
- Navegação UI/UX
- Maior componentização de elementos
