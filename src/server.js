import Koa from 'koa';
import router from './router';
import serverless from 'serverless-http';

export default class Server {
  app: Koa;
  constructor() {
    this.app = new Koa();
    this.middleware();
  }

  middleware(): void {
    const { app } = this;
    app.use(router.routes()).use(router.allowedMethods());
  }

  listen(port: number): void {
    const { app } = this;
    app.listen(port);
    console.log('Listening to port', port);
  }

  get serverless(): any {
    const { app } = this;
    return serverless(app);
  }
}
