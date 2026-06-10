import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { PetPurchaseService } from "./pet-purchase.service";
import { CreatePetPurchaseDto } from "./dto/create-pet-purchase.dto";
import { UpdatePetPurchaseDto } from "./dto/update-pet-purchase.dto";
import { UpdatePetPurchaseStatusDto } from "./dto/update-pet-purchase-status.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";

@Controller("pet-purchases")
export class PetPurchaseController {
  constructor(private readonly petPurchaseService: PetPurchaseService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreatePetPurchaseDto) {
    return this.petPurchaseService.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    return this.petPurchaseService.findAll();
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  findOne(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.petPurchaseService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(
    @Param("id", new ParseUUIDPipe()) id: string,
    @Body() dto: UpdatePetPurchaseDto,
  ) {
    return this.petPurchaseService.update(id, dto);
  }

  @Patch(":id/status")
  @UseGuards(JwtAuthGuard, RolesGuard)
  updateStatus(
    @Param("id", new ParseUUIDPipe()) id: string,
    @Body() dto: UpdatePetPurchaseStatusDto,
  ) {
    return this.petPurchaseService.updateStatus(id, dto.status);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.petPurchaseService.remove(id);
  }
}
