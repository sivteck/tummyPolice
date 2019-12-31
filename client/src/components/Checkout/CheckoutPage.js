import React, { Fragment } from "react"
import Checkout from "./Checkout"
import NavBar from "../Navbar/NavBar"
import styled from "styled-components"
import AccountDetails from "./AccountDetails"

const CheckoutPage = () => {
  const Section = styled.section`
    display: grid;
    grid-template-columns: 60% 40%;
    margin: 10px;
    padding: 10px;
  `
  return (
    <Fragment>
      <NavBar />
      <Section>
        <AccountDetails />
        <Checkout />
      </Section>
    </Fragment>
  )
}

export default CheckoutPage
