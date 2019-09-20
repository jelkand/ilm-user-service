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
import uuid from 'uuid/v4'
import { JTIBlacklist } from '../JTIBlacklist/JTIBlacklist'
import { IAuthToken } from '../../../typings/authToken'

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
    const isValidLogin = user && (await user.comparePassword(password))
    return user && isValidLogin ? user.generateToken() : null
  }

  static async logout(token: string) {
    const { jti } = <IAuthToken>(
      jwt.verify(token, process.env.JWT_TOKEN_KEY, { ignoreExpiration: true })
    )
    JTIBlacklist.create({ jti })
    return null
  }

  comparePassword(inputPassword: string) {
    return bcrypt.compare(inputPassword, this.password)
  }

  generateToken() {
    return jwt.sign(
      { jti: uuid(), userId: this.id, isAdmin: this.isAdmin },
      process.env.JWT_TOKEN_KEY,
      { expiresIn: '1d' },
    )
  }

  static async verifyToken(token: string) {
    const authToken = <IAuthToken>jwt.verify(token, process.env.JWT_TOKEN_KEY)
    const isBlackListed = await JTIBlacklist.findByPk(authToken.jti)
    if (!!isBlackListed) {
      throw 'Token is blacklisted'
    }
    return authToken
  }
}
