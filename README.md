# winners-c8-bn-be

# Example:
[![CircleCI](https://circleci.com/gh/atlp-rwanda/winners-c8-bn-be/tree/develop.svg?style=svg)](https://circleci.com/gh/atlp-rwanda/winners-c8-bn-be/tree/develop)
[![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com)

## Basic folder structure:

```
ROOT FOLDER: WINNERS-C8-BN-BE
├───lib                        : /lib folder contains codes compiled by babel from the /src folder
│   ├───controllers
│   ├───database
│   │   ├───migrations
│   │   ├───models
│   │   └───seeders
│   ├───routes
    ├───test
    └───validations
├───node_modules                  : /node_modules folder is mentioned in the .gitignore file
│   ├─── ...
│   └─── ...
│       └─── ...
│           └─── ...
└───src                            : /src folder contains the source code,
    ├───controllers                  and should be written using **ES6**,
    ├───database                     and can be compiled by running
    │   ├───config                    "npm run build"  (this uses babel to compile)
    │   ├───migrations
    │   ├───models
    │   └───seeders
    ├───routes
    ├───test
    └───validations
```

## Dotenv usage:

To use dotenv, one should:

1. Add the `.env` file in the root folder of the project, with the environment variables declarations;
   for e.g, the `.env` file can contain this text:
   ```
   SOME_TEXT=this_is_a_text
   SOME_KEY=this_is_a_key
   ```
2. Next, use `import 'dotenv/config';` in any JS file (in the `/src` folder) to ensure that the `process.env` object's properties will include those from the `.env` file.
   for e.g, as a continuation to the example given above, the JS file may look like:
   `import 'dotenv/config'; console.log(process.env.SOME_TEXT); // This displays "this_is_a_text" console.log(process.env.SOME_KEY); // This displays "this_is_a_key"`
   Note that the JS file will need to be compiled using babel.

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

### Integrate githubCI with README  BADGES

