import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];

// eslint-disable-next-line import/no-mutable-exports
let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    logging: false,
  });
}

export default sequelize;
