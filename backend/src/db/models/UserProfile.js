import Sequelize from 'sequelize';
import db from '../db';

const UserProfile = db.define(
  'user_profile',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true,
    },
    display_name: {
      type: Sequelize.STRING,
    },
    short_bio: {
      type: Sequelize.STRING,
    },
  },
  { underscored: true }
);

export default UserProfile;
