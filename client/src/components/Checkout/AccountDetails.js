import React, { useState, Fragment } from "react"
import styled from "styled-components"
import LoginDetails from "./LoginDetails"
import UserLogin from "./UserLogin"

const Section = styled.section`
  padding: 10px;
  margin: 10px;
  height: fit-content;

  background: #e9ecee;
`

const Button = styled.button`
  width: 150px;
  margin: 30px 10px 10px 10px;
  cursor: pointer;
  border: none;
  font-size: 15px;
  font-weight: 600;
  height: 50px;
  color: #fff;
  background-color: #fc8019;
  text-transform: uppercase;
`

const H1 = styled.h1`
  text-align: left;
  padding-bottom: 15px;
  font-size: 32px;
  font-weight: 600;
`

const AccountDetails = () => {
  const [accountAction, setAccountSection] = useState("account")

  console.log(accountAction === "account")
  return (
    <Fragment>
      {accountAction === "account" && (
        <Section>
          <H1>Account</H1>
          <p>
            To place your order now, log in to your existing account or sign up.
          </p>
          <Button onClick={() => setAccountSection("login")}> LOG IN</Button>
          <Button onClick={() => setAccountSection("signup")}> SIGN UP</Button>
        </Section>
      )}
      {accountAction === "login" && <LoginDetails />}
    </Fragment>
  )
}

export default AccountDetails
