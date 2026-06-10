import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { PetPurchase } from '../modules/pet-purchase/pet-purchase.model';
import { Pet } from '../modules/pets/pet.model';

/**
 * Builds the Sequelize connection options for the NestJS runtime.
 * Schema changes are owned by sequelize-cli migrations, so `synchronize`
 * is intentionally disabled here.
 */
export const buildSequelizeOptions = (
  config: ConfigService,
): SequelizeModuleOptions => ({
  dialect: 'postgres',
  host: config.get<string>('DB_HOST', 'localhost'),
  port: config.get<number>('DB_PORT', 5432),
  username: config.get<string>('DB_USERNAME', 'postgres'),
  password: config.get<string>('DB_PASSWORD', 'Mspabitra1@'),
  database: config.get<string>('DB_NAME', 'pet_selling'),
  models: [Pet, PetPurchase],
  autoLoadModels: true,
  synchronize: false,
  logging: config.get<string>('DB_LOGGING') === 'true' ? console.log : false,
  // Cloud Postgres providers (Supabase, Neon, RDS, …) require SSL. Enable it
  // with DB_SSL=true. `rejectUnauthorized: false` accepts their managed certs.
  ...(config.get<string>('DB_SSL') === 'true'
    ? { dialectOptions: { ssl: { require: true, rejectUnauthorized: false } } }
    : {}),
});
