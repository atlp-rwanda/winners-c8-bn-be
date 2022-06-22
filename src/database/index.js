import { Sequelize } from "sequelize";
import getDefault from "../helpers/getEnvironment.js";
import "dotenv/config";

const env = getDefault(process.env.NODE_ENV, "development");

const config = require("./config/config.js")[env];

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: false,
  });
}

export default sequelize;
