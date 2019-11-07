const { createUser, verifyPassword, verifyPhone, userExists } = require("../db/relational/userManagement.js")
const { insertCart } = require("../db/objectStore/cart.js")

const register = async (req, res) => {
  console.log('from /register', req.session)
  try {
    let id = await createUser(req.body.username, req.body.password, req.body.email, req.body.phone)
    insertCart(id, { 'restaurantId': '', cart: {}})
    res.status(201).json({ id: id, username: req.body.username, email: req.body.email, phone: req.body.phone })
  }
  catch (error) {
    console.error('Registration Error, ', error)
    res.status(200).json({ error: error })
  }
}

const login = async (req, res) => {
  console.log('from /login', req.session)
  try {
    // let passwordMatch = await verifyPassword(req.body.userName, req.body.password)
    // console.log('passwordMatch: ', passwordMatch)
    let phoneVerification = await verifyPhone(req.body.phone)
    console.log(phoneVerification)
    if (!phoneVerification.username) res.status(200).json({ msg: 'invalid phone number' })
    else {
      req.session.phone = req.body.phone
      req.session.loggedin = true
      req.session.userid = phoneVerification.id
      res.status(200).json({ msg: 'login success', session: req.session.id, ...phoneVerification })
    }
  }
  catch (error) {
    console.log('Unable to login user, ', error)
    res.status(401).json({ msg: 'login failure, invalid phone number' })
  }
}

const logout = async (req, res) => {
  console.log('from logout', req.session)
  req.session.destroy(() => res.json({ msg: 'logged out' }))
}

const checkValidSession = async (req, res) => {
  console.log('from /checkValidSession', req.session)
  if (req.session.user) res.json({ userName: req.session.user })
  else res.json({ msg: "not logged in" })
}

module.exports = { register, login, logout, checkValidSession }
