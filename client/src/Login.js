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
  const [isLoggedIn, setLogIn] = useState()
  const [userDetails, setUserDetails] = useState({})
  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur"
  })
  const onSubmit = async data => {
    let res = await fetch("http://tummypolice.iyangi.com/api/v1/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    let result = await res.json()
    setUserDetails(result)
    setLogIn(res.status)
  }

  function renderPage() {
    if (isLoggedIn === 200) {
      return (
        <div>
          <Redirect to={{ pathname: "/restaurant", state: { userDetails } }} />{" "}
        </div>
      )
    }
    if (isLoggedIn === 401) {
      return (
        <div>
          <h1>Account doesn't exist</h1>
          <div>
            <a href="javascript:window.location.reload(true)">
              Click here to Login
            </a>
          </div>
          Or
          <div>
            <Link to="/signup">Click here to Create New Account</Link>
          </div>
        </div>
      )
    }
    return (
      <div>
        <a class="closebtn">&times;</a>
        <Title>Login</Title>
        Or <StyledLink to="/signup">Create your account</StyledLink>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label>Phone number</Label>
          <Input
            type="number"
            name="phone"
            ref={register({ required: true, pattern: /^\d{10}$/ })}
            placeholder="Phone number"
          />
          {errors.phone && "Enter valid phone number"}
          <Submit type="submit" value="Login" />
        </form>
      </div>
    )
  }

  return <Wrapper>{renderPage()}</Wrapper>
}

export default Login
