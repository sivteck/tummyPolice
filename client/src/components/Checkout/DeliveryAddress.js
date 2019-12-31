import React, { useState, useEffect, Fragment } from "react"
import { reverseGeocode } from "../../Utils/reverseGeocode"

import styled from "styled-components"

const H1 = styled.h1`
  text-align: left;
  padding-bottom: 15px;
  font-size: 32px;
  font-weight: 600;
`

const P = styled.p`
  text-transform: capitalize;
  font-weight: 500;
  margin-top: 5px;
  font-size: 20px;
`

const DeliveryAddress = () => {
  const [address, setAddress] = useState("")

  useEffect(() => {
    const deliveryAddress = localStorage.getItem("Delivery Address")
    if (!deliveryAddress || deliveryAddress.length === 0) {
      let location = JSON.parse(localStorage.getItem("location"))
      console.log("locl", location)
      const fetchAddress = async () => {
        setAddress((await reverseGeocode(location)).LongLabel)
      }
      fetchAddress()
    } else {
      setAddress(deliveryAddress)
    }
  }, [])
  console.log("addressfghfg", address)
  return (
    <Fragment>
      <H1>Delivery Address</H1>
      <P>{address}</P>
    </Fragment>
  )
}

export default DeliveryAddress
