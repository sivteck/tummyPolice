import React, { useState, useEffect } from "react"
import { Link, Redirect } from "react-router-dom"
import styled from "styled-components"

const Wrapper = styled.div`
  display: table;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  /* border: 1px solid #bebfc5; */
  height: 50px;
  width: 500px;
`

const Input = styled.input`
  border: none;
  padding: 15px;
  width: 80%;
`

const Span = styled.span`
  position: absolute;
  right: 60px;
  padding: 18px;
  color: #535665;
  font-size: 13px;
  cursor: pointer;
`

const Submit = styled.input.attrs({
  type: "submit",
  value: "Find Food"
})`
  color: white;
  padding: 15px;
  text-decoration: none;
  position: absolute;
  background-color: #db741e;
  color: #fff;
  width: 100px;
  border: none;
`

function Location() {
  const [location, setLocation] = useState({ predictions: [] })
  const [inputValue, setInputValue] = useState("")
  const [isStatusOk, setStatusOk] = useState(false)

  async function fetchData() {
    try {
      let res = await fetch(
        `https://tummypolice.iyangi.com/api/v1/place/autocomplete/json?input=${inputValue}`
      )
      let data = await res.json()
      setLocation(data)
      setStatusOk(res.ok)
    } catch (error) {
      console.log(error)
      setStatusOk(false)
    }
  }

  const handleChange = event => {
    if (event.target.value.length > 3) {
      setInputValue(event.target.value)
    }
  }

  useEffect(() => {
    fetchData()
  }, [inputValue])

  const populateDataList = () => {
    if (inputValue.length > 0)
      return (
        <div>
          <datalist id="places">
            {location.predictions.map(item => (
              <option key={item.description} value={item.description}>
                {item.description}
              </option>
            ))}
          </datalist>
        </div>
      )
  }

  const onSubmit = () => <Redirect to="/restaurant" />

  return { isStatusOk } ? (
    <Wrapper>
      <form onSubmit={onSubmit()}>
        <Input
          id="input"
          type="text"
          placeholder="Enter your delivery location"
          maxlength="50"
          list="places"
          onChange={handleChange}
        />
        <Span>Locate Me</Span>
        <Submit type="submit" value="Find Foood" />
        {populateDataList()}
      </form>
      {/* <StyledLink to="/restaurant">Find Food</StyledLink> */}
    </Wrapper>
  ) : (
    <div>Unable to locate</div>
  )
}

export default Location
