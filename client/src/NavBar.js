import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AppBar, Toolbar, Typography } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import Logo from "./images/logoicon.png"
import styled from "styled-components"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import PermIdentityIcon from "@material-ui/icons/PermIdentity"
import Badge from "@material-ui/core/Badge"

const StyledAppBar = styled(AppBar)`
  && {
    background-color: #fff;
    box-shadow: none;
  }
`
const inlineStyle = {
  FontWeight: 400,
  color: "black",
  padding: "15px",
  textTransform: "capitalize"
}

const NavBar = props => {
  const [cart, setCart] = useState({ cartItems: {} })
  const [fetchStatus, setFetchStatus] = useState(false)

  let cartLength
  if (cart.cartItems === undefined) cartLength = 0
  else cartLength = Object.keys(cart.cartItems).length
  let userName = props.userDetails.username

  async function fetchData() {
    try {
      let res = await fetch("https://tummypolice.iyangi.com/api/v1/cart")
      let data = await res.json()
      setFetchStatus(res.ok)
      setCart(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { fetchStatus } ? (
    <StyledAppBar position="static">
      <Toolbar>
        <img src={Logo} alt="logo" />

        <Typography
          variant="h5"
          noWrap
          style={{ flex: 2, textAlign: "center" }}
        >
          {/* TummyPolice */}
        </Typography>

        <IconButton style={{ backgroundColor: "transparent" }}>
          <PermIdentityIcon />
          <Typography variant="h5" noWrap style={inlineStyle}>
            {userName}
          </Typography>
        </IconButton>

        <Link to="/checkout">
          <IconButton style={{ backgroundColor: "transparent" }}>
            <Badge badgeContent={cartLength} color="secondary">
              <ShoppingCartIcon />
            </Badge>
            <Typography variant="h5" noWrap style={inlineStyle}>
              Cart
            </Typography>
          </IconButton>
        </Link>
      </Toolbar>
    </StyledAppBar>
  ) : (
    <div>Unable to create Nav bar </div>
  )
}

export default NavBar
