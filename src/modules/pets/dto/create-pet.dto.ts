import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from "class-validator";
import type {
  Availability,
  CoatType,
  Gender,
  Level,
  PetStatus,
  Size,
  Species,
} from "../pet.model";

class HealthDto {
  @IsOptional() @IsBoolean() vaccinated?: boolean;
  @IsOptional() @IsBoolean() dewormed?: boolean;
  @IsOptional() @IsBoolean() microchipped?: boolean;
  @IsOptional() @IsBoolean() vetChecked?: boolean;
  @IsOptional() @IsBoolean() healthCertificate?: boolean;
  @IsOptional() @IsInt() healthGuaranteeMonths?: number;
}

class ParentDto {
  @IsOptional() @IsString() declare name: string;
  @IsString() declare breed: string;
  @IsOptional() @IsString() declare weight?: string;
  @IsOptional() @IsBoolean() declare registered?: boolean;
  @IsOptional() @IsString() declare color?: string;
  @IsOptional() @IsString() declare eyeColor?: string;
}

class ParentsDto {
  @ValidateNested() @Type(() => ParentDto) declare sire: ParentDto;
  @ValidateNested() @Type(() => ParentDto) declare dam: ParentDto;
}

class DeliveryOptionsDto {
  @IsBoolean() declare localPickup: boolean;
  @IsBoolean() declare airportDelivery: boolean;
  @IsBoolean() declare nationwideShipping: boolean;
}

class BreederDto {
  @IsString() declare name: string;
  @IsNumber() declare experienceYears: number;
  @IsNumber() declare rating: number;
  @IsInt() declare reviewCount: number;
  @IsOptional() @IsString() declare responseTime?: string;
}

class FeedingScheduleDto {
  @IsInt() declare mealsPerDay: number;
  @IsString() declare foodType: string;
}

class TrainingDto {
  @IsOptional() @IsBoolean() declare crateTrained?: boolean;
  @IsOptional() @IsBoolean() declare pottyTrainingStarted?: boolean;
  @IsOptional() @IsBoolean() declare leashTrainingStarted?: boolean;
  @IsOptional() @IsBoolean() declare litterTrained?: boolean;
  @IsOptional() @IsBoolean() declare scratchingPostTrained?: boolean;
  @IsOptional() @IsBoolean() declare socialized?: boolean;
}

export class CreatePetDto {
  // ---- Core identity ----
  @IsString() declare name: string;
  @IsEnum(["dog", "cat", "bird"]) declare species: Species;
  @IsString() declare breed: string;
  @IsString() declare ageLabel: string;
  @IsEnum(["Male", "Female"]) declare gender: Gender;
  @IsInt() @Min(0) declare ageWeeks: number;

  // ---- Physical attributes ----
  @IsOptional() @IsString() declare color?: string;
  @IsOptional() @IsEnum(["Small", "Medium", "Large"]) declare size?: Size;
  @IsOptional() @IsString() declare weight?: string;
  @IsOptional()
  @IsEnum([
    "Short Smooth Coat",
    "Long Silky Coat",
    "Double Coat",
    "Curly Coat",
    "Wirehaired",
    "Hairless",
    "Long Dense Coat",
  ])
  coatType?: CoatType;
  @IsOptional() @IsString() expectedAdultWeight?: string;
  @IsOptional() @IsString() eyeColor?: string;

  // ---- Availability & pricing ----
  @IsOptional()
  @IsEnum(["Available", "Pending", "Sold"])
  availability?: Availability;
  @IsNumber() @Min(0) declare originalPriceUsd: number;
  @IsNumber() @Min(0) declare priceUsd: number;
  @IsOptional() @IsNumber() @Min(0) reserveAmount?: number;

  // ---- Descriptive text ----
  @IsOptional() @IsString() declare description?: string;
  @IsOptional() @IsString() declare groomingNeeds?: string;
  @IsOptional() @IsString() declare exerciseNeeds?: string;
  @IsOptional() @IsString() declare personalityType?: string;
  @IsOptional() @IsString() declare favoriteToy?: string;

  // ---- Nested / JSON objects ----
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => HealthDto)
  health?: HealthDto;
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ParentsDto)
  parents?: ParentsDto;
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => DeliveryOptionsDto)
  deliveryOptions?: DeliveryOptionsDto;
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => BreederDto)
  breeder?: BreederDto;
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => FeedingScheduleDto)
  feedingSchedule?: FeedingScheduleDto;
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => TrainingDto)
  training?: TrainingDto;

  // ---- Array fields ----
  @IsOptional() @IsArray() @IsString({ each: true }) traits?: string[];
  @IsOptional() @IsArray() @IsString({ each: true }) included?: string[];
  @IsOptional() @IsArray() @IsString({ each: true }) gallery?: string[];
  @IsOptional() @IsArray() @IsString({ each: true }) badges?: string[];
  @IsOptional() @IsArray() @IsString({ each: true }) temperament?: string[];
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  adoptionRequirements?: string[];

  // ---- Registration ----
  @IsOptional() @IsString() registeredOrganization?: string;
  @IsOptional() @IsString() registrationNumber?: string;

  // ---- Ratings (1-5) ----
  @IsOptional() @IsInt() @Min(1) @Max(5) trainabilityRating?: number;
  @IsOptional() @IsInt() @Min(1) @Max(5) friendlinessRating?: number;
  @IsOptional() @IsInt() @Min(1) @Max(5) energyRating?: number;

  // ---- Compatibility flags ----
  @IsOptional() @IsBoolean() goodWithKids?: boolean;
  @IsOptional() @IsBoolean() goodWithDogs?: boolean;
  @IsOptional() @IsBoolean() goodWithCats?: boolean;

  // ---- Behaviour levels ----
  @IsOptional() @IsEnum(["Low", "Moderate", "High"]) activityLevel?: Level;
  @IsOptional() @IsEnum(["Low", "Moderate", "High"]) barkingLevel?: Level;
  @IsOptional() @IsEnum(["Low", "Moderate", "High"]) sheddingLevel?: Level;
  @IsOptional() @IsEnum(["Low", "Moderate", "High"]) vocalLevel?: Level;

  // ---- Location ----
  @IsString() declare city: string;
  @IsString() declare region: string;
  @IsOptional() @IsString() declare country?: string;

  // ---- Media & breeder reference ----
  @IsString() declare image: string;
  @IsString() declare breederId: string;
  @IsOptional() @IsBoolean() declare featured?: boolean;

  @IsOptional()
  @IsEnum(["AVAILABLE", "NOT_AVAILABLE"])
  status?: PetStatus;
}
