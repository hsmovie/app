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
      User.findUser('email', email),
      User.findUser('username', username),
    ]);
    if (emailExists || usernameExists) {
      ctx.status = 409;
      ctx.body = {
        name: 'DUPLICATED_ACCOUNT',
        payload: emailExists ? 'email' : 'username',
      };
      return;
    }
  } catch (e) {
    console.log(e);
  }
  try {
    const user = await User.build({
      username,
      email,
      password_hash: await User.crypt(password),
    }).save();

    const userProfile = await UserProfile.build({
      fk_user_id: user.id,
    }).save();

    const token = await user.generateToken();

    ctx.cookies.set('access_token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    ctx.body = {
      user: {
        id: user.id,
        username: user.username,
      },
      token,
    };
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const localLogin = async (ctx) => {
  const { email, username, password } = ctx.request.body;
  if (!(email || username)) {
    ctx.status = 400;
    ctx.body = {
      name: 'LOGIN_FAILURE',
    };
    return;
  }
  const schema = Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().min(6).required(),
    username: Joi.string().alphanum().min(3).max(20),
  });
  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 401;
    ctx.body = {
      name: 'LOGIN_FAILURE',
    };
    return;
  }
  try {
    const value = email ? email : username;
    const type = email ? 'email' : 'username';
    const user = await User.findUser(type, value);
    if (!user) {
      ctx.status = 401;
      ctx.body = {
        name: 'LOGIN_FAILURE',
      };
      return;
    }

    const validated = await user.validatePassword(password);
    if (!validated) {
      ctx.status = 401;
      ctx.body = {
        name: 'LOGIN_FAILURE',
      };
      return;
    }
    const token = await user.generateToken();

    ctx.cookies.set('access_token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    ctx.body = {
      user: {
        id: user.id,
        username: user.username,
      },
      token,
    };
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const check = async (ctx) => {
  ctx.body = ctx.user;
};
