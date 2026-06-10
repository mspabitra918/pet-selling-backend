import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op, WhereOptions } from "sequelize";
import { Pet } from "./pet.model";
import { CreatePetDto } from "./dto/create-pet.dto";
import { UpdatePetDto } from "./dto/update-pet.dto";

// UI bucket keys -> numeric range operators, kept in sync with the frontend
// priceFilters/ageFilters on browse-pets/page.tsx.
type RangeCondition = Record<symbol, number | number[]>;

const PRICE_RANGES: Record<string, RangeCondition> = {
  "under-2000": { [Op.lt]: 2000 },
  "2000-2500": { [Op.between]: [2000, 2500] },
  "above-2500": { [Op.gt]: 2500 },
};

const AGE_WEEK_RANGES: Record<string, RangeCondition> = {
  "8-weeks-or-younger": { [Op.lte]: 8 },
  "9-to-11-weeks": { [Op.between]: [9, 11] },
  "12-weeks-or-older": { [Op.gte]: 12 },
  "6-months-or-older": { [Op.gte]: 26 }, // ~26 weeks = 6 months
};

@Injectable()
export class PetService {
  private readonly logger = new Logger(PetService.name);

  constructor(
    @InjectModel(Pet)
    private readonly petModel: typeof Pet,
  ) {}

  async create(dto: CreatePetDto): Promise<Pet> {
    try {
      return await this.petModel.create(dto as any);
    } catch (error) {
      this.logger.error("Failed to create pet", error as Error);
      throw new InternalServerErrorException("Could not create pet");
    }
  }

  async findAll(filters: {
    name?: string;
    genders?: string[];
    species?: string[];
    priceBuckets?: string[];
    ageBuckets?: string[];
  }): Promise<Pet[]> {
    try {
      const and: WhereOptions[] = [];

      // Free-text search across name and breed.
      if (filters.name) {
        and.push({
          [Op.or]: [
            { name: { [Op.iLike]: `%${filters.name}%` } },
            { breed: { [Op.iLike]: `%${filters.name}%` } },
          ],
        });
      }

      // Multi-select: gender (Male/Female).
      if (filters.genders?.length) {
        and.push({ gender: { [Op.in]: filters.genders } });
      }

      // Multi-select: species. The column enum is lowercase (dog/cat/bird),
      // while the UI sends "Dog"/"Cat"/"Bird".
      if (filters.species?.length) {
        and.push({
          species: { [Op.in]: filters.species.map((v) => v.toLowerCase()) },
        });
      }

      // Price buckets -> OR of numeric ranges on priceUsd.
      const priceRanges = (filters.priceBuckets ?? [])
        .map((key) => PRICE_RANGES[key])
        .filter(Boolean);
      if (priceRanges.length) {
        and.push({ [Op.or]: priceRanges.map((range) => ({ priceUsd: range })) });
      }

      // Age buckets -> OR of numeric ranges on ageWeeks.
      const ageRanges = (filters.ageBuckets ?? [])
        .map((key) => AGE_WEEK_RANGES[key])
        .filter(Boolean);
      if (ageRanges.length) {
        and.push({ [Op.or]: ageRanges.map((range) => ({ ageWeeks: range })) });
      }

      const where: WhereOptions = and.length ? { [Op.and]: and } : {};

      return await this.petModel.findAll({
        where,
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      this.logger.error("Failed to fetch pets", error as Error);
      throw new InternalServerErrorException("Could not fetch pets");
    }
  }

  async findOne(id: string): Promise<Pet> {
    let pet: Pet | null;
    try {
      pet = await this.petModel.findByPk(id);
    } catch (error) {
      this.logger.error(`Failed to fetch pet ${id}`, error as Error);
      throw new InternalServerErrorException("Could not fetch pet");
    }

    if (!pet) {
      throw new NotFoundException(`Pet with id "${id}" not found`);
    }
    return pet;
  }

  async update(id: string, dto: UpdatePetDto): Promise<Pet> {
    const pet = await this.findOne(id);
    try {
      return await pet.update(dto as any);
    } catch (error) {
      this.logger.error(`Failed to update pet ${id}`, error as Error);
      throw new InternalServerErrorException("Could not update pet");
    }
  }

  async remove(id: string): Promise<{ id: string; deleted: true }> {
    const pet = await this.findOne(id);
    try {
      await pet.destroy();
      return { id, deleted: true };
    } catch (error) {
      this.logger.error(`Failed to delete pet ${id}`, error as Error);
      throw new InternalServerErrorException("Could not delete pet");
    }
  }
}
