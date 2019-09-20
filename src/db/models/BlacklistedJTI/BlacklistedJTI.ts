import {
  Table,
  Column,
  Model,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
  IsDate,
} from 'sequelize-typescript'
import jwt from 'jsonwebtoken'

@Table
export class BlacklistedJTI extends Model<BlacklistedJTI> {
  @PrimaryKey
  @Column
  jti!: string

  @IsDate
  @CreatedAt
  @Column
  createdAt!: Date

  @IsDate
  @UpdatedAt
  @Column
  updatedAt!: Date
}
