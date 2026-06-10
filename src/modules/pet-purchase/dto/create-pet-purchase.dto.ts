import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import type { PurchaseStatus } from '../pet-purchase.model';

export class CreatePetPurchaseDto {
  // ---- Pet reference ----
  @IsUUID() declare petId: string;

  // ---- Buyer identity ----
  @IsOptional() @IsString() declare fullName?: string;
  @IsOptional() @IsString() declare address?: string;
  @IsOptional() @IsString() declare zipCode?: string;
  @IsOptional() @IsString() declare city?: string;
  @IsOptional() @IsString() declare state?: string;
  @IsOptional() @IsString() declare country?: string;
  @IsOptional() @IsEmail() declare email?: string;
  @IsOptional() @IsString() declare phoneNumber?: string;

  // ---- Purchase details ----
  @IsInt() @Min(1) declare quantity: number;
  @IsNumber() @Min(0) declare purchasePriceUsd: number;

  @IsOptional()
  @IsEnum(['PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'COMPLETED', 'CANCELLED'])
  status?: PurchaseStatus;
}
