import React, { useState, Fragment } from "react"
import { Redirect } from "react-router-dom"
import URL from "../../config"
import LoginForm from "./LoginForm"
import { postRequest } from "../../Utils/postRequest"

const Login = () => {
  const [isStatusOk, setStatusOk] = useState(false)
  const [userDetails, setUserDetails] = useState({})

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
