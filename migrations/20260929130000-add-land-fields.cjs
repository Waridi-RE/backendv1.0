'use strict';

const landColumns = {
  land_size: (Sequelize) => ({ type: Sequelize.STRING, allowNull: true }),
  land_size_unit: (Sequelize) => ({ type: Sequelize.STRING, allowNull: true }),
  land_use: (Sequelize) => ({ type: Sequelize.STRING, allowNull: true }),
  title_deed_status: (Sequelize) => ({ type: Sequelize.STRING, allowNull: true }),
  land_price: (Sequelize) => ({ type: Sequelize.STRING, allowNull: true }),
  land_currency: (Sequelize) => ({ type: Sequelize.STRING, allowNull: true }),
  plot_number: (Sequelize) => ({ type: Sequelize.STRING, allowNull: true }),
  road_access: (Sequelize) => ({ type: Sequelize.STRING, allowNull: true }),
  utilities_available: (Sequelize) => ({ type: Sequelize.STRING, allowNull: true }),
};

module.exports = {
  async up(queryInterface, Sequelize) {
    const columns = await queryInterface.describeTable('properties');
    for (const [name, columnDefinition] of Object.entries(landColumns)) {
      if (!Object.prototype.hasOwnProperty.call(columns, name)) {
        await queryInterface.addColumn('properties', name, columnDefinition(Sequelize));
      }
    }
  },

  async down(queryInterface) {
    const columns = await queryInterface.describeTable('properties');
    for (const name of Object.keys(landColumns).reverse()) {
      if (Object.prototype.hasOwnProperty.call(columns, name)) {
        await queryInterface.removeColumn('properties', name);
      }
    }
  },
};