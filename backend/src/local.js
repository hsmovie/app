import {} from 'dotenv/config';
import Server from './server';

const server = new Server();
server.listen(3000);
