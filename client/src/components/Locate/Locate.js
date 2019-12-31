import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import { Wrapper, Input, Submit } from "./styles"
import CheckStatus from "../Checkstatus/CheckStatus"
import PopulateDataList from "./PopulateDataList"
import URL from "../../config"

const Locate = () => {
  const [location, setLocation] = useState({ predictions: [] })
  const [inputValue, setInputValue] = useState("")
  const [isStatusOk, setStatusOk] = useState(true)
  const [isSubmit, setSubmit] = useState(false)

  const handleChange = ({ target }) => {
    if (target.value.length > 3) setInputValue(target.value)
  }

  const redirectPage = () => {
    if (isSubmit) {
      const placeName = document.getElementById("input").value.split(":")[0]
      const placeId = document.getElementById("input").value.split(":")[1]
      const place = localStorage.setItem("Delivery Address", placeName)
      return (
        <Redirect
          to={{ pathname: "/restaurant", state: { locationId: placeId } }}
        />
      )
    }
  }

  const fetchData = async input => {
    if (input.length > 0) {
      try {
        let res = await fetch(`${URL}/place/autocomplete/json?input=${input}`)
        let data = await res.json()
        setLocation(data)
        setStatusOk(res.ok)
      } catch (error) {
        setStatusOk(false)
      }
    }
  }

  useEffect(() => {
    fetchData(inputValue)
  }, [inputValue])

  return (
    <Wrapper>
      {/* <CheckStatus status={isStatusOk} /> */}
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
          list="places"
          onChange={handleChange}
        />

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
