import { Sequelize } from 'sequelize-typescript'
import jwt from 'jsonwebtoken'
import { JTIBlacklist } from './JTIBlacklist'

describe('JTIBlacklist', () => {
  // beforeAll(async () => {
  //   const sequelize = new Sequelize({
  //     dialect: 'sqlite',
  //     storage: ':memory:',
  //     models: [JTIBlacklist],
  //     logging: false,
  //   });
  //   await sequelize.sync();
  //   process.env.JWT_TOKEN_KEY = 'secret'
  // })
  it('Should have a unit test', () => {
    expect(true).toBe(true)
  })
})
