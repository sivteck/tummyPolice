import React from "react"
import { Redirect } from "react-router-dom"

const CheckStatus = ({ status }) => {
  if (!status) return <Redirect to="/errorpage" />
  return null
}

export default CheckStatus
