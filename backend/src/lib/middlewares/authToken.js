import { decode } from '../token';

export default async (ctx, next) => {
  const token = ctx.cookies.get('access_token');

  if (!token) {
    ctx.user = null;
    return next();
  }

  try {
    const decoded = await decode(token);
    const { user, exp } = decoded;
    ctx.user = user;
    ctx.tokenExpire = exp;
  } catch (e) {
    ctx.user = null;
  }
  return next();
};
