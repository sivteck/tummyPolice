import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
`;

function Location() {
  const [location, setLocation] = useState({ predictions: [] });
  const [inputValue, setInputValue] = useState([]);

  async function fetchData() {
    try {
      console.log("inp from fetch",inputValue)
      let res = await fetch(
        `https://tummypolice.iyangi.com/api/v1/place/autocomplete/json?input=${inputValue}`
      )
      let data = await res.json()
      setLocation(data);
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = event => {
    console.log("length", event.target.value.length);
    if (event.target.value.length > 3) {
      setInputValue(event.target.value);
      // fetchData();
    }
  }

useEffect(() => {fetchData()}, [inputValue])

  const populateDataList = () => {
    if (inputValue.length > 0) {
      console.log("gfh", inputValue);
      //   console.log("populatedata", data)
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
  }

  return (
    <div class="location">
      <form >
        <input
          id="input"
          type="text"
          placeholder="Enter your delivery location"
          maxlength="50"
          list="places"
          onChange={handleChange}
        />
        {populateDataList()}
        <span>Locate Me</span>
        <input type="submit" value="Find Foood" />
      </form>
      {/* <StyledLink to="/restaurant">Find Food</StyledLink> */}
    </div>
  );
}

export default Location;
