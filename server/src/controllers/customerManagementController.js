const { createUser, verifyPassword, verifyPhone, userExists } = require("../db/relational/userManagement.js")
const { insertCart } = require("../db/objectStore/cart.js")

const register = async (req, res) => {
  try {
    const { username, password, email, phone } = req.body
    let id = await createUser(username, password, email, phone)
    insertCart(id, { 'restaurantId': '', cartItems: {}})
    if (!id) res.status(200).json({ error: 'failed to create user, phone number or email already exists' })
    else res.status(201).json({ id, username, email, phone })
  }
  catch (error) {
    console.error('Registration Error, ', error)
    res.status(200).json({ error })
  }
}

const login = async (req, res) => {
  const phone = req.body.phone
  try {
    let phoneVerification = await verifyPhone(phone)
    if (!phoneVerification.username) res.status(200).json({ error: 'invalid phone number' })
    else {
      req.session.phone = phone
      req.session.loggedin = true
      req.session.userid = phoneVerification.id
      res.status(200).json({ msg: 'login success', session: req.session.id, ...phoneVerification })
    }
  }
  catch (error) {
    console.error('Unable to login user, ', error)
    res.status(200).json({ error: 'login failure, invalid phone number' })
  }
}

const logout = async (req, res) => {
  req.session.destroy(() => res.json({ msg: 'logged out' }))
}

const checkValidSession = async (req, res) => {
  if (req.session.user) res.json({ userName: req.session.user })
  else res.json({ msg: "not logged in" })
}

module.exports = { register, login, logout, checkValidSession }
