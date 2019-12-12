import React from "react"
import Logo from "../images/logo.png"
import styled from "styled-components"
import URL from "../../config"

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

function Login() {
  const onSubmit = async data => {
    console.log("submit")
    let res = await fetch(`${URL}/deliveryPartner`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    await res.json()
  }

  return (
    <Wrapper>
      <img className="logo" src={Logo} alt="" />
      <form style={{ display: "grid" }}>
        <Label>Enter your DE ID</Label>
        <Input type="number" name="id" />
        <br />
        <Submit type="submit" value="Submit" />
      </form>
    </Wrapper>
  )
}

export default Login
