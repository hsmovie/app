import Koa from 'koa';
import router from './router';
import serverless from 'serverless-http';
import koaBody from 'koa-body';
import db from './db/db';
import dbSync from './db/sync';
import authToken from './lib/middlewares/authToken';

export default class Server {
  constructor() {
    this.app = new Koa();
    this.middleware();
    this.initializeDb();
    dbSync();
  }

  initializeDb() {
    db.authenticate().then(
      () => {
        console.log('DB Connection has been established');
      },
      (err) => {
        console.error('Unable to connect to the DB:', err);
      }
    );
  }

  ensureDb() {
    return new Promise((resolve, reject) => {
      let counter = 0;
      const tryConnect = async () => {
        try {
          await db.authenticate();
          resolve();
        } catch (e) {
          counter++;
          console.log(`db connection failed ${counter}`);
          if (counter > 5) {
            reject(new Error('Failed after 5 retries'));
            return;
          }
          setTimeout(tryConnect, 10);
        }
      };
      tryConnect();
    });
  }

  middleware() {
    const { app } = this;
    app.use(authToken);
    app.use(koaBody());
    app.use(router.routes()).use(router.allowedMethods());
    app.use(async (ctx, next) => {
      try {
        await this.ensureDb();
        return next();
      } catch (e) {
        ctx.throw(e);
      }
    });
  }

  listen(port) {
    const { app } = this;
    app.listen(port);
    console.log('Listening to port', port);
  }

  serverless() {
    const { app } = this;
    return serverless(app);
  }
}
