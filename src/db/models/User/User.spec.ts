import { Sequelize } from 'sequelize-typescript';
import jwt from 'jsonwebtoken'
import { User } from './User'

describe('User', () => {
  beforeAll(async () => {
    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      models: [User],
      logging: false,
    });
    await sequelize.sync();

    process.env.JWT_TOKEN_KEY = 'secret'
  })
  it('Should hash a password before saving it', async () => {
    const examplePass = 'password';
    const user = await User.create({ email: 'email@example.com', password: examplePass })
    expect(user.password).not.toBe(examplePass)
  })
  it('Should reject a user without a valid email', async () => {
    const createWithBadEmail = () => User.create({ email: 'thisisntanemail', password: 'password' })
    expect(createWithBadEmail()).rejects.toThrow('Validation error: Validation isEmail on email failed')
  })
  it('Should reject a user creation with a duplicate email', async () => {
    await User.create({ email: 'unique@example.com', password: 'password' })
    const createDuplicateUser = () => User.create({ email: 'unique@example.com', password: 'password' });
    expect(createDuplicateUser()).rejects.toThrow('Validation error')
  })
  it('Should generate a valid json web token', async () => {
    const user = await User.create({ email: 'jwt@example.com', password: 'password' })
    const token = user.generateToken();
    expect(jwt.decode(token)).toMatchObject({
      user: {
        id: user.id
      }
    })
  })
  it('Should log in an existing user and generate a token', async () => {
    const userInfo = { email: 'login@example.com', password: 'password' }
    const user = await User.create(userInfo)
    const token = await User.login(userInfo.email, userInfo.password)
    expect(token).not.toBe(null)
    token && expect(jwt.decode(token)).toMatchObject({
      user: {
        id: user.id
      }
    })
  })
  it('Should return null on a login for a non-existent user', async () => {
    const token = await User.login('idontexist@example.com', 'password')
    expect(token).toBe(null)
  })
  it('Should return null on a valid email and an incorrect password', async () => {
    const userInfo = { email: 'badPass@example.com', password: 'password' }
    const user = await User.create(userInfo)
    const token = await User.login(userInfo.email, 'notMyPassword')
    expect(token).toBe(null)
  })
})