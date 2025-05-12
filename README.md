## Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node](https://nodejs.org/en/)
- [Nestjs](https://nestjs.com)

## Como executar

Clone o projeto e acesse a pasta do mesmo.

```bash
$ git clone https://github.com/giaanl/movie-list-api.git
$ cd movie-list-api
```

Para iniciá-lo, siga os passos abaixo:

```bash
# subir o banco no docker
$ docker run --name postgres_container -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=postgres -p 5432:5432 -d postgres
```

O server irá subir na porta http://localhost:3400.

Vale lembrar que você deve configurar .env como o .env.sample
