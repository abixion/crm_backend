import * as dotenv from 'dotenv';

dotenv.config();
const db = {
  DATABASE_USERNAME: process.env.DATABASE_USERNAME ?? '',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD ?? '',
  DATABASE_CLUSTER: process.env.DATABASE_CLUSTER ?? '',
};

export const jwtConfig = {
  secret: process.env.JWT_SECRET ?? '',
};

export default db;
