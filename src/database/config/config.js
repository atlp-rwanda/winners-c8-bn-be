require("dotenv").config();
//In .env use in development config env file
//DATABASE_URL=postgres://username:password@localhost:5432/database_name
//postgres://ihimbazwe:elissa123@localhost:5432/Development

module.exports = {

  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOSTNAME,
    port: process.env.DEV_DB_PORT,
    dialect: "postgres",
  },
  test: {
    username: process.env.TEST_DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: process.env.TEST_DB_HOSTNAME,
    port: process.env.TEST_DB_PORT,
    dialect: "postgres",
  },
  production: {
    use_env_variable: "DATABASE_URL",
  },
};
