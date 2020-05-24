import Sequelize from 'sequelize';
import db from '../db';
import UserProfile from './UserProfile';
import SocialAccount from './SocialAccount';

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

User.findUser = function (type, value) {
  return User.findOne({ where: { [type]: value } });
};

export default User;
