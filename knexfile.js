// Update with your config settings.
// const path = require('path')
require('dotenv').config({ path: __dirname + '/.env' })

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      database: process.env.DB_NAME,
      user:     process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/migrations'
    },
  }

};
