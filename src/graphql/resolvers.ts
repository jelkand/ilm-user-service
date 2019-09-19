import {
  IQueryResolvers,
  IMutationResolvers,
  IUserResolvers,
} from '../typings/graphql'
import { User } from '../db/models/User/User'

const queryResolver: IQueryResolvers = {
  user: async (obj, { id }, context, info) => User.findByPk(id),
}

const mutationResolver: IMutationResolvers = {
  register: async (obj, { email, password }, context, info) => User.create({ email, password }),
  login: async (obj, { email, password }, context, info) => User.login(email, password),
  logout: async (obj, { token }, context, info) => User.logout(token),
}

const userResolver: IUserResolvers = {
  token: async (user) => user.generateToken()
} // will be important for federation later

export default {
  Query: queryResolver,
  Mutation: mutationResolver,
  User: userResolver,
}
