"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { DataTypes } = Sequelize;

    await queryInterface.createTable("pets", {
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        primaryKey: true,
        allowNull: false,
      },

      // ---- Core identity ----
      name: { type: DataTypes.STRING, allowNull: false },
      species: {
        type: DataTypes.ENUM("dog", "cat", "bird"),
        allowNull: false,
      },
      breed: { type: DataTypes.STRING, allowNull: false },
      ageLabel: { type: DataTypes.STRING, allowNull: false },
      gender: {
        type: DataTypes.ENUM("Male", "Female"),
        allowNull: false,
      },
      ageWeeks: { type: DataTypes.INTEGER, allowNull: false },

      // ---- Physical attributes ----
      color: { type: DataTypes.STRING, allowNull: true },
      size: {
        type: DataTypes.ENUM("Small", "Medium", "Large"),
        allowNull: true,
      },
      weight: { type: DataTypes.STRING, allowNull: true },
      coatType: {
        type: DataTypes.ENUM(
          "Short Smooth Coat",
          "Long Silky Coat",
          "Double Coat",
          "Curly Coat",
          "Wirehaired",
          "Hairless",
          "Long Dense Coat",
        ),
        allowNull: true,
      },
      expectedAdultWeight: { type: DataTypes.STRING, allowNull: true },
      eyeColor: { type: DataTypes.STRING, allowNull: true },

      // ---- Availability & pricing ----
      availability: {
        type: DataTypes.ENUM("Available", "Pending", "Sold"),
        allowNull: false,
        defaultValue: "Available",
      },
      originalPriceUsd: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      priceUsd: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      reserveAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: true },

      // ---- Descriptive text ----
      description: { type: DataTypes.TEXT, allowNull: true },
      groomingNeeds: { type: DataTypes.TEXT, allowNull: true },
      exerciseNeeds: { type: DataTypes.TEXT, allowNull: true },
      personalityType: { type: DataTypes.STRING, allowNull: true },
      favoriteToy: { type: DataTypes.STRING, allowNull: true },

      // ---- Nested / JSON objects ----
      health: { type: DataTypes.JSONB, allowNull: true },
      parents: { type: DataTypes.JSONB, allowNull: true },
      deliveryOptions: { type: DataTypes.JSONB, allowNull: true },
      breeder: { type: DataTypes.JSONB, allowNull: true },
      feedingSchedule: { type: DataTypes.JSONB, allowNull: true },
      training: { type: DataTypes.JSONB, allowNull: true },

      // ---- Array fields ----
      traits: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
      included: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
      gallery: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
      badges: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
      },
      temperament: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
      adoptionRequirements: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },

      // ---- Registration ----
      registeredOrganization: { type: DataTypes.STRING, allowNull: true },
      registrationNumber: { type: DataTypes.STRING, allowNull: true },

      // ---- Ratings (1-5) ----
      trainabilityRating: { type: DataTypes.INTEGER, allowNull: true },
      friendlinessRating: { type: DataTypes.INTEGER, allowNull: true },
      energyRating: { type: DataTypes.INTEGER, allowNull: true },

      // ---- Compatibility flags ----
      goodWithKids: { type: DataTypes.BOOLEAN, allowNull: true },
      goodWithDogs: { type: DataTypes.BOOLEAN, allowNull: true },
      goodWithCats: { type: DataTypes.BOOLEAN, allowNull: true },

      // ---- Behaviour levels ----
      activityLevel: {
        type: DataTypes.ENUM("Low", "Moderate", "High"),
        allowNull: true,
      },
      barkingLevel: {
        type: DataTypes.ENUM("Low", "Moderate", "High"),
        allowNull: true,
      },
      sheddingLevel: {
        type: DataTypes.ENUM("Low", "Moderate", "High"),
        allowNull: true,
      },
      vocalLevel: {
        type: DataTypes.ENUM("Low", "Moderate", "High"),
        allowNull: true,
      },

      // ---- Location ----
      city: { type: DataTypes.STRING, allowNull: false },
      region: { type: DataTypes.STRING, allowNull: false },
      country: { type: DataTypes.STRING, allowNull: false, defaultValue: "CA" },

      // ---- Media & breeder reference ----
      image: { type: DataTypes.STRING, allowNull: false },
      breederId: { type: DataTypes.STRING, allowNull: false },
      featured: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      status: {
        type: DataTypes.ENUM("AVAILABLE", "NOT_AVAILABLE"),
        allowNull: false,
        defaultValue: "AVAILABLE",
      },

      // ---- Timestamps ----
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Helpful indexes for common marketplace queries.
    await queryInterface.addIndex("pets", ["species"]);
    await queryInterface.addIndex("pets", ["breed"]);
    await queryInterface.addIndex("pets", ["availability"]);
    await queryInterface.addIndex("pets", ["breederId"]);
    await queryInterface.addIndex("pets", ["featured"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("pets");

    // Clean up the ENUM types Postgres created for the table.
    const enums = [
      "enum_pets_species",
      "enum_pets_gender",
      "enum_pets_size",
      "enum_pets_coatType",
      "enum_pets_availability",
      "enum_pets_activityLevel",
      "enum_pets_barkingLevel",
      "enum_pets_sheddingLevel",
      "enum_pets_vocalLevel",
      "enum_pets_status",
    ];
    for (const name of enums) {
      await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "${name}";`);
    }
  },
};
