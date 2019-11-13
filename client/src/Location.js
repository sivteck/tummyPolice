import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const StyledLink = styled(Link)`
  color: white;
  padding: 1em 1em;
  -webkit-text-decoration: none;
  text-decoration: none;
  position: absolute;
  background-color: #db741e;
  color: #fff;
  width: 75px;
  border: none;
  height: 15px;
`

function Location() {
  const [location, setLocation] = useState({predictions: []})

  async function fetchData() {
    try {
      let res = await fetch("http://localhost:3000/place/auontocomplete/json")
      let data = await res.json()
      setLocation(data)
    } catch (error) {
      // console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


// console.log(Object.keys(location).length)

  // if(Object.keys(location).length !== 0){
  // console.log("location..", location.predictions, location.length)
  // let optionList = location.predictions.map(item => <option key = {item.description}> {item.description} </option>)
  // }
  let optionList = location.predictions.map(item => <option key = {item.description}> {item.description} </option>)
console.log("optionList...", optionList) 
// console.log("location...", location)

const populateDropDown = (event) => {
// console.log(event.target.value.length)
if(event.target.value.length  > 3){
  console.log(event.target.value.length)
  return (
    <datalist id = "places">
    {location.predictions.map(item => <option key = {item.description} value = {item.description} > {item.description} </option>)} 
  </datalist> 
  )
}
}

  return (
    <div class="location">
      <form onSubmit = {fetchData}>
      <input id="input"
        type="text"
        placeholder="Enter your delivery location"
        maxlength="50" list="places"
        onChange= {populateDropDown}
      />
         {/* <datalist id = "places">
           {location.predictions.map(item => <option key = {item.description} value = {item.description} > {item.description} </option>)} 
         </datalist>  */}
      
      <span>Locate Me</span>
      <input type = "submit" value ="Find Foood" />
      </form>
      {/* <StyledLink to="/restaurant">Find Food</StyledLink> */}
    
    </div>
  )
}

export default Location
