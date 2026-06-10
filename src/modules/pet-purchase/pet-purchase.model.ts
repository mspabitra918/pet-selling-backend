import {
  Column,
  DataType,
  Model,
  Table,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Pet } from '../pets/pet.model';

export type PurchaseStatus =
  | 'PENDING'
  | 'PAID'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'COMPLETED'
  | 'CANCELLED';

@Table({ tableName: 'pet_purchases', timestamps: true })
export class PetPurchase extends Model<PetPurchase> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  // ---- Pet reference (FK -> pets.id) ----
  @ForeignKey(() => Pet)
  @Column({ type: DataType.UUID, allowNull: false, field: 'pet_id' })
  declare petId: string;

  @BelongsTo(() => Pet)
  declare pet?: Pet;

  // ---- Buyer identity ----
  @Column({ type: DataType.STRING, allowNull: true, field: 'full_name' })
  declare fullName?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare address?: string;

  @Column({ type: DataType.STRING, allowNull: true, field: 'zip_code' })
  declare zipCode?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare city?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare state?: string;

  @Default('CA')
  @Column({ type: DataType.STRING, allowNull: true })
  declare country?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare email?: string;

  @Column({ type: DataType.STRING, allowNull: true, field: 'phone_number' })
  declare phoneNumber?: string;

  // ---- Purchase details ----
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare quantity: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    field: 'purchase_price_usd',
  })
  declare purchasePriceUsd: number;

  @Default('PENDING')
  @Column({
    type: DataType.ENUM(
      'PENDING',
      'PAID',
      'SHIPPED',
      'DELIVERED',
      'COMPLETED',
      'CANCELLED',
    ),
    allowNull: false,
  })
  declare status: PurchaseStatus;
}
