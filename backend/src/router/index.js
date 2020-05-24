import Router from 'koa-router';
import users from './users';
import auth from './auth';

const router = new Router();

router.use('/users', users.routes());
router.use('/auth', auth.routes());

router.get('/check', (ctx) => {
  console.log('avoiding cold start...');
  ctx.body = {
    version: '1.0.0',
    origin: ctx.origin,
    env: process.env.NODE_ENV,
  };
});

export default router;
