require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  corsOrigin: process.env.CORS_ORIGIN,
};
