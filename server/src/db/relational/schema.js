const Pool = require("pg").Pool
const pgConfig = require("../../configs/postgres.js")

const pool = new Pool(pgConfig)

let restaurantTable = `CREATE TABLE IF NOT EXISTS restaurants (
                       id UUID PRIMARY KEY,
                       name VARCHAR NOT NULL,
                       address VARCHAR NOT NULL,
                       city VARCHAR NOT NULL,
                       location geometry
                       )`

let createUserTable = `CREATE TABLE IF NOT EXISTS users (
                       id UUID PRIMARY KEY,
                       username VARCHAR,
                       salt VARCHAR,
                       passwordhash VARCHAR,
                       email VARCHAR,
                       phone VARCHAR UNIQUE
                       )`

let createDeliveryPartnerTable = `CREATE TABLE IF NOT EXISTS deliverypartners (
                       id VARCHAR(10) PRIMARY KEY,
                       phone VARCHAR UNIQUE,
                       location geometry,
                       assignedtask boolean,
                       active boolean
                       )`

let createOrderTable = `CREATE TABLE IF NOT EXISTS orders (
                       id UUID PRIMARY KEY,
                       userid VARCHAR,
                       restaurantId VARCHAR,
                       deliveryLocation geometry,
                       orderDetails json
                       )`


async function initDb () {
  try {
    await pool.query(restaurantTable)
    await pool.query(createUserTable)
    await pool.query(createDeliveryPartnerTable)
    await pool.query(createOrderTable)
  }
  catch (error) {
    console.error(error)
  }
}

function query (text, params)  {
  return pool.query(text, params)
}

module.exports = { initDb, query }
