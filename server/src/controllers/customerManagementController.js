const { createUser, verifyPassword, verifyPhone, userExists } = require("../db/relational/userManagement.js")

const register = async (req, res) => {
  console.log('from /register', req.session)
  try {
    let id = await createUser(req.body.userName, req.body.password, req.body.email, req.body.phone)
    res.json({ id: id })
  }
  catch (error) {
    console.error('Registration Error, ', error)
  }
}

const login = async (req, res) => {
  console.log('from /login', req.session)
  try {
    // let passwordMatch = await verifyPassword(req.body.userName, req.body.password)
    // console.log('passwordMatch: ', passwordMatch)
    let phoneVerification = await verifyPhone(req.body.phone)
    console.log(phoneVerification)
    if (!phoneVerification.username) res.json({ msg: 'invalid phone number' })
    req.session.phone = req.body.phone
    req.session.loggedin = true
    res.json({ msg: 'login success', ...phoneVerification })
  }
  catch (error) {
    console.log('Unable to login user, ', error)
    res.json({ msg: 'login failure, invalid phone number' })
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
