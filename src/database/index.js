import { Sequelize } from "sequelize";
import getDefault from "../helpers/getEnvironment.js";

const env = getDefault(process.env.NODE_ENV, "development");

const config = require("./config/config.js")[env];

const sequelize = new Sequelize(process.env[config.use_env_variable], config);

export default sequelize;
