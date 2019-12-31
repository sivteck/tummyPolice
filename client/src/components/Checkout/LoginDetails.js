import React, { useState, Fragment } from "react"
import { Redirect } from "react-router-dom"
import URL from "../../config"
import LoginForm from "../Login/LoginForm"
import UserLogin from "./UserLogin"

const LoginDetails = () => {
  const [isStatusOk, setStatusOk] = useState(false)
  const [userDetails, setUserDetails] = useState(null)

  const onSubmit = async data => {
    try {
      let res = await fetch(`${URL}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      let result = await res.json()
      localStorage.setItem("userDetails", JSON.stringify(result))
      setUserDetails(result)
      setStatusOk(res.ok)
    } catch (error) {
      setStatusOk(false)
    }
    if (isStatusOk && !userDetails.hasOwnProperty("error")) {
      let cartDetails = localStorage.getItem("guestSession")
      console.log("cart", cartDetails)
      try {
        let res = await fetch(`${URL}/cart`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: cartDetails
        })
        let result = await res.json()
        console.log("res", result)
      } catch (error) {
        console.log(error)
      }
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
