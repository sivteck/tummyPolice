import React, { useState, Fragment } from "react"
import { Redirect } from "react-router-dom"
import SignupForm from "./SignupForm"
import { postRequest } from "../../Utils/postRequest"
import URL from "../../config"

const Signup = () => {
  const [isStatusOk, setStatusOk] = useState(false)
  const [responseBody, setResponseBody] = useState({})

  const onSubmit = async data => {
    const { response, result, error } = await postRequest(
      `${URL}/register`,
      data
    )
    if (response) {
      setResponseBody(result)
      setStatusOk(response.ok)
    }
    if (error) {
      setStatusOk(false)
    }
  }

  function renderPage() {
    if (isStatusOk && responseBody.hasOwnProperty("error")) {
      return (
        <div>
          <h3 style={{ textTransform: "capitalize" }}>{responseBody.error}</h3>
        </div>
      )
    }
    if (isStatusOk) {
      return (
        <div>
          <Redirect to="/login" />
        </div>
      )
    }
  }

  return (
    <Fragment>
      <SignupForm renderPage={renderPage} onSubmit={onSubmit} />
    </Fragment>
  )
}

export default Signup
