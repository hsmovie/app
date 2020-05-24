import Sequelize from 'sequelize';
import { User } from '../../db/models';

export const getUser = async (ctx, next) => {
  const { username } = ctx.params;
  try {
    const user = await User.findOne({
      where: { username },
    });
    if (!user) {
      ctx.status = 404;
      ctx.body = {
        name: 'USER_NOT_FOUND',
      };
      return;
    }
    ctx.selectedUser = user;
  } catch (e) {
    ctx.throw(500, e);
  }
  return next();
};

export const createUser = async (ctx, next) => {
  try {
    const { email, username } = ctx.request.body;
    await User.create({ email, username });
  } catch (e) {
    ctx.throw(e);
  }
};

export const getProfile = async (ctx) => {
  try {
    console.log(1, ctx.selectedUser.username);
  } catch (e) {
    ctx.throw(500, e);
  }
};
