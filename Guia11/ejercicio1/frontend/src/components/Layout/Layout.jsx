import React from 'react'

import Container from "@mui/material/Container";

import Menu from "./Menu";
import Footer from "./Footer";

const Layout = ({children}) => {
  return (
    <>
      <Menu />
      <Container
        elevation={3}
        maxWidth='xl'
        sx={{
          margin: '3rem 0px',
          //padding: '3rem 0px',

          position: 'relative',
        }}
      >
        {children}
      </Container>
      <Footer/>
    </>
  )
}

export default Layout;