import React, { useState, useEffect, Fragment } from "react"
import Cart from "../Cart/Cart"
import { CartProvider } from "../Cart/CartContext"
import { useParams } from "react-router-dom"
import URL from "../../config"
import CheckStatus from "../Checkstatus/CheckStatus"
import MenuItems from "./MenuItems"
import NavBar from "../Navbar/NavBar"
import styled from "styled-components"

const Article = styled.article`
  display: grid;
  grid-template-rows: 15% 80%;
  padding: 10px;
  padding-top: 20px;
`
const Section1 = styled.section`
  background-color: #e9ecee;
  height: fit-content;
  display: flex;
  padding: 10px;
`

const H1 = styled.h1`
  padding: 30px;
  font-weight: 300;
  font-size: 32px;
  text-align: left;
`
const H2 = styled.h2`
  padding-left: 30px;
  font-size: 14px;
  font-weight: 30;
  text-align: left;
`

const Section2 = styled.section`
  display: flex;
  flex-direction: row;
  margin: 20px;
  padding: 20px;
`

const InnerSection1 = styled.section`
  flex-basis: 70%;
`

const InnerSection2 = styled.section`
  flex-basis: 30%;
  margin: 10px;
  padding: 20px;
  text-transform: capitalize;
  height: fit-content;
  background: #e9ecee;
`

const Menu = ({ location }) => {
  const [menuItems, setMenuItems] = useState([])
  const [isStatusOk, setStatusOk] = useState(true)
  const [restaurantDetails, setRestaurantDetails] = useState("")

  console.log(restaurantDetails)

  const { id } = useParams()

  console.log("props from restaurant", location)

  const fetchData = async () => {
    try {
      let menuResponse = await fetch(`${URL}/menu?restaurantid=${id}`)
      let menuResult = await menuResponse.json()
      let restaurantResponse = await fetch(`${URL}/restaurant/info?id=${id}`)
      let restaurantResult = await restaurantResponse.json()
      setStatusOk(menuResponse.ok)
      setMenuItems(menuResult)
      setRestaurantDetails(restaurantResult)
    } catch (error) {
      setStatusOk(false)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const header = document.getElementById("stickySection")
    const sticky = header.offsetTop
    window.onscroll = () => {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky")
      } else {
        header.classList.remove("sticky")
      }
    }
  }, [])

  return (
    <Fragment>
      <NavBar />
      <CartProvider>
        <CheckStatus status={isStatusOk} />
        <Article>
          <Section1 id="stickySection">
            <img
              src={location.state.image}
              style={{ width: "254px", height: "160px", padding: "30px" }}
            />
            <hgroup>
              <H1>{location.state.name}</H1>
              <H2>{restaurantDetails.city}</H2>
            </hgroup>
          </Section1>
          <Section2>
            <InnerSection1>
              <MenuItems menuItems={menuItems} id={id} key={id} />
            </InnerSection1>
            <InnerSection2>
              <Cart restaurantId={id} />
            </InnerSection2>
          </Section2>
        </Article>
      </CartProvider>
    </Fragment>
  )
}

export default Menu
