const Pool = require("pg").Pool
const pgConfig = require("../../configs/postgres.js")

const pool = new Pool(pgConfig)

let restaurantTable = `CREATE TABLE IF NOT EXISTS restaurants (
                       id UUID PRIMARY KEY,
                       name VARCHAR NOT NULL,
                       address VARCHAR NOT NULL,
                       city VARCHAR NOT NULL
                       )`

let createUserTable = `CREATE TABLE IF NOT EXISTS users (
                    id UUID PRIMARY KEY,
                    username VARCHAR UNIQUE,
                    salt VARCHAR,
                    passwordhash VARCHAR,
                    email VARCHAR,
                    phone VARCHAR UNIQUE
                    )`

async function initDb () {
  try {
    await pool.query(restaurantTable)
    await pool.query(createUserTable)
  }
  catch (error) {
    console.error(error)
  }
}

function query (text, params)  {
  return pool.query(text, params)
}

module.exports = { initDb, query }
