import React, { useState } from "react"
import useForm from "react-hook-form"
import { Link } from "react-router-dom"

const Signup = () => {
  const [statusCode, setStatusCode] = useState()
  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur"
  })
  const onSubmit = (data, e) => {
    // console.log('Submit event', e)
    // alert(JSON.stringify(data))

    fetch("http://tummypolice.iyangi.com/api/v1/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(resp => {
        console.log(resp.status)
        setStatusCode(resp.status)
        return resp.json()
      })
      .then(response => console.log(response, response.id))
  }

  function renderPage() {
    if (statusCode === 201) {
      return (
        <div>
          <h1>Your accoount has been created successfully</h1>
          <Link to="/login">
            <a>Click here to Login</a>
          </Link>
        </div>
      )
    }
    if (statusCode === 200) {
      return (
        <div>
          <h1>Account already exist</h1>
          <div>
            {" "}
            <Link to="/login">
              <a>Click here to Login</a>
            </Link>{" "}
          </div>
          Or
          <div>
            {" "}
            <a href="javascript:window.location.reload(true)">
              Click here to Create New Account
            </a>{" "}
          </div>
        </div>
      )
    }
    return (
      <div>
        <h1>Sign Up</h1>
        Or{" "}
        <Link to="/login">
          <a>Login to your account</a>
        </Link>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Phone number</label>
            <input
              type="number"
              name="phone"
              ref={register({ required: true, pattern: /^\d{10}$/ })}
              placeholder="Phone number"
            />
            {errors.phone && "Enter valid phone number"}
          </div>

          <div>
            <label>Name</label>
            <input
              type="text"
              name="username"
              ref={register({ required: true, maxLength: 20 })}
              placeholder="Name"
            />
            {errors.username && "Enter your name"}
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              ref={register({ required: true, maxLength: 30 })}
              placeholder="Email"
            />
            {errors.email && "Invalid email address"}
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              ref={register({ required: true, minLength: 6, maxLength: 20 })}
              placeholder="Password"
            />
            {errors.password && "Password should be min 6 chars"}
          </div>

          <input type="submit" />
        </form>
      </div>
    )
  }

  return <div className="signUpForm">{renderPage()}</div>
}

export default Signup
