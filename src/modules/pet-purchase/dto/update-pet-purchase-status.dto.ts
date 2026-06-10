import { IsEnum } from "class-validator";
import { OrderStatus } from "../../email/email.service";

export class UpdatePetPurchaseStatusDto {
  @IsEnum(OrderStatus)
  declare status: OrderStatus;
}
