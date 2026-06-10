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
  Query,
  UseGuards,
} from "@nestjs/common";
import { PetService } from "./pet.service";
import { CreatePetDto } from "./dto/create-pet.dto";
import { UpdatePetDto } from "./dto/update-pet.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../auth/admin.guard";

const splitCsv = (value?: string): string[] =>
  value
    ? value
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean)
    : [];

@Controller("pets")
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreatePetDto) {
    return this.petService.create(dto);
  }

  @Get()
  findAll(
    @Query("name") name?: string,
    @Query("gender") gender?: string,
    @Query("species") species?: string,
    @Query("price") price?: string,
    @Query("age") age?: string,
  ) {
    // gender/species/price/age arrive as comma-separated lists, e.g.
    // ?gender=Male,Female&price=under-2000,above-2500
    return this.petService.findAll({
      name,
      genders: splitCsv(gender),
      species: splitCsv(species),
      priceBuckets: splitCsv(price),
      ageBuckets: splitCsv(age),
    });
  }

  @Get(":id")
  findOne(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.petService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(
    @Param("id", new ParseUUIDPipe()) id: string,
    @Body() dto: UpdatePetDto,
  ) {
    return this.petService.update(id, dto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  remove(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.petService.remove(id);
  }
}
