const Pool = require("pg").Pool
const pgConfig = require("../../configs/postgres.js")

const pool = new Pool(pgConfig)

let restaurantTable = `CREATE TABLE IF NOT EXISTS restaurants (
                       id UUID PRIMARY KEY,
                       name VARCHAR NOT NULL,
                       address VARCHAR NOT NULL,
                       city VARCHAR NOT NULL
                       )`

async function initDb () {
  try {
    await pool.query(restaurantTable)
  }
  catch (error) {
    console.error(error)
  }
}

function query (text, params)  {
  return pool.query(text, params)
}

module.exports = { initDb, query }
