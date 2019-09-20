import {
  IQueryResolvers,
  IMutationResolvers,
  IUserResolvers,
} from '../typings/graphql'
import { User } from '../db/models/User/User'

const queryResolver: IQueryResolvers = {
  user: async (obj, { id }, context, info) => User.findByPk(id),
  verifyToken: async (obj, { token }, context, info) => User.verifyToken(token),
}

const mutationResolver: IMutationResolvers = {
  register: async (obj, { email, password }, context, info) =>
    User.create({ email, password }),
  login: async (obj, { email, password }, context, info) =>
    User.login(email, password),
  logout: async (obj, { token }, context, info) => User.logout(token),
}

const userResolver: IUserResolvers = {} // will be important for federation later

export default {
  Query: queryResolver,
  Mutation: mutationResolver,
  User: userResolver,
}
