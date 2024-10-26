'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      transaction_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.ENUM('income', 'expense')
      },
      account_id:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'accounts', key: 'account_id'}
      },
      amount: {
        type: Sequelize.DECIMAL(15,2)
      },
      description: {
        type: Sequelize.STRING
      },
      transaction_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('CURRENT_TIMESTAMP')
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  }
};