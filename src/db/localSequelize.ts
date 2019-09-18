import {Sequelize} from 'sequelize-typescript';

// in-memory sqlite database for tests.
// should work fine unless I rely on postgres specific features

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  models: [`${__dirname}/models`],
  logging: false,
});