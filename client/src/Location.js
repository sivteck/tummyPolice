import React from 'react'
import { Link, Redirect } from "react-router-dom"
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
`;

// const redirect = () =>  <Redirect to= "/restaurant" />

function Location(){
    return (
        <div class="location">
        <input type="text" placeholder="Enter your delivery location" maxlength="50"/>
        <span>Locate Me</span>
        <StyledLink to="/restaurant">Find Food</StyledLink>
    </div>
    )
}

export default Location