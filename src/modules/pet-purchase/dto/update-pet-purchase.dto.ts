import { PartialType } from '@nestjs/mapped-types';
import { CreatePetPurchaseDto } from './create-pet-purchase.dto';

export class UpdatePetPurchaseDto extends PartialType(CreatePetPurchaseDto) {}
