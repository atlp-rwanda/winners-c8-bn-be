require("dotenv").config();

module.exports = {
  development: {
    use_env_variable: "DATABASE_URL_DEV",
    dialect: "postgres",
  },
  test: {
    use_env_variable: "DATABASE_URL_TEST",
    dialect: "postgres",
    logging: false,
  },
  production: {
    dialect: "postgres",
    use_env_variable: "DATABASE_URL",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
