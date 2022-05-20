# winners-c8-bn-be

---

## Project Setup

---

### Sequelize ORM

#### SETUP

1. **Install and setup postgres**

   - install postgres
   - Create two databases: Testing and Development

2. **Configure `.env`**

   - fill `.env` file with the names and credentials of the databases, basing on the `.env.example` file

3. **Run Migrations**

   - Run `npm run dbmigrate` in terminal to migrate the migrations to the database

#### Other Sequelize options

- **To Undo Migrations**

  - Run `npm run dbmigrate:undo` to undo all migrations

- **To Run seeders**

  - Run `npm run dbseed` to seed the database

- **To undo seeders**

  - Run `npm run dbseed:undo` to undo the seeders
