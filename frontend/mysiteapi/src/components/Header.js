import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link, useNavigate} from "react-router-dom";
// import { styled, alpha } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';
// import {useState} from "react";
// import {useState} from "react";
import { Search, SearchIconWrapper, MyComponent} from "./SearchBar";
import {useState} from "react";

const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: 'whitesmoke'
};




export default function ButtonAppBar() {
  const navigateTo = useNavigate();
  const [data, setData] = useState({search: ''});

  const goSearch = (e) => {
    navigateTo({
      pathname: '/search/',
      search: '?search=' + data.search,
    });
    window.location.reload();
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigateTo('/')}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <span style={{cursor: "pointer"}} onClick={() => navigateTo('/')}>News</span>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <MyComponent />
          </Search>
          <Link
              style={{color: "darkgray", fontSize: "12px", textDecoration: "none"}}
              to="/register">register</Link>
          <Link to="/login" style={linkStyle}>LOGIN</Link>
          <Link to="/logout" style={linkStyle}>LOGOUT</Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
