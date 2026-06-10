import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { PetPurchase } from "./pet-purchase.model";
import { Pet } from "../pets/pet.model";
import { CreatePetPurchaseDto } from "./dto/create-pet-purchase.dto";
import { UpdatePetPurchaseDto } from "./dto/update-pet-purchase.dto";
import { OrderStatus, EmailService } from "../email/email.service";

@Injectable()
export class PetPurchaseService {
  private readonly logger = new Logger(PetPurchaseService.name);

  constructor(
    @InjectModel(PetPurchase)
    private readonly petPurchaseModel: typeof PetPurchase,
    @InjectModel(Pet)
    private readonly petModel: typeof Pet,
    private readonly emailService: EmailService,
  ) {}

  async create(dto: CreatePetPurchaseDto): Promise<PetPurchase> {
    const pet = await this.petModel.findByPk(dto.petId);

    if (!pet) {
      throw new NotFoundException(`Pet with id "${dto.petId}" not found`);
    }

    try {
      const purchase = await this.petPurchaseModel.create(dto as any);

      // Send email after successful purchase creation
      try {
        if (purchase.email) {
          await this.emailService.sendOrderStatusEmail({
            orderId: purchase.id,
            customerName: purchase.fullName ?? "Customer",
            email: purchase.email,
            petName: pet.name,
            petBreed: pet.breed,
            status: OrderStatus[purchase.status], // or PurchaseStatus.PENDING
          });
        }
      } catch (emailError) {
        this.logger.error(
          `Failed to send order email for purchase ${purchase.id}`,
          emailError as Error,
        );
      }

      return purchase;
    } catch (error) {
      this.logger.error("Failed to create pet purchase", error as Error);
      throw new InternalServerErrorException("Could not create pet purchase");
    }
  }

  async findAll(): Promise<PetPurchase[]> {
    try {
      return await this.petPurchaseModel.findAll({
        include: [Pet],
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      this.logger.error("Failed to fetch pet purchases", error as Error);
      throw new InternalServerErrorException("Could not fetch pet purchases");
    }
  }

  async findOne(id: string): Promise<PetPurchase> {
    let pet: PetPurchase | null;
    try {
      pet = await this.petPurchaseModel.findByPk(id, { include: [Pet] });
    } catch (error) {
      this.logger.error(`Failed to fetch pet purchase ${id}`, error as Error);
      throw new InternalServerErrorException("Could not fetch pet purchase");
    }

    if (!pet) {
      throw new NotFoundException(`Pet purchase with id "${id}" not found`);
    }
    return pet;
  }

  async update(id: string, dto: UpdatePetPurchaseDto): Promise<PetPurchase> {
    const pet = await this.findOne(id);
    try {
      return await pet.update(dto as any);
    } catch (error) {
      this.logger.error(`Failed to update pet purchase ${id}`, error as Error);
      throw new InternalServerErrorException("Could not update pet purchase");
    }
  }

  async updateStatus(id: string, status: OrderStatus) {
    const petPurchase = await this.findOne(id);
    let updatedPurchase: PetPurchase;

    try {
      updatedPurchase = await petPurchase.update({ status });
    } catch (error) {
      this.logger.error(`Failed to update pet purchase ${id}`, error as Error);
      throw new InternalServerErrorException("Could not update pet purchase");
    }

    try {
      if (updatedPurchase.email && updatedPurchase.pet) {
        await this.emailService.sendOrderStatusEmail({
          orderId: updatedPurchase.id,
          customerName: updatedPurchase.fullName ?? "Customer",
          email: updatedPurchase.email,
          petName: updatedPurchase.pet.name,
          petBreed: updatedPurchase.pet.breed,
          status,
        });
      }
    } catch (error) {
      this.logger.error(
        `Failed to send order status email for purchase ${id}`,
        error as Error,
      );
    }

    return updatedPurchase;
  }

  async remove(id: string): Promise<{ id: string; deleted: true }> {
    const pet = await this.findOne(id);
    try {
      await pet.destroy();
      return { id, deleted: true };
    } catch (error) {
      this.logger.error(`Failed to delete pet purchase ${id}`, error as Error);
      throw new InternalServerErrorException("Could not delete pet purchase");
    }
  }
}
