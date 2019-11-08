import React, {useEffect, useState} from "react"
import { Link} from "react-router-dom"
import { AppBar, Toolbar, Typography } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import Logo from "./images/logoicon.png"
import styled from "styled-components"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Badge from '@material-ui/core/Badge';


// const StyledButton = styled(Button)`
//   background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
//   border-radius: 3px;
//   border: 0;
//   color: white;
//   height: 48px;
//   padding: 0 30px;
//   box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);

// `;


const StyledAppBar = styled(AppBar)`
  && {
     background-color: #fff;
    //  background: transparent;
     box-shadow: none
  }
`

const inlineStyle = {
  FontWeight: 400,
  color: 'black',
  padding: '15px',
  textTransform : 'capitalize'
}

const NavBar = (props) => {
 
  const [cartItems, setCartItems] = useState({cart:{}})
  console.log("carttt..", cartItems,Object.keys(cartItems.cart).length)
  let cartLength = Object.keys(cartItems.cart).length
  let userName = props.userDetails.username
  async function fetchData() {
    try {
      let res = await fetch("http://tummypolice.iyangi.com/api/v1/cart")
      let data = await res.json()

      setCartItems(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])




  console.log("props...",props.userDetails.username)
  return (
    <StyledAppBar position="static" >
      <Toolbar > 
      <img src={Logo} alt="logo" />
      
        <Typography variant="h5" noWrap style={{flex : 2, textAlign: "center"}}>
          {/* TummyPolice */}
        </Typography>

        <IconButton style={{ backgroundColor: 'transparent' }} >
          <PermIdentityIcon />
          <Typography variant="h5" noWrap style = {inlineStyle}>
            {userName}
          </Typography>
        </IconButton>
<Link to ="/checkout">
        <IconButton style={{ backgroundColor: 'transparent' }} >
        <Badge badgeContent={cartLength} color="secondary">
          <ShoppingCartIcon />
          </Badge>
          <Typography variant="h5" noWrap style = {inlineStyle}>
            Cart
          </Typography>
        </IconButton>
</Link>
      </Toolbar>
    </StyledAppBar>
  )
}

export default NavBar
