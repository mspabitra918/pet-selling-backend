"use strict";

const { randomUUID } = require("crypto");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("pets", [
      {
        id: "8a1e742e-a0b4-4b3f-8df8-c525b2de3b5e",
        name: "Luna",
        species: "dog",
        breed: "Golden Retriever",
        ageLabel: "9 weeks",
        ageWeeks: 9,
        gender: "Female",

        color: "Golden",
        coatType: "Short Smooth Coat",
        size: "Large",
        weight: "6.8 lbs",

        priceUsd: 2200,
        originalPriceUsd: 2500,

        city: "Toronto",
        region: "NY",
        country: "US",

        image:
          "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?auto=format&fit=crop&w=900&q=80",
        breederId: "b-sunrise",

        featured: true,
        availability: "Available",
        status: "AVAILABLE",

        badges: [
          "Health Guarantee",
          "Vaccinated",
          "Microchipped",
          "AKC Registered",
        ],

        traits: ["Friendly", "Intelligent", "Playful"],

        included: ["Starter Food Pack", "Health Records"],

        health: JSON.stringify({
          vaccinated: true,
          dewormed: true,
          microchipped: true,
          vetChecked: true,
          healthCertificate: true,
          healthGuaranteeMonths: 12,
        }),

        parents: JSON.stringify({
          sire: {
            name: "Max",
            breed: "Golden Retriever",
          },
          dam: {
            name: "Bella",
            breed: "Golden Retriever",
          },
        }),

        deliveryOptions: JSON.stringify({
          localPickup: true,
          airportDelivery: true,
          nationwideShipping: true,
        }),

        gallery: [
          "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=900&q=80",
        ],

        breeder: JSON.stringify({
          name: "Sunrise Golden Retrievers",
          experienceYears: 12,
          rating: 4.9,
          reviewCount: 127,
        }),

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "7065f3ca-3ef2-480d-b09e-df7120281f30",
        name: "Milo",
        species: "dog",
        breed: "French Bulldog",
        ageLabel: "11 weeks",
        ageWeeks: 11,
        gender: "Male",

        color: "Cream",
        coatType: "Short Smooth Coat",
        size: "Small",
        weight: "5.2 lbs",

        priceUsd: 3800,
        originalPriceUsd: 4200,

        city: "Toronto",
        region: "ON",
        country: "CA",
        status: "AVAILABLE",

        image:
          "https://images.unsplash.com/photo-1620189507195-68309c04c4d0?auto=format&fit=crop&w=900&q=80",

        gallery: [
          "https://images.unsplash.com/photo-1620189507195-68309c04c4d0?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80",
        ],

        breederId: "b-maple",

        badges: [
          "Health Guarantee",
          "Vet Checked",
          "Microchipped",
          "Family Raised",
        ],

        featured: true,
        availability: "Available",

        description:
          "Milo is an adorable French Bulldog puppy with a playful personality and affectionate nature. Raised in a loving family environment, he is well-socialized with children and other pets. Milo enjoys cuddles, short walks, and interactive play sessions.",

        temperament: [
          "Affectionate",
          "Friendly",
          "Playful",
          "Loyal",
          "Calm",
          "Adaptable",
        ],

        traits: [
          "Great Companion",
          "Apartment Friendly",
          "Easy Going",
          "Socialized",
          "Family Friendly",
        ],

        health: JSON.stringify({
          vaccinated: true,
          dewormed: true,
          microchipped: true,
          vetChecked: true,
          healthCertificate: true,
          healthGuaranteeMonths: 12,
        }),

        parents: JSON.stringify({
          sire: {
            name: "Bruno",
            breed: "French Bulldog",
            color: "Blue Fawn",
            weight: "26 lbs",
            registered: true,
          },
          dam: {
            name: "Daisy",
            breed: "French Bulldog",
            color: "Cream",
            weight: "24 lbs",
            registered: true,
          },
        }),

        included: [
          "Vaccination Records",
          "Health Certificate",
          "Starter Food Pack",
          "Puppy Care Guide",
          "Microchip Registration",
          "Blanket with Mother's Scent",
        ],

        feedingSchedule: JSON.stringify({
          mealsPerDay: 4,
          foodType: "Premium Puppy Kibble",
        }),
        training: JSON.stringify({
          crateTrained: false,
          pottyTrainingStarted: true,
          leashTrainingStarted: true,
        }),

        goodWithKids: true,
        goodWithDogs: true,
        goodWithCats: true,

        deliveryOptions: JSON.stringify({
          localPickup: true,
          airportDelivery: true,
          nationwideShipping: true,
        }),

        breeder: JSON.stringify({
          name: "Maple French Bulldogs",
          experienceYears: 10,
          rating: 4.9,
          reviewCount: 143,
        }),

        favoriteToy: "Plush Squeaky Bone",
        adoptionRequirements: [
          "Secure home environment",
          "Commitment to regular vet care",
          "Responsible pet ownership",
        ],
        reserveAmount: 500,

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2f380e9e-aa0b-46f5-9668-cac2d74ae043",
        name: "Willow",
        species: "cat",
        breed: "Ragdoll",
        ageLabel: "12 weeks",
        ageWeeks: 12,
        gender: "Female",
        status: "AVAILABLE",
        color: "Seal Point",
        coatType: "Long Silky Coat",
        eyeColor: "Blue",
        size: "Medium",
        weight: "3.8 lbs",
        expectedAdultWeight: "10-15 lbs",

        priceUsd: 1500,
        originalPriceUsd: 2500,

        city: "Seattle",
        region: "WA",
        country: "CA",

        image:
          "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=900&q=80",

        gallery: [
          "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=900&q=80",
        ],

        breederId: "b-cascade",

        badges: [
          "TICA Registered",
          "Vaccinated",
          "Microchipped",
          "Vet Checked",
        ],

        featured: true,
        availability: "Available",

        description:
          "Willow is a beautiful Ragdoll kitten with striking blue eyes and an exceptionally gentle temperament. She has been raised indoors in a loving environment and is well-socialized with people and other pets.",

        temperament: [
          "Gentle",
          "Affectionate",
          "Calm",
          "Friendly",
          "Social",
          "Intelligent",
        ],
        traits: [
          "Indoor Raised",
          "Family Friendly",
          "Litter Trained",
          "Loves Cuddles",
          "Low Aggression",
        ],

        health: JSON.stringify({
          vaccinated: true,
          dewormed: true,
          microchipped: true,
          vetChecked: true,
          healthCertificate: true,
          healthGuaranteeMonths: 12,
        }),

        parents: JSON.stringify({
          sire: {
            name: "Oliver",
            breed: "Ragdoll",
            color: "Blue Point",
            weight: "16 lbs",
            registered: true,
          },
          dam: {
            name: "Lily",
            breed: "Ragdoll",
            color: "Seal Point",
            weight: "12 lbs",
            registered: true,
          },
        }),

        included: [
          "Vaccination Records",
          "Health Certificate",
          "TICA Registration Papers",
          "Starter Food Pack",
          "Kitten Care Guide",
          "Favorite Toy",
          "Blanket with Familiar Scent",
        ],

        deliveryOptions: JSON.stringify({
          localPickup: true,
          airportDelivery: true,
          nationwideShipping: true,
        }),

        breeder: JSON.stringify({
          name: "Cascade Ragdolls",
          experienceYears: 8,
          rating: 4.9,
          reviewCount: 98,
        }),

        favoriteToy: "Feather Wand",
        adoptionRequirements: [
          "Indoor home preferred",
          "Regular veterinary care",
          "Safe and loving environment",
        ],
        reserveAmount: 300,

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "668cc8b4-c78d-45aa-9a54-855ac8d00028",
        name: "Koda",
        species: "dog",
        breed: "Siberian Husky",
        ageLabel: "10 weeks",
        ageWeeks: 10,
        gender: "Male",
        status: "AVAILABLE",
        color: "Black & White",
        coatType: "Double Coat",
        eyeColor: "Ice Blue",
        size: "Medium",
        weight: "7.4 lbs",
        expectedAdultWeight: "45-60 lbs",

        priceUsd: 1900,
        originalPriceUsd: 2500,
        city: "Calgary",
        region: "CA",
        country: "US",

        image:
          "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&w=900&q=80",

        gallery: [
          "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80",
        ],

        breederId: "b-maple",
        badges: [
          "Health Guarantee",
          "Microchipped",
          "Vaccinated",
          "Vet Checked",
        ],
        featured: true,
        availability: "Available",

        description:
          "Koda is a stunning Siberian Husky puppy with beautiful blue eyes and a playful personality. He is highly intelligent, energetic, and enjoys exploring new environments. Raised in a family setting and well-socialized with people and other pets.",

        temperament: [
          "Energetic",
          "Intelligent",
          "Friendly",
          "Outgoing",
          "Playful",
          "Adventurous",
        ],
        traits: [
          "Blue Eyes",
          "Family Friendly",
          "Highly Intelligent",
          "Socialized",
          "Outdoor Lover",
        ],

        health: JSON.stringify({
          vaccinated: true,
          dewormed: true,
          microchipped: true,
          vetChecked: true,
          healthCertificate: true,
          healthGuaranteeMonths: 12,
        }),

        parents: JSON.stringify({
          sire: {
            name: "Thor",
            breed: "Siberian Husky",
            color: "Black & White",
            eyeColor: "Blue",
            weight: "58 lbs",
            registered: true,
          },
          dam: {
            name: "Aurora",
            breed: "Siberian Husky",
            color: "Gray & White",
            eyeColor: "Brown",
            weight: "50 lbs",
            registered: true,
          },
        }),

        included: [
          "Vaccination Records",
          "Health Certificate",
          "Microchip Registration",
          "Starter Food Pack",
          "Puppy Care Guide",
          "Leash & Collar",
          "Favorite Toy",
        ],

        deliveryOptions: JSON.stringify({
          localPickup: true,
          airportDelivery: true,
          nationwideShipping: true,
        }),

        breeder: JSON.stringify({
          name: "Maple Huskies",
          experienceYears: 11,
          rating: 4.8,
          reviewCount: 124,
        }),

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "0e17f6c4-9450-42a8-95f4-a0dfcb6a6cbd",
        name: "Atlas",
        species: "cat",
        breed: "Maine Coon",
        ageLabel: "14 weeks",
        ageWeeks: 14,
        gender: "Male",
        status: "AVAILABLE",
        color: "Brown Tabby",
        coatType: "Long Dense Coat",
        eyeColor: "Golden Green",
        size: "Large",
        weight: "5.6 lbs",
        expectedAdultWeight: "15-22 lbs",

        priceUsd: 2100,
        originalPriceUsd: 2500,
        city: "Denver",
        region: "TX",
        country: "US",

        image:
          "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?auto=format&fit=crop&w=900&q=80",

        gallery: [
          "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=900&q=80",
        ],

        breederId: "b-cascade",
        badges: [
          "CFA Registered",
          "Vet Checked",
          "Vaccinated",
          "Microchipped",
          "Health Guarantee",
        ],
        featured: true,
        availability: "Available",

        description:
          "Atlas is a handsome Maine Coon kitten with a majestic appearance, large paws, and a luxurious coat. He is affectionate, playful, and enjoys spending time with people. Raised indoors and well-socialized from an early age.",

        health: JSON.stringify({
          vaccinated: true,
          dewormed: true,
          microchipped: true,
          vetChecked: true,
          healthCertificate: true,
          healthGuaranteeMonths: 12,
        }),

        parents: JSON.stringify({
          sire: {
            name: "Leo",
            breed: "Maine Coon",
            color: "Silver Tabby",
            weight: "21 lbs",
            registered: true,
          },
          dam: {
            name: "Nala",
            breed: "Maine Coon",
            color: "Brown Tabby",
            weight: "15 lbs",
            registered: true,
          },
        }),

        included: [
          "CFA Registration Papers",
          "Vaccination Records",
          "Health Certificate",
          "Microchip Registration",
          "Starter Food Pack",
          "Kitten Care Guide",
          "Favorite Toy",
          "Blanket with Familiar Scent",
        ],

        deliveryOptions: JSON.stringify({
          localPickup: true,
          airportDelivery: true,
          nationwideShipping: true,
        }),

        breeder: JSON.stringify({
          name: "Cascade Maine Coons",
          experienceYears: 12,
          rating: 4.9,
          reviewCount: 167,
        }),

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "88debbb8-f8e3-4b13-b522-29e71bec3b31",
        name: "Bella",
        species: "dog",
        breed: "Pomeranian",
        ageLabel: "8 weeks",
        ageWeeks: 8,
        gender: "Female",
        status: "AVAILABLE",
        color: "Orange Sable",
        coatType: "Double Coat",
        eyeColor: "Dark Brown",
        size: "Small",
        weight: "2.4 lbs",
        expectedAdultWeight: "4-7 lbs",

        priceUsd: 2600,
        originalPriceUsd: 3000,
        city: "Vancouver",
        region: "BC",
        country: "CA",

        image:
          "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=900&q=80",

        gallery: [
          "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80",
        ],

        breederId: "b-maple",
        badges: [
          "Health Guarantee",
          "Vaccinated",
          "Microchipped",
          "Family Raised",
          "Vet Checked",
          "Socialized",
        ],
        featured: true,
        availability: "Available",

        description:
          "Bella is a beautiful Orange Sable Pomeranian puppy with a luxurious fluffy coat and an outgoing personality. Raised in a loving family environment, she enjoys cuddles, playtime, and meeting new people. Bella has been socialized from an early age and is developing into a confident and affectionate companion.",

        health: JSON.stringify({
          vaccinated: true,
          dewormed: true,
          microchipped: true,
          vetChecked: true,
          healthCertificate: true,
          healthGuaranteeMonths: 12,
        }),

        parents: JSON.stringify({
          sire: {
            name: "Teddy",
            breed: "Pomeranian",
            color: "Orange",
            weight: "5 lbs",
            registered: true,
          },
          dam: {
            name: "Daisy",
            breed: "Pomeranian",
            color: "Cream Sable",
            weight: "6 lbs",
            registered: true,
          },
        }),

        included: [
          "Vaccination Records",
          "Health Certificate",
          "Microchip Registration",
          "Starter Food Pack",
          "Puppy Care Guide",
          "Blanket with Familiar Scent",
          "Favorite Toy",
          "Collar",
        ],

        deliveryOptions: JSON.stringify({
          localPickup: true,
          airportDelivery: true,
          nationwideShipping: true,
        }),

        breeder: JSON.stringify({
          name: "Maple Pomeranians",
          experienceYears: 9,
          rating: 4.9,
          reviewCount: 113,
        }),

        registeredOrganization: "CKC",
        registrationNumber: "CKC-POM-2026-4587",
        personalityType: "Companion Dog",
        trainabilityRating: 4,
        friendlinessRating: 5,
        energyRating: 4,

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "b37de47d-95a6-42a5-a632-6212d1cce205",
        name: "Rio",
        species: "bird",
        breed: "Blue & Gold Macaw",
        ageLabel: "6 months",
        ageWeeks: 24,
        gender: "Male",
        status: "AVAILABLE",
        color: "Blue & Gold",
        size: "Large",
        weight: "2.6 lbs",

        priceUsd: 2400,
        originalPriceUsd: 3000,
        city: "Miami",
        region: "FL",
        country: "US",

        image:
          "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=900&q=80",

        gallery: [
          "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1668891471433-5ebea38523f7?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1757899491116-ef52ffc406b9?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1778361324446-93203320980e?auto=format&fit=crop&w=900&q=80",
        ],

        breederId: "b-sunrise",
        badges: ["Hand-Raised", "Vet Checked", "DNA Tested", "Socialized"],
        featured: true,
        availability: "Available",

        description:
          "Rio is a beautiful Blue & Gold Macaw with vibrant colors and a friendly personality. He has been hand-raised and enjoys interacting with people.",

        temperament: [
          "Intelligent",
          "Social",
          "Curious",
          "Playful",
          "Friendly",
        ],

        health: JSON.stringify({
          vaccinated: true,
          vetChecked: true,
          healthCertificate: true,
          healthGuaranteeMonths: 12,
        }),

        breeder: JSON.stringify({
          name: "Sunrise Exotic Birds",
          experienceYears: 15,
          rating: 4.9,
          reviewCount: 87,
        }),

        reserveAmount: 600,

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "a4180b54-da0d-530d-8d91-c0d7dabe3f8d",
        name: "Pip",
        species: "dog",
        breed: "Pembroke Welsh Corgi",
        ageLabel: "9 weeks",
        ageWeeks: 9,
        gender: "Female",
        status: "AVAILABLE",
        color: "Red & White",
        coatType: "Double Coat",
        size: "Medium",
        weight: "5.8 lbs",
        expectedAdultWeight: "24-30 lbs",

        priceUsd: 2750,
        originalPriceUsd: 3250,
        city: "Portland",
        region: "OR",
        country: "CA",

        image:
          "https://images.unsplash.com/photo-1612536057832-2ff7ead58194?auto=format&fit=crop&w=900&q=80",

        gallery: [
          "https://images.unsplash.com/photo-1612536057832-2ff7ead58194?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1520975910677-39850f1b4d38?auto=format&fit=crop&w=900&q=80",
          "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=900&q=80",
        ],

        breederId: "b-cascade",
        badges: [
          "Health Guarantee",
          "Microchipped",
          "Vaccinated",
          "Vet Checked",
        ],
        featured: true,
        availability: "Available",

        description:
          "Pip is a cheerful Pembroke Welsh Corgi puppy with a loving personality and endless curiosity. She is well-socialized and enjoys playtime with children and other pets.",

        temperament: [
          "Friendly",
          "Loyal",
          "Intelligent",
          "Playful",
          "Energetic",
        ],

        health: JSON.stringify({
          vaccinated: true,
          dewormed: true,
          microchipped: true,
          vetChecked: true,
          healthCertificate: true,
          healthGuaranteeMonths: 12,
        }),

        parents: JSON.stringify({
          sire: {
            name: "Cooper",
            breed: "Pembroke Welsh Corgi",
            weight: "29 lbs",
            registered: true,
          },
          dam: {
            name: "Ruby",
            breed: "Pembroke Welsh Corgi",
            weight: "26 lbs",
            registered: true,
          },
        }),

        included: [
          "Vaccination Records",
          "Health Certificate",
          "Microchip Registration",
          "Starter Food Pack",
          "Puppy Care Guide",
        ],

        breeder: JSON.stringify({
          name: "Cascade Corgis",
          experienceYears: 10,
          rating: 4.9,
          reviewCount: 142,
        }),

        reserveAmount: 550,

        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("pets", {
      id: "8a1e742e-a0b4-4b3f-8df8-c525b8de3b5e",
    });
  },
};
