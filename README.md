# Ecommerce Venda e Troca

Site ecommerce para venda e troca de produtos de tecnologia de forma rápida, otimizando seus custos com estruturas de trabalho.

## Estimativa de desenvolvimento

Estimativa em horas de desenvolvimento (disponibilidade de 20h/semana):

| Atividade                         | Estimativa       | Tarefa |
| --------------------------------- | ---------------- | ------ |
| Análise de escopo do sistema      | 02:00h           | #1     |
| Definição de stack e configuração | 01:00h           | #2     |
| Autenticação                      | 02:00h           | #3     |
| Gestão de Usuário                 | 02:00h           | #5     |
| Gestão de Negociação              | 02:00h           | #6     |
| Gestão de Oferta em negociação    | 02:00h           | #7     |
| Gestão de Mensagens               | 02:00h           | #8     |
| Gestão de Frete                   | 03:00h           | #9     |
| Convite                           | 02:00h           | #10    |
| ---                               | ---              | ---    |
| **Total de horas**                | **18:00h**       |
| **Estimativa de entrega**         | **4 dias úteis** |

## Install

### Pre-requisites

- docker
- docker-compose

### Starting the appication

Go to the root directory project:

```bash
docker-compose up -d
```

The services will be avaliable on:

- Database

  - Host: `localhost`
  - Port: `5440`
  - Database: `ecommerce`
  - User: `ecommerce-user`
  - Password: `RAnoP5244X9Aen5w8U6CKQ`
  - Database data: `~/postgres/ecommerce`

- Web server
  - URL: [localhost:9090](http://localhost:9090/)
  - user: `evertonpaiva`
  - password: `abc123-`
