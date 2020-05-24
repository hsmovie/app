import Sequelize from 'sequelize';
import db from '../db';

const UserProfile = db.define(
  'userProfile',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    displayName: {
      type: Sequelize.STRING,
    },
    shortBio: {
      type: Sequelize.STRING,
    },
  },
  {}
);

export default UserProfile;
