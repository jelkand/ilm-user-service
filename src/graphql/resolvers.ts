import bcrypt from 'bcryptjs'
import { ApolloError } from 'apollo-server-core'
import {
  IQueryResolvers,
  IMutationResolvers,
  IUserResolvers,
} from '../typings/graphql'
import { User } from '../db/models/User'

const queryResolver: IQueryResolvers = {
  user: async (obj, { id }, context, info) => User.findByPk(id),
}

const mutationResolver: IMutationResolvers = {
  register: async (obj, { email, password }, context, info) => {
    const existingUser = await User.findOne({ where: { email } })
    if (existingUser) throw new ApolloError('Resource already exists')
    return await User.create({ email, password })
  },
  login: async (obj, { email, password }, context, info) => {
    const candidateUser = await User.findOne({ where: { email } })
    const candidatePass = candidateUser && candidateUser.password
    const passwordsMatch =
      !!candidatePass && (await bcrypt.compare(password, candidatePass))
    return passwordsMatch ? candidateUser : null
  },
  logout: async (obj, args, context, info) => false,
}

const userResolver: IUserResolvers = {} // will be important for federation later

export default {
  Query: queryResolver,
  Mutation: mutationResolver,
  User: userResolver,
}
