import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  DataType,
  Default,
  BeforeCreate,
  BeforeUpdate,
  Unique,
} from 'sequelize-typescript'
import bcrypt from 'bcryptjs'

@Table
export class User extends Model<User> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string

  @Unique
  @Column
  email!: string

  @Column
  password!: string

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date

  @BeforeCreate
  @BeforeUpdate
  static async hashSaltPassword(instance: User) {
    instance.password = await bcrypt.hash(instance.password, 10)
  }
}
