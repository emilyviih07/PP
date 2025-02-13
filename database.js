const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'aluno',
    password: 'ifpecjbg', // coloque a senha do banco de dados
    database: 'pp_2a',
  },
});

module.exports = knex