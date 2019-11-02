const { query } = require("./schema.js")
const uuid = require('uuid/v4')
const bcrypt = require('bcrypt')
const saltRounds = 10;

async function createUser (userName, password, email, phone) {
  let id = uuid()
  try {
    let salt = await bcrypt.genSalt(saltRounds)
    let passwordHash = await bcrypt.hash(password, salt)
    let text ='INSERT INTO users VALUES($1, $2, $3, $4, $5, $6) RETURNING id'
    let values = [id, userName, salt, passwordHash, email, phone]
    let result = await query(text, values)
    return result.rows[0].id
  }
  catch (error) {
    console.error('Unable to create user, ', error)
  }
}

async function verifyPassword (userName, password) {
  let text = 'SELECT passwordHash FROM users WHERE userName = $1'
  let values = [userName]
  try {
    let result = await query(text, values)
    let hash = result.rows[0].passwordhash
    let passwordMatch = await bcrypt.compare(password, hash)
    return passwordMatch
  }
  catch (error) {
    console.error('Wrong password, ', error)
  }
}

async function verifyPhone (phone) {
  let text = 'SELECT username, phone FROM users WHERE phone = $1'
  let values = [phone]
  try {
    let result = await query(text, values)
    let username = result.rows[0].username
    return { username, phone }
  }
  catch (error) {
    console.error(error)
  }
}

async function userExists (userName) {
  let text =  'SELECT id FROM users WHERE username = $1'
  let values = [userName]
  try {
    let result = await query(text, values)
    return result.rows[0]
  }
  catch (error) {
    console.error('Error trying to lookup user, ', userName, error)
  }
}

module.exports = { createUser, verifyPassword, verifyPhone, userExists }
