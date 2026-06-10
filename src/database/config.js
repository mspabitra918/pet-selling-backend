// Sequelize CLI configuration. Loaded by sequelize-cli for migrations & seeders.
// Reads connection details from the project's .env file.
require('dotenv').config();

const common = {
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'pet_selling',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  dialect: process.env.DB_DIALECT || 'postgres',
  logging: process.env.DB_LOGGING === 'true' ? console.log : false,
};

module.exports = {
  development: { ...common },
  test: { ...common, database: `${common.database}_test` },
  production: {
    ...common,
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true'
        ? { require: true, rejectUnauthorized: false }
        : false,
    },
  },
};
