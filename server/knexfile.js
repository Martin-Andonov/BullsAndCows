// Update with your config settings.
import {config} from 'dotenv';
import { knexSnakeCaseMappers } from 'objection';
config();
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const knexConfig = {
  development:{
    client:'pg',
    connection:{
      host:process.env.DATABASE_HOST || '127.0.0.1',
      port:process.env.DATABASE_PORT || 5432,
      database:process.env.DATABASE_NAME || 'bulls_and_cows',
      user:process.env.DATABASE_USER || 'postgres',
      password:process.env.DATABASE_PASSWORD || 'postgres'
    },
    migrations:{
      directory: './migrations'

    },
    ...knexSnakeCaseMappers()
  }
};

export default knexConfig;

  