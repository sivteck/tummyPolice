import React, { Fragment } from "react"
import Checkout from "./Checkout"
import NavBar from "../Navbar/NavBar"
import styled from "styled-components"
import AccountDetails from "./AccountDetails"
import UserLogin from "./UserLogin"
import DeliveryAddress from "./DeliveryAddress"

const Section = styled.section`
  display: grid;
  grid-template-columns: 60% 40%;
  margin: 10px;
  padding: 10px;
`

const CheckoutPage = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"))
  return (
    <Fragment>
      <NavBar />
      <Section>
        {userDetails && <UserLogin />}
        {!userDetails && <AccountDetails />}
        <Checkout />
      </Section>
    </Fragment>
  )
}

export default CheckoutPage
