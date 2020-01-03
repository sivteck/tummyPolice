import React, { useState, Fragment } from "react"
import { Redirect } from "react-router-dom"
import URL from "../../config"
import LoginForm from "../Login/LoginForm"
import UserLogin from "./UserLogin"
import { postRequest } from "../../Utils/postRequest"

const LoginDetails = () => {
  const [isStatusOk, setStatusOk] = useState(false)
  const [userDetails, setUserDetails] = useState(null)

  const onSubmit = async data => {
    const { response, result, error } = await postRequest(`${URL}/login`, data)
    if (response) {
      localStorage.setItem("userDetails", JSON.stringify(result))
      setUserDetails(result)
      setStatusOk(response.ok)
    }
    if (error) {
      setStatusOk(false)
    }
    if (isStatusOk && !userDetails.hasOwnProperty("error")) {
      updateCart()
    }
  }

  const updateCart = async () => {
    let cartDetails = localStorage.getItem("guestSession")
    const { response, error } = await postRequest(`${URL}/cart`, cartDetails)
    if (response) {
      setStatusOk(response.ok)
    }
    if (error) {
      setStatusOk(false)
    }
  }

  function loginAction() {
    if (isStatusOk && userDetails.hasOwnProperty("error")) {
      return (
        <div>
          <p style={{ textTransform: "capitalize" }}>{userDetails.error}</p>
        </div>
      )
    }
  }

  return (
    <Fragment>
      {!userDetails && (
        <LoginForm onSubmit={onSubmit} loginAction={loginAction} />
      )}
      {isStatusOk && !userDetails.hasOwnProperty("error") && <UserLogin />}
    </Fragment>
  )
}

export default LoginDetails
