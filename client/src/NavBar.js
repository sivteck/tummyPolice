import React from 'react'
import {AppBar, Toolbar, Typography} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Logo from "./images/logo.png"
import AccountCircle from '@material-ui/icons/AccountCircle'


const NavBar =() => {
    return (
        <AppBar position="static">
        <Toolbar>
        <IconButton edge="start"  color="inherit" aria-label="menu">
            {/* <Logo /> */}
          </IconButton>
          <Typography  variant="h5" noWrap>
            TummyPolice
          </Typography>
          <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>

        </Toolbar>
      </AppBar>
    )
}

export default NavBar
