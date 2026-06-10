import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { buildSequelizeOptions } from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { PetModule } from './modules/pets/pet.module';
import { PetPurchaseModule } from './modules/pet-purchase/pet-purchase.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => buildSequelizeOptions(config),
    }),
    AuthModule,
    PetModule,
    PetPurchaseModule,
    UploadModule,
  ],
})
export class AppModule {}
