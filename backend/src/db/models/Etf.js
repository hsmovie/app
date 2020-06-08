import Sequelize from 'sequelize';
import db from '../db';

const Etf = db.define(
  'etf',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    code: {
      type: Sequelize.STRING,
      unique: true,
      defaultValue: shortid.generate(),
    },
    email: {
      type: Sequelize.STRING,
    },
  },
  { underscored: true }
);

export default EmailAuth;
