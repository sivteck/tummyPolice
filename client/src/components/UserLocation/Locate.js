import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import { Wrapper, Input, Submit, Span } from "./styles"
import CheckStatus from "../CheckStatus"
import PopulateDataList from "./PopulateDataList"

const Locate = () => {
  const [location, setLocation] = useState({ predictions: [] })
  const [inputValue, setInputValue] = useState("")
  const [isStatusOk, setStatusOk] = useState(true)
  const [isSubmit, setSubmit] = useState(false)
  const [input, setInput] = useState("")

  const handleChange = ({ target }) => {
    if (target.value.length > 3) setInputValue(target.value)
  }

  const redirectPage = () => {
    if (isSubmit) {
      const inp = document.getElementById("input").value.split(":")[1]
      console.log("inp value", inp)
      console.log("location", location)
      return (
        <Redirect
          to={{ pathname: "/restaurant", state: { locationId: inp } }}
        />
      )
    }
  }

  const fetchData = async input => {
    try {
      let res = await fetch(
        `https://tummypolice.iyangi.com/api/v1/place/autocomplete/json?input=${input}`
      )
      let data = await res.json()
      setLocation(data)
      setStatusOk(res.ok)
    } catch (error) {
      setStatusOk(false)
    }
  }

  useEffect(() => {
    fetchData(inputValue)
  }, [inputValue])

  return (
    <Wrapper>
      <CheckStatus status={isStatusOk} />
      <form
        onSubmit={event => {
          event.preventDefault()
          setSubmit(true)
        }}
      >
        <Input
          id="input"
          type="text"
          placeholder="Enter your delivery location"
          // maxlength="50"
          list="places"
          onChange={handleChange}
        />
        <Span>Locate Me</Span>
        <Submit type="submit" value="Find Food" />
        <PopulateDataList
          inputValueLength={inputValue.length}
          predictions={location.predictions}
        />
      </form>
      {redirectPage()}
    </Wrapper>
  )
}

export default Locate
