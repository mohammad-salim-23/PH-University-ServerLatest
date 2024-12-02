import dotenv from 'dotenv';
import path from 'path';

// require('dotenv').config({ path: '/custom/path/to/.env' })
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_round:process.env.BCRYPT_SALT_ROUNDS,
  default_pass:process.env.DEFAULT_PASS
};
