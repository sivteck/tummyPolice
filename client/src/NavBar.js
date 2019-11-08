import React from "react"
import { AppBar, Toolbar, Typography } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import Logo from "./images/logoicon.png"
import AccountCircle from "@material-ui/icons/AccountCircle"
import styled from "styled-components"
import Button from "@material-ui/core/Button"
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
  padding: '15px'
}

const NavBar = (props) => {
  console.log(props)
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
            Sign In
          </Typography>
        </IconButton>

        <IconButton style={{ backgroundColor: 'transparent' }} >
        <Badge badgeContent={4} color="secondary">
          <ShoppingCartIcon />
          </Badge>
          <Typography variant="h5" noWrap style = {inlineStyle}>
            Cart
          </Typography>
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  )
}

export default NavBar
