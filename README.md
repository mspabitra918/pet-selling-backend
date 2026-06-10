# Pet Selling Backend

NestJS + Sequelize (PostgreSQL) backend for the premium pet selling platform.

## Stack

- **NestJS 11** — application framework
- **Sequelize 6** + **sequelize-typescript** — ORM / models
- **sequelize-cli** — migrations & seeders
- **PostgreSQL** — database
- **class-validator / class-transformer** — request validation

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env   # then edit DB_* values

# 3. Create the database (uses the .env config)
npm run db:create

# 4. Run migrations
npm run db:migrate

# 5. Start the API
npm run start:dev
```

The API is served under the `/api` prefix, e.g. `http://localhost:4000/api/pet-purchases`.

## Database scripts

| Script                      | Description                          |
| --------------------------- | ------------------------------------ |
| `npm run db:create`         | Create the database                  |
| `npm run db:migrate`        | Run pending migrations               |
| `npm run db:migrate:undo`   | Revert the last migration            |
| `npm run db:migrate:undo:all` | Revert all migrations              |
| `npm run db:seed`           | Run seeders                          |

Migrations live in [src/database/migrations](src/database/migrations) and are
configured through [.sequelizerc](.sequelizerc) + [src/database/config.js](src/database/config.js).

## Pet purchase endpoints

| Method | Path                       | Description              |
| ------ | -------------------------- | ----------------------- |
| POST   | `/api/pet-purchases`       | Create a pet purchase   |
| GET    | `/api/pet-purchases`       | List all pet purchases  |
| GET    | `/api/pet-purchases/:id`   | Get one by UUID         |
| PATCH  | `/api/pet-purchases/:id`   | Update by UUID          |
| DELETE | `/api/pet-purchases/:id`   | Delete by UUID          |

The `pet_purchases` table mirrors the frontend `Pet` type, including nested
objects (`health`, `parents`, `deliveryOptions`, `breeder`, `feedingSchedule`,
`training`) stored as `JSONB`, and list fields (`traits`, `included`, `gallery`,
`badges`, `temperament`, `adoptionRequirements`) stored as Postgres arrays.
