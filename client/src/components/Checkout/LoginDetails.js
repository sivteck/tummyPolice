import React, { Fragment } from "react"

import useForm from "react-hook-form"
import styled from "styled-components"
import { Link } from "react-router-dom"

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

const LoginDetails = () => {
  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur"
  })

  const userDetails = JSON.parse(localStorage.getItem("userDetails"))

  return (
    <Fragment>
      {userDetails === null && (
        <section>
          <Title>Login</Title>
          Or <StyledLink to="/signup">Create your account</StyledLink>
          <form>
            <Label>Phone number</Label>
            <Input
              type="text"
              name="phone"
              ref={register({ required: true, pattern: /^\d{10}$/ })}
              placeholder="Phone number"
            />
            {errors.phone && "Enter valid phone number"}
            <Submit type="submit" value="Login" />
            {/* {loginAction()} */}
          </form>
        </section>
      )}
    </Fragment>
  )
}

export default LoginDetails
