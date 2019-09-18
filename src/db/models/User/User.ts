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
  IsEmail,
  IsDate,
} from 'sequelize-typescript'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

@Table
export class User extends Model<User> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string

  @IsEmail
  @Unique
  @Column
  email!: string

  @Column
  password!: string

  @Default(false)
  @Column
  isAdmin!: boolean

  @IsDate
  @CreatedAt
  @Column
  createdAt!: Date

  @IsDate
  @UpdatedAt
  @Column
  updatedAt!: Date

  @BeforeCreate
  @BeforeUpdate
  static async hashSaltPassword(instance: User) {
    instance.password = await bcrypt.hash(instance.password, 10)
  }

  static async login(email: string, password: string): Promise<string | null> {
    const user = await this.findOne({ where: { email } })
    const isValidLogin = user && await user.comparePassword(password)
    return (user && isValidLogin) ? user.generateToken() : null
  }

  static async logout(userID: string) {
    return false
  }

  comparePassword(inputPassword: string) {
    return bcrypt.compare(inputPassword, this.password)
  }

  generateToken() {
    return jwt.sign({ user: { id: this.id }}, process.env.JWT_TOKEN_KEY)
  }
}
