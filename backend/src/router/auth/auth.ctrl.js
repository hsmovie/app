import { User, UserProfile } from '../../db/models';
import Joi, { allow } from 'joi';

export const createLocalAccount = async (ctx) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    username: Joi.string().alphanum().min(3).max(20).required(),
  });
  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = {
      name: 'WRONG_SCHEMA',
      payload: result.error,
    };
    return;
  }
  const { email, password, username } = ctx.request.body;
  try {
    const [emailExists, usernameExists] = await Promise.all([
      User.getExistancy('email', email),
      User.getExistancy('usename', username),
    ]);
    // if (emailExists || usernameExists) {

    // }
    console.log(emailExists, usernameExists);
  } catch (e) {}
  try {
    const user = await User.build({
      username,
      email,
      passwordHash: await User.crypt(password),
    }).save();
    ctx.body = user.dataValues;
  } catch (e) {
    ctx.throw(500, e);
  }
};
