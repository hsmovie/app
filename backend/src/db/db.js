const Sequelize = require('sequelize');

const host = 'app.cwnaw41de8hl.ap-northeast-2.rds.amazonaws.com';
const db = new Sequelize('app', 'root', '4434194aA!', {
  host,
  dialect: 'postgres',
});

export default db;
