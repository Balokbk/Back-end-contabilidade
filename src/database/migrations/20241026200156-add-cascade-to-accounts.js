'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('accounts', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'account_add_CASCADE',
      references:{
        table:'users',
        field: 'user_id'
      },
      onDelete: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('accounts', 'account_add_CASCADE');
  }
};
