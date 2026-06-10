"use strict";

const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

// Default admin login:  email: pabitra@gmail.com   password: admin123
// The password MUST be stored hashed because login uses bcrypt.compare, and
// must be >= 6 chars to satisfy the login DTO validation.
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashed = bcrypt.hashSync("admin123", 10);
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: uuidv4(),
          full_name: "Pabitra Ghara",
          email: "pabitra@gmail.com",
          password: hashed,
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "users",
      { email: "pabitra@gmail.com" },
      {},
    );
  },
};
