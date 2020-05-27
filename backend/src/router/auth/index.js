import Router from 'koa-router';
import * as authCtrl from './auth.ctrl';

const auth = new Router();
auth.post('/register/local', authCtrl.createLocalAccount);
auth.post('/login/local', authCtrl.localLogin);

export default auth;
