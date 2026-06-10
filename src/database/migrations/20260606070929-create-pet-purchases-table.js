

'use strict';



/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    const { DataTypes } = Sequelize;
   await queryInterface.createTable('pet_purchases', {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true,
        allowNull: false,
      },

      pet_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'pets', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },

      // ---- Core identity ----

      full_name: { type: DataTypes.STRING, allowNull: true },
      address: { type: DataTypes.STRING, allowNull: true },
      zip_code: { type: DataTypes.STRING, allowNull: true },
      city: { type: DataTypes.STRING, allowNull: true },
      state: { type: DataTypes.STRING, allowNull: true },
      country: { type: DataTypes.STRING, allowNull: true, defaultValue: 'CA' },
      email: { type: DataTypes.STRING, allowNull: true },
      phone_number: { type: DataTypes.STRING, allowNull: true },
      // ---- Purchase details ----
      quantity: { type: DataTypes.INTEGER, allowNull: false },
      purchase_price_usd: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      status: {
        type: DataTypes.ENUM('PENDING', 'PAID', "SHIPPED", 'DELIVERED', 'COMPLETED', 'CANCELLED'),
        allowNull: false,
        defaultValue: 'PENDING',
      },
      // ---- Timestamps ----
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addIndex('pet_purchases', ['pet_id']);
  },



  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('pet_purchases');

  },

};