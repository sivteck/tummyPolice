import React, { useState } from "react"
import Logo from "../../images/logo.png"
import styled from "styled-components"
import URL from "../../config"

import { Redirect } from "react-router-dom"

const Label = styled.label`
  display: block;
  font-size: 20px;
  font-weight: 300;
  margin-left: auto;
  margin-right: auto;
`
const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  //   border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  @media screen and (max-width: 500px) {
    width: 100%;
    padding: 10px;
  }
`

const Input = styled.input`
  width: 50%;
  padding: 12px 20px;
  margin-left: auto;
  margin-right: auto;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`

const Submit = styled.input.attrs({
  type: "submit",
  value: "Submit"
})`
  width: 30%;
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
  padding: 5px;
  cursor: pointer;
  border: none;
  //   font-size: 15px;
  //   font-weight: 600;
  height: 50px;
  color: #fff;
  background-color: #fc8019;
  text-transform: uppercase;
`

function RestaurantLogin() {
  const [isStatusOk, setStatusOk] = useState(false)
  const [response, setResponse] = useState({})
  const [inputValue, setInputValue] = useState("")

  const handleChange = ({ target }) => {
    setInputValue(target.value)
  }

  const onSubmit = async inputValue => {
    console.log("submit", inputValue)
    try {
      let res = await fetch(`${URL}/restaurant/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ restaurantName: inputValue })
      })
      let result = await res.json()
      setResponse(result)
      setStatusOk(res.ok)
    } catch (error) {
      setStatusOk(false)
    }
  }

  function loginAction() {
    if (isStatusOk && response.hasOwnProperty("error")) {
      return (
        <div>
          <p style={{ textTransform: "capitalize" }}>{response.error}</p>
        </div>
      )
    }
    if (isStatusOk) {
      console.log("from login", isStatusOk)
      return (
        <div>
          <Redirect to="/restaurantapp/orders" />
        </div>
      )
    }
  }

  return (
    <Wrapper>
      <img className="logo" src={Logo} alt="" />
      <form
        style={{ display: "grid" }}
        onSubmit={e => {
          e.preventDefault()
          onSubmit(inputValue)
        }}
      >
        <Label>Enter Restaurant Name</Label>
        <Input type="text" name="name" required="true" onBlur={handleChange} />
        <br />
        <Submit type="submit" value="Submit" />
        {loginAction()}
      </form>
    </Wrapper>
  )
}

export default RestaurantLogin
