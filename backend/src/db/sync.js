import db from './db';
import { User, UserProfile } from './models';
export function associate() {
  User.associate();
}

export default function sync() {
  console.log('sync');
  associate();
  db.sync();
}
