'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const columns = await queryInterface.describeTable('users');
    if (!Object.prototype.hasOwnProperty.call(columns, 'two_factor_enabled')) {
      await queryInterface.addColumn('users', 'two_factor_enabled', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      });
    }
    if (!Object.prototype.hasOwnProperty.call(columns, 'settings')) {
      await queryInterface.addColumn('users', 'settings', {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: { emailNotifications: true, weeklySummary: true },
      });
    }
  },

  async down(queryInterface) {
    const columns = await queryInterface.describeTable('users');
    if (Object.prototype.hasOwnProperty.call(columns, 'settings')) {
      await queryInterface.removeColumn('users', 'settings');
    }
    if (Object.prototype.hasOwnProperty.call(columns, 'two_factor_enabled')) {
      await queryInterface.removeColumn('users', 'two_factor_enabled');
    }
  },
};