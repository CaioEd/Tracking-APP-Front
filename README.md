# Sistema de rastreamento de veículos

## Descrição

Repositório do Next.js (front-end da aplicação).
Os dados vem da API - https://github.com/CaioEd/Tracking-API

## Requerimentos

A aplicação tem integração com a API do Google Maps, para isso, é necessário criar uma chave de API no Google Cloud Platform. Siga os seguintes passos:

1. Acesse o [Google Cloud Platform](https://cloud.google.com/)
2. Vá até o console.
3. Crie um novo projeto.
4. Ative a API do Places, Directions e Maps JavaScript do Google Maps.
5. Guarde a chave de API gerada.

OBS: Embora o Google forneça um crédito gratuito mensal de US$ 200, é necessário cadastrar um cartão de crédito para ativar essas APIs.
Você só será cobrado se ultrapassar esse valor, e é possível configurar alertas e limites de uso na sua conta para evitar cobranças inesperadas.

## Rodar a aplicação

Gere o arquivo `.env` através do comando:

```
cp .env.example .env
```

Instale as dependências:

```bash
npm install
```

Rode o servidor:

```bash
npm run dev
```

## Comunicação da aplicação
![tracking](https://github.com/user-attachments/assets/cabd1133-d97c-4c42-8d9b-62a9b116fc77)


## Software
- Next JS
- Typescript
- Tailwind 
- API Google Maps