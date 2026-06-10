import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { PetPurchase } from "./pet-purchase.model";
import { Pet } from "../pets/pet.model";
import { PetPurchaseService } from "./pet-purchase.service";
import { PetPurchaseController } from "./pet-purchase.controller";
import { EmailModule } from "../email/email.module";

@Module({
  imports: [SequelizeModule.forFeature([PetPurchase, Pet]), EmailModule],
  controllers: [PetPurchaseController],
  providers: [PetPurchaseService],
  exports: [PetPurchaseService],
})
export class PetPurchaseModule {}
