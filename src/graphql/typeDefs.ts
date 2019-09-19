import { gql } from 'apollo-server-express'

export default gql`
  type Query {
    user(id: ID!): User
  }
  type Mutation {
    register(email: String!, password: String!): User
    login(email: String!, password: String!): User
    logout(token: String!): Boolean
  }
  type User {
    id: ID
    email: String
    createdAt: String
    updatedAt: String
    token: String
    password: String
  }
`
