require("dotenv").config();
//In .env use in development config env file
//DATABASE_URL=postgres://username:password@localhost:5432/database_name
//postgres://ihimbazwe:elissa123@localhost:5432/Development

module.exports = {
  development: {
    use_env_variable: "DATABASE_URL_DEV",
    dialect: "postgres",
  },
  test: {
    use_env_variable: "DATABASE_URL_TEST",
    dialect: "postgres",
  },
  production: {
    use_env_variable: "DATABASE_URL",
  },
};
