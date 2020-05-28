import Koa from 'koa';
import KoaBody from 'koa-body';
import bcrypt from 'bcryptjs';

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'Hello World';
});

app.listen(3000);
