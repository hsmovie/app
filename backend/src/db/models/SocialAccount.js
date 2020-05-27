import Sequelize from 'sequelize';
import db from '../db';

const SocialAccount = db.define(
  'social_account',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    social_id: {
      type: Sequelize.STRING,
      unique: true,
    },
    access_token: {
      type: Sequelize.STRING,
    },
    provider: {
      type: Sequelize.STRING,
    },
  },
  {
    underscored: true,
  }
);

export default SocialAccount;
