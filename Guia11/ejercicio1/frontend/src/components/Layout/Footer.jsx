import React from 'react';

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Box component="footer" sx={{
        /*width: '100%',
        height: '100px',
        position: 'relative',
        backgroundColor: 'primary.main',
        overflow: 'hidden',
        bottom: 0,
        */
        backgroundColor: 'primary.main',
        height: '4.5rem',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }}>
        <Typography variant='body1' color="white">
            Footer - Ejemplo
        </Typography>
    </Box>
  )
}

export default Footer;