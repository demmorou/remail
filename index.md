<div align="center">
  <img src="https://img.shields.io/badge/Node.js-026e00?style=for-the-badge&logo=node&logoColor=white" />
  <img src="https://img.shields.io/badge/Typescript-3178c6?style=for-the-badge&logo=typescript&logoColor=white" />
</div>

<hr>

<br>

<h4 align="center">
  Aplicação de conhecimentos em Node.js e Redis para desenvolvimento de um microsserviço para envio de e-mails.
</h4>

<br>

## :gear: Arquitetura inicial

<img src="./docs/architecture.jpg"/>

<br>

## Executando o projeto

* Para clonar o projeto:
```console
deusimar@deusimar:~$ git clone https://github.com/deusimardamiao/remail.git
deusimar@deusimar:~$ cd remail/
```

* O gerenciador de pacotes utilizado neste projeto foi o [Yarn](https://yarnpkg.com/).

* Versão do [Node.js](https://nodejs.org/):
```console
deusimar@deusimar:~$ node -v
v14.17.1
```

* Para instalar as dependências:
```console
deusimar@deusimar:~$ yarn install
```

* É necessário se conectar a uma instância do [Redis](https://redis.io/). Recomendo fortemente o uso do [Docker](https://www.docker.com/) para criar 
uma instância na sua própria máquina. Com o docker instalado, basta executar o seguinte comando que estará criada a sua instância do banco de dados do Redis:

```console
deusimar@deusimar:~$ docker run --name redis -p 6379:6379 redis
```

* Configure o arquivo `.env`, nele estão algumas informações importantes para a aplicação iniciar e utilizar a instância do Redis. O arquivo `.env.example` adianta um pouco desse processo. Nesse caso, apenas o comando abaixo basta, caso você tenha uma instância do Redis executando em outro host ou com porta diferente, fique a vontade para alterar as informação dentro do seu arquivo `.env`, ele não é observado pelo git.
```console
deusimar@deusimar:~$ cp .env.example .env
```

* Após a execução dos passos anteriores, basta executar o comando:
```console
deusimar@deusimar:~$ yarn dev
$ tsnd --transpile-only --ignore-watch node_modules --respawn src/app.ts
[INFO] 19:51:06 ts-node-dev ver. 1.1.8 (using ts-node ver. 9.1.1, typescript ver. 4.4.3)
Redis poller started
Subscribed
```
