const Websocket = require('ws')
const express = require('express')
const { publishLoc } = require('trackingDAL')

const ws = new WebSocket()
const router = express.Router()

router.get('/deliverypartner/updatelocation', async (req, res) => {
  if (req.body) await publishLoc(req.body)
  res.sendStatus(200)
})

module.exports = router
