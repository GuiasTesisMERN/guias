import React from 'react'

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

import Menu from "./Menu";
import Footer from "./Footer";

const Layout = ({children}) => {
  return (
    <>
      <Menu />
      <Container 
        component={Paper}
        elevation={3}
        maxWidth="xl"
        sx={{
          margin: '3rem auto',
          padding: '3rem 50px'
        }}
      >
        {children}
      </Container>
      <Footer/>
    </>
  )
}

export default Layout;