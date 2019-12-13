const uuid = require('uuid/v4')
const { query } = require('../../db/relational/schema.js')

async function createDP (phone) {
  const id = uuid()
  try {
    const text = 'INSERT INTO users VALUES($1, $2) RETURNING id'
    const result = await query(text, [id, phone])
    return result.rows[0].id
  }
  catch (error) {
    console.error('Unable to create Delivery Partner,', phone)
  }
}

async function verifyDP (phone) {
  const text  = 'SELECT id, phone FROM deliverypartners WHERE phone = $1'
  try {
    const result = await query(text, [phone])
    return { ...result.rows[0] }
  }
  catch (error) {
    console.error(error)
  }
}

async function DPExists (phone) {
  const text = 'SELECT id FROM deliverypartners WHERE phone = $1'
  const values = [phone]
  try {
    const result = await query(text, values)
    return result.rows[0]
  }
  catch (error) {
    console.error('Error trying to lookup user, ', phone)
  }
}

module.exports = { createDP, verifyDP, DPExists }
