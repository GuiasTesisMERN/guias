import React, { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuMui from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import AdbIcon from '@mui/icons-material/ListAlt';
import MenuIcon from '@mui/icons-material/Menu';

import { Link } from 'react-router-dom';

const pages = [
    {titulo: 'Inicio', url: '/'},
    {titulo: 'Login', url: '/login'},
    {titulo: 'Registrarse', url: '/registrarse'}
];

const Menu = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (e) => {
        setAnchorElNav(e.currentTarget);
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    }

    const styleTypography = {
        mr: 2,
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none'
    }

    return (
        <AppBar position='static'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: {xs: 'none', md: 'flex'}, mr: 1 }} />
                    <Typography variant='h6' noWrap component={Link} to="/"
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            ...styleTypography
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size='large'
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <MenuMui
                            id="menu-appbar" anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                            }} keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }} open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' }
                            }}
                        >
                            {pages.map((pagina, key) => (
                                <MenuItem key={key} onClick={handleCloseNavMenu}
                                    component={Link} to={pagina.url}
                                >
                                    <Typography textAlign="center">{pagina.titulo}</Typography>
                                </MenuItem>
                            ))}
                        </MenuMui>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography variant="h5" noWrap component={Link} to="/"
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            ...styleTypography
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((pagina, key) => (
                            <Button
                                key={key} onClick={handleCloseNavMenu}
                                LinkComponent={Link} to={pagina.url}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {pagina.titulo}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Menu