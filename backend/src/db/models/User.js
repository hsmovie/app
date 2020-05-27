import Sequelize from 'sequelize';
import db from '../db';
import UserProfile from './UserProfile';
import SocialAccount from './SocialAccount';
import bcrypt from 'bcrypt';
import { generate } from '../../lib/token';

const User = db.define(
  'user',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password_hash: {
      type: Sequelize.STRING,
    },
    is_certified: {
      type: Sequelize.BOOLEAN,
    },
  },
  {
    indexes: [
      {
        fields: ['username'],
      },
      {
        fields: ['email'],
      },
    ],
    underscored: true,
  }
);

User.associate = function () {
  User.hasOne(UserProfile, { foreignKey: 'fk_user_id' });
  User.hasMany(SocialAccount, { foreignKey: 'fk_user_id' });
};

User.crypt = async function (password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

User.findUser = function (type, value) {
  return User.findOne({ where: { [type]: value } });
};

User.prototype.validatePassword = function (password) {
  console.log(password);
  const { password_hash } = this;
  return bcrypt.compareSync(password, password_hash);
};

User.prototype.generateToken = function () {
  const { id, username } = this;
  return generate({ id, username });
};

export default User;
