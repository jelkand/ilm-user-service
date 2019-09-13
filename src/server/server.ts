import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildFederatedSchema } from '@apollo/federation'
import { sequelize as db } from 'db/sequelize'
import typeDefs from '../graphql/typeDefs'
import resolvers from '../graphql/resolvers'
;(async () => {
  await db.sync()
  const server = new ApolloServer({
    schema: buildFederatedSchema([{ typeDefs, resolvers }]),
    context: { db },
  })

  const app = express()
  const port = process.env.port || 3000

  server.applyMiddleware({ app })

  app.listen(port, () =>
    console.log(`Typescript template app listening on port ${port}!`),
  )
})()