// Update with your config settings.
// const path = require('path')
require('dotenv').config()

// const devConfig = `postgresql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

// const proConfig = process.env.DATABASE_URL; //heroku addons


module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/migrations'
    },
  }

};
