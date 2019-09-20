import { QueryInterface } from 'sequelize'

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: any) =>
    queryInterface.createTable('BlacklistedJTIs', {
      jti: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: async (queryInterface: QueryInterface) =>
    queryInterface.dropTable('BlacklistedJTIs'),
}
