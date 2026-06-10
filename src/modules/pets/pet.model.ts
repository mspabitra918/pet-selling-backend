import {
  Column,
  DataType,
  Model,
  Table,
  PrimaryKey,
  Default,
} from "sequelize-typescript";

export type Species = "dog" | "cat" | "bird";
export type Gender = "Male" | "Female";
export type Size = "Small" | "Medium" | "Large";
export type Availability = "Available" | "Pending" | "Sold";
export type Level = "Low" | "Moderate" | "High";
export type PetStatus = "NOT_AVAILABLE" | "AVAILABLE";
export type CoatType =
  | "Short Smooth Coat"
  | "Long Silky Coat"
  | "Double Coat"
  | "Curly Coat"
  | "Wirehaired"
  | "Hairless"
  | "Long Dense Coat";

export interface PetHealth {
  vaccinated?: boolean;
  dewormed?: boolean;
  microchipped?: boolean;
  vetChecked?: boolean;
  healthCertificate?: boolean;
  healthGuaranteeMonths?: number;
}

export interface PetParent {
  name: string;
  breed: string;
  weight?: string;
  registered: boolean;
  color?: string;
  eyeColor?: string;
}

export interface PetParents {
  sire: PetParent;
  dam: PetParent;
}

export interface DeliveryOptions {
  localPickup: boolean;
  airportDelivery: boolean;
  nationwideShipping: boolean;
}

export interface BreederInfo {
  name: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  responseTime: string;
}

export interface FeedingSchedule {
  mealsPerDay: number;
  foodType: string;
}

export interface TrainingInfo {
  crateTrained?: boolean;
  pottyTrainingStarted?: boolean;
  leashTrainingStarted?: boolean;
  litterTrained?: boolean;
  scratchingPostTrained?: boolean;
  socialized?: boolean;
}

@Table({ tableName: "pets", timestamps: true })
export class Pet extends Model<Pet> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  // ---- Core identity ----
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.ENUM("dog", "cat", "bird"), allowNull: false })
  declare species: Species;

  @Column({ type: DataType.STRING, allowNull: false })
  declare breed: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare ageLabel: string;

  @Column({ type: DataType.ENUM("Male", "Female"), allowNull: false })
  declare gender: Gender;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare ageWeeks: number;

  // ---- Physical attributes ----
  @Column({ type: DataType.STRING, allowNull: true })
  declare color?: string;

  @Column({ type: DataType.ENUM("Small", "Medium", "Large"), allowNull: true })
  declare size?: Size;

  @Column({ type: DataType.STRING, allowNull: true })
  declare weight?: string;

  @Column({
    type: DataType.ENUM(
      "Short Smooth Coat",
      "Long Silky Coat",
      "Double Coat",
      "Curly Coat",
      "Wirehaired",
      "Hairless",
      "Long Dense Coat",
    ),
    allowNull: true,
  })
  declare coatType?: CoatType;

  @Column({ type: DataType.STRING, allowNull: true })
  declare expectedAdultWeight?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare eyeColor?: string;

  // ---- Availability & pricing ----
  @Default("Available")
  @Column({
    type: DataType.ENUM("Available", "Pending", "Sold"),
    allowNull: false,
  })
  declare availability: Availability;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  declare originalPriceUsd: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  declare priceUsd: number;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: true })
  declare reserveAmount?: number;

  // ---- Descriptive text ----
  @Column({ type: DataType.TEXT, allowNull: true })
  declare description?: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare groomingNeeds?: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare exerciseNeeds?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare personalityType?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare favoriteToy?: string;

  // ---- Nested / JSON objects ----
  @Column({ type: DataType.JSONB, allowNull: true })
  declare health?: PetHealth;

  @Column({ type: DataType.JSONB, allowNull: true })
  declare parents?: PetParents;

  @Column({ type: DataType.JSONB, allowNull: true })
  declare deliveryOptions?: DeliveryOptions;

  @Column({ type: DataType.JSONB, allowNull: true })
  declare breeder?: BreederInfo;

  @Column({ type: DataType.JSONB, allowNull: true })
  declare feedingSchedule?: FeedingSchedule;

  @Column({ type: DataType.JSONB, allowNull: true })
  declare training?: TrainingInfo;

  // ---- Array fields ----
  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  declare traits?: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  declare included?: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  declare gallery?: string[];

  @Default([])
  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false })
  declare badges: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  declare temperament?: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: true })
  declare adoptionRequirements?: string[];

  // ---- Registration ----
  @Column({ type: DataType.STRING, allowNull: true })
  declare registeredOrganization?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare registrationNumber?: string;

  // ---- Ratings (1-5) ----
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare trainabilityRating?: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare friendlinessRating?: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare energyRating?: number;

  // ---- Compatibility flags ----
  @Column({ type: DataType.BOOLEAN, allowNull: true })
  declare goodWithKids?: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: true })
  declare goodWithDogs?: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: true })
  declare goodWithCats?: boolean;

  // ---- Behaviour levels ----
  @Column({ type: DataType.ENUM("Low", "Moderate", "High"), allowNull: true })
  declare activityLevel?: Level;

  @Column({ type: DataType.ENUM("Low", "Moderate", "High"), allowNull: true })
  declare barkingLevel?: Level;

  @Column({ type: DataType.ENUM("Low", "Moderate", "High"), allowNull: true })
  declare sheddingLevel?: Level;

  @Column({ type: DataType.ENUM("Low", "Moderate", "High"), allowNull: true })
  declare vocalLevel?: Level;

  // ---- Location ----
  @Column({ type: DataType.STRING, allowNull: false })
  declare city: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare region: string;

  @Default("CA")
  @Column({ type: DataType.STRING, allowNull: false })
  declare country: string;

  // ---- Media & breeder reference ----
  @Column({ type: DataType.STRING, allowNull: false })
  declare image: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare breederId: string;

  @Default(false)
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  declare featured: boolean;

  @Default("PENDING")
  @Column({
    type: DataType.ENUM(
      "PENDING",
      "PAID",
      "SHIPPED",
      "DELIVERED",
      "COMPLETED",
      "CANCELLED",
    ),
    allowNull: false,
  })
  declare status: PetStatus;
}
