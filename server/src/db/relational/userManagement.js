const { query } = require("./schema.js")
const uuid = require('uuid/v4')
const bcrypt = require('bcrypt')
const saltRounds = 10

async function createUser (userName, password, email, phone) {
  const id = uuid()
  try {
    const salt = await bcrypt.genSalt(saltRounds)
    const passwordHash = await bcrypt.hash(password, salt)
    const text ='INSERT INTO users VALUES($1, $2, $3, $4, $5, $6) RETURNING id'
    const values = [id, userName, salt, passwordHash, email, phone]
    const result = await query(text, values)
    return result.rows[0].id
  }
  catch (error) {
    console.error('Unable to create user, ', phone)
  }
}

async function verifyPassword (userName, password) {
  const text = 'SELECT passwordHash FROM users WHERE userName = $1'
  const values = [userName]
  try {
    const result = await query(text, values)
    const hash = result.rows[0].passwordhash
    const passwordMatch = await bcrypt.compare(password, hash)
    return passwordMatch
  }
  catch (error) {
    console.error('Wrong password, ', error)
  }
}

async function verifyPhone (phone) {
  const text = 'SELECT id, username, phone, email FROM users WHERE phone = $1'
  const values = [phone]
  try {
    const result = await query(text, values)
    return { ...result.rows[0] }
  }
  catch (error) {
    console.error(error)
  }
}

async function userExists (userName) {
  const text =  'SELECT id FROM users WHERE username = $1'
  const values = [userName]
  try {
    const result = await query(text, values)
    return result.rows[0]
  }
  catch (error) {
    console.error('Error trying to lookup user, ', userName, error)
  }
}

module.exports = { createUser, verifyPassword, verifyPhone, userExists }
