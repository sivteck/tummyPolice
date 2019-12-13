const { createDP, verifyDP, DPExists} = require('./deliveryPartnerDAL.js')

const register = async (req, res) => {
  try {
    const { phone } = req.body
    const id = await createDP(phone)
    if (!id) res.json({ error: 'failed to create user, phone number or email already exists' })
    else res.json({ id, phone })
  }
  catch (error) {
    console.error('Registration Error, ', error)
    res.json({ error })
  }
}

const login = async (req, res) => {
  // const phone = req.body.phone
  const phone = req.body.id
  try {
    const phoneVerification = await verifyDP(phone)
    if (!phoneVerification.username) res.status(200).json({ error: 'invalid phone number' })
    else {
      req.session.phone = phone
      req.session.loggedin = true
      req.session.userid = phoneVerification.id
      res.json({ msg: 'login success', session: req.session.id, ...phoneVerification })
    }
  }
  catch (error) {
    console.error('Unable to login user, ', error)
    res.json({ error: 'login failure, invalid phone number' })
  }
}

const logout = async (req, res) => {
  req.session.destroy(() => res.json({ msg: 'logged out' }))
}

const checkValidSession = async (req, res) => {
  if (req.session.phone) res.json({ phone: req.session.phone })
  else res.json({ msg: "not logged in" })
}

module.exports = { register, login, logout, checkValidSession }
