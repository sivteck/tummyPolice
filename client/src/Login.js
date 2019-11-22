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

const Submit = styled.input.attrs({
  type: "submit",
  value: "Login"
})`
  width: 30%;
  margin-top: 5%;
  cursor: pointer;
  border: none;
  font-size: 15px;
  font-weight: 600;
  height: 50px;
  color: #fff;
  background-color: #fc8019;
  text-transform: uppercase;
`

const Login = () => {
  const [isStatusOk, setStatusOk] = useState(false)
  const [userDetails, setUserDetails] = useState({})
  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur"
  })

  const onSubmit = async data => {
    try {
      let res = await fetch("https://tummypolice.iyangi.com/api/v1/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })

      let result = await res.json()
      setUserDetails(result)
      setStatusOk(res.ok)
    } catch (error) {
      setStatusOk(false)
    }
  }

  function renderPage() {
    if (isStatusOk && userDetails.hasOwnProperty("error")) {
      return (
        <div>
          <p style={{ textTransform: "capitalize" }}>{userDetails.error}</p>
        </div>
      )
    }
    if (isStatusOk) {
      return (
        <div>
          <Redirect to={{ pathname: "/restaurant", state: { userDetails } }} />{" "}
        </div>
      )
    }
  }

  return (
    <Wrapper>
      <Title>Login</Title>
      Or <StyledLink to="/signup">Create your account</StyledLink>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label>Phone number</Label>
        <Input
          type="text"
          name="phone"
          ref={register({ required: true, pattern: /^\d{10}$/ })}
          placeholder="Phone number"
        />
        {errors.phone && "Enter valid phone number"}
        <Submit type="submit" value="Login" />
        {renderPage()}
      </form>
    </Wrapper>
  )
}

export default Login
