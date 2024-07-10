const { config } = require("dotenv");
config();

module.exports = {
  apiKeyResend: process.env.APiKEYRESEND,
  db: {
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE,
  },
};