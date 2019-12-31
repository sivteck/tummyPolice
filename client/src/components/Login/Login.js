import React, { useState, Fragment } from "react"
import {  Redirect } from "react-router-dom"
import URL from "../../config"
import LoginForm from "./LoginForm"

const Login = () => {
  const [isStatusOk, setStatusOk] = useState(false)
  const [userDetails, setUserDetails] = useState({})

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
      console.log("result from login", result)
      localStorage.setItem("userDetails", JSON.stringify(result))
      setUserDetails(result)
      setStatusOk(res.ok)
    } catch (error) {
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
    if (isStatusOk) {
      console.log("from login", isStatusOk)
      return (
        <div>
          <Redirect to={{ pathname: "/restaurant", state: { userDetails } }} />{" "}
        </div>
      )
    }
  }

  return (
    <Fragment>
      <LoginForm onSubmit={onSubmit} loginAction={loginAction} />
    </Fragment>
  )
}

export default Login
