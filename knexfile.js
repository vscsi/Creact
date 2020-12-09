// Update with your config settings.
// const path = require('path')
require('dotenv').config({ path: __dirname + '/.env' })

const devConfig = `postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const proConfig = process.env.DATABASE_URL; //heroku addons

const client = 'pg'


module.exports = {
  development: {
    client: client,
    connection: process.env.NODE_ENV === "production" ? proConfig : devConfig,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/migrations'
    },
  }

};
