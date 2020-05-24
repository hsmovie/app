import Sequelize from 'sequelize';
import db from '../db';

const SocialAccount = db.define('socialAccount', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true,
  },
  socialId: {
    type: Sequelize.STRING,
    unique: true,
  },
  accessToken: {
    type: Sequelize.STRING,
  },
  provider: {
    type: Sequelize.STRING,
  },
});

export default SocialAccount;
