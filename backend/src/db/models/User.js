import Sequelize from 'sequelize';
import db from '../db';
import UserProfile from './UserProfile';
import SocialAccount from './SocialAccount';
import bcrypt from 'bcrypt';

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
    passwordHash: {
      type: Sequelize.STRING,
    },
    isCertified: {
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
  }
);

User.associate = function () {
  User.hasOne(UserProfile, { foreignKey: 'fkUserId' });
  User.hasMany(SocialAccount, { foreignKey: 'fkUserId' });
};

User.crypt = async function (password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

User.getExistancy = function (type, value) {
  return User.findOne({ [type]: value });
};

User.findUser = function (type, value) {
  return User.findOne({ where: { [type]: value } });
};

export default User;
