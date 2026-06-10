// Sequelize CLI configuration. Loaded by sequelize-cli for migrations & seeders.
// Reads connection details from the project's .env file.
require('dotenv').config();

// SSL is required by cloud Postgres providers (Neon, Supabase, RDS, …).
// Enabled automatically when a DATABASE_URL is present, or when DB_SSL=true.
const useSsl =
  !!process.env.DATABASE_URL || process.env.DB_SSL === 'true';

const ssl = useSsl
  ? { ssl: { require: true, rejectUnauthorized: false } }
  : {};

// Base config. When DATABASE_URL is set (e.g. a Neon connection string) the
// CLI connects via that URL; otherwise it falls back to discrete DB_* vars.
// `dialect` must always be supplied explicitly (Sequelize v4+ requirement).
const base = process.env.DATABASE_URL
  ? {
      use_env_variable: 'DATABASE_URL',
      dialect: 'postgres',
      dialectOptions: { ...ssl },
      logging: process.env.DB_LOGGING === 'true' ? console.log : false,
    }
  : {
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'pet_selling',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      dialect: process.env.DB_DIALECT || 'postgres',
      dialectOptions: { ...ssl },
      logging: process.env.DB_LOGGING === 'true' ? console.log : false,
    };

module.exports = {
  development: { ...base },
  test: { ...base },
  production: { ...base },
};
