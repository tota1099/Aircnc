# Aircnc - Backend

API Rest utilizada no projeto Airbnb.

Esta API foi desenvolvida na Semana OmniStack 9 feita pela [Rocketseat](https://rocketseat.com.br/).

## Dependências

- [yarn](https://yarnpkg.com/pt-BR/) - Gerenciador de dependências
- [docker](https://www.docker.com/) - Gerenciador de containers e encapsulador de aplicações

## Como rodar o projeto

### Criar pasta onde será armazeado os uploads

```sh
$ mkdir uploads && chmod 777 -R uploads
```

### Criar pasta onde será armazenado o banco de dados local (mongodb)

```sh
$ mkdir db_mongo && chmod 777 -R db_mongo
```

### Rodar o banco de dados mongodb no docker

```sh
$ docker run --name aircnc-mongo -p 27017:27017 -v $(pwd)/db_mongo:/data/db -d mongo:4.2.0
```

### Instalar dependências e rodar o projeto

```sh
$ yarn
$ yarn dev
```

## License

Este projeto está licenciado sob a licença MIT - consulte o arquivo [LICENSE.md](LICENSE.md) para obter mais detalhes.