import { gql } from 'apollo-server-express'

export default gql`
  type Query {
    user(id: ID!): User
    verifyToken(token: String!): AuthUser
  }
  type Mutation {
    register(email: String!, password: String!): User
    login(email: String!, password: String!): User
    logout(token: String!): Boolean
  }
  type User {
    id: ID
    email: String
    isAdmin: Boolean
    createdAt: String
    updatedAt: String
  }
  type AuthUser {
    jti: ID
    id: ID
    isAdmin: Boolean
    iat: Int
    exp: Int
  }
`
