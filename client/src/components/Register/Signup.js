import React, { useState } from "react"
import useForm from "react-hook-form"
import { Link, Redirect } from "react-router-dom"
import styled from "styled-components"

const Title = styled.h1`
  margin-top: 25px;
  font-size: 30px;
  font-weight: 500;
`

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
`

const StyledLink = styled(Link)`
  color: #db741e;
`

const Label = styled.label`
  display: block;
  margin-bottom: 13px;
  margin-top: 20px;
  font-size: 20px;
  font-weight: 300;
`

const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`

const Submit = styled.input`
  width: 30%;
  margin-top: 5%;
  left: auto;
  right: auto;
  cursor: pointer;
  border: none;
  font-size: 15px;
  font-weight: 600;
  height: 50px;
  color: #fff;
  background-color: #fc8019;
  text-transform: uppercase;
`

const Signup = () => {
  // const [status, setStatus] = useState(false)
  const [isStatusOk, setStatusOk] = useState(false)
  const [responseBody, setResponseBody] = useState({})
  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur"
  })

  const onSubmit = async data => {
    try {
      let res = await fetch("https://tummypolice.iyangi.com/api/v1/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      let result = await res.json()
      console.log("res from await", res, result)
      setResponseBody(result)
      setStatusOk(res.ok)
    } catch (error) {
      console.log(error)
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
    <Wrapper>
      {renderPage()}
      <Title>Sign Up</Title>
      Or <StyledLink to="/login">Login to your account</StyledLink>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label>Phone number</Label>
          <Input
            type="text"
            name="phone"
            ref={register({ required: true, pattern: /^\d{10}$/ })}
            placeholder="Phone number"
          />
          {errors.phone && "Enter valid phone number"}
        </div>

        <div>
          <Label>Name</Label>
          <Input
            type="text"
            name="username"
            ref={register({ required: true, maxLength: 20 })}
            placeholder="Name"
          />
          {errors.username && "Enter your name"}
        </div>

        <div>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            ref={register({ required: true, maxLength: 30 })}
            placeholder="Email"
          />
          {errors.email && "Invalid email address"}
        </div>

        <div>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            ref={register({ required: true, minLength: 6, maxLength: 20 })}
            placeholder="Password"
          />
          {errors.password && "Password should be min 6 chars"}
        </div>

        <Submit type="submit" value="Sign Up" />
      </form>
    </Wrapper>
  )
}

export default Signup
