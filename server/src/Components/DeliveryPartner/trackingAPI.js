const WebSocket = require('ws')
const express = require('express')
const { publishLoc } = require('./trackingDAL.js')

// const ws = new WebSocket()
const router = express.Router()

router.post('/deliverypartner/updatelocation', async (req, res) => {
  try {
    if (req.body) {
      await publishLoc(JSON.stringify(req.body))
    }
    res.json({ msg: 'update location success' })
  }
  catch (error) {
    console.error(error)
    res.json({ error: 'unable to update location' })
  }
})

module.exports = router
