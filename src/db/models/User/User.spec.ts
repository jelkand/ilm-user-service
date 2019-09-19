import { Sequelize } from 'sequelize-typescript'
import jwt from 'jsonwebtoken'
import { User } from './User'
import { JTIBlacklist } from '../JTIBlacklist/JTIBlacklist'
import { IAuthToken } from '../../../typings/authToken'

describe('User', () => {
  beforeAll(async () => {
    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      models: [User, JTIBlacklist],
      logging: false,
    })
    await sequelize.sync()

    process.env.JWT_TOKEN_KEY = 'secret'
  })
  it('Should hash a password before saving it', async () => {
    const examplePass = 'password'
    const user = await User.create({
      email: 'email@example.com',
      password: examplePass,
    })
    expect(user.password).not.toBe(examplePass)
  })
  it('Should reject a user without a valid email', async () => {
    const createWithBadEmail = () =>
      User.create({ email: 'thisisntanemail', password: 'password' })
    expect(createWithBadEmail()).rejects.toThrow(
      'Validation error: Validation isEmail on email failed',
    )
  })
  it('Should reject a user creation with a duplicate email', async () => {
    await User.create({ email: 'unique@example.com', password: 'password' })
    const createDuplicateUser = () =>
      User.create({ email: 'unique@example.com', password: 'password' })
    expect(createDuplicateUser()).rejects.toThrow('Validation error')
  })
  it('Should generate a valid json web token', async () => {
    const user = await User.create({
      email: 'jwt@example.com',
      password: 'password',
    })
    const token = user.generateToken()
    expect(jwt.decode(token)).toMatchObject({
      user: {
        id: user.id,
      },
    })
  })
  it('Should log in an existing user and generate a token', async () => {
    const userInfo = { email: 'login@example.com', password: 'password' }
    const user = await User.create(userInfo)
    const token = await User.login(userInfo.email, userInfo.password)
    expect(token).not.toBe(null)
    token &&
      expect(jwt.decode(token)).toMatchObject({
        user: {
          id: user.id,
          isAdmin: user.isAdmin,
        },
      })
  })
  it('Should return null on a login for a non-existent user', async () => {
    const token = await User.login('idontexist@example.com', 'password')
    expect(token).toBe(null)
  })
  it('Should return null on a valid email and an incorrect password', async () => {
    const userInfo = { email: 'badPass@example.com', password: 'password' }
    await User.create(userInfo)
    const token = await User.login(userInfo.email, 'notMyPassword')
    expect(token).toBe(null)
  })
  it('Should blacklist a token on logout', async () => {
    const userInfo = { email: 'blacklist@example.com', password: 'password' }
    const user = await User.create(userInfo)
    const token = user.generateToken()
    token && User.logout(token)
    const decoded = token && <IAuthToken>jwt.decode(token)
    decoded && expect(await JTIBlacklist.findByPk(decoded.jti)).not.toBe(null)
  })
  it('Should return an auth token on verification', async () => {
    const userInfo = { email: 'verifiable@example.com', password: 'password' }
    const user = await User.create(userInfo)
    const token = user.generateToken()
    const verifiedToken = await User.verifyToken(token)
    expect(verifiedToken).toMatchObject({
      user: {
        id: user.id,
        isAdmin: user.isAdmin,
      },
    })
  })
  it('Should fail verification with a blacklisted token', async () => {
    const userInfo = { email: 'blacklist2@example.com', password: 'password' }
    const user = await User.create(userInfo)
    const token = user.generateToken()
    const decoded = token && <IAuthToken>jwt.decode(token)
    decoded && JTIBlacklist.create({ jti: decoded.jti })
    const verifyBadToken = () => User.verifyToken(token)
    expect(verifyBadToken()).rejects.toThrow()
  })
  it('Should fail verification with an incorrectly signed token', async () => {
    const token = jwt.sign({ somePayload: 'payload' }, 'bogusSecret')
    const verifyBogusToken = () => User.verifyToken(token)
    expect(verifyBogusToken()).rejects.toThrow()
  })
})
