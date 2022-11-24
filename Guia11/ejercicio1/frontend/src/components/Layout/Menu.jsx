import React, { useContext } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuMui from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import AdbIcon from '@mui/icons-material/ListAlt';
import MenuIcon from '@mui/icons-material/Menu';

import { Link, useLocation } from 'react-router-dom';
import { UserContext } from './../../Context/UserContext';

const Menu = () => {
    const { user, logout } = useContext(UserContext)
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const {pathname} = useLocation();

    let pages = [
        {titulo: 'Inicio', url: '/', privada: true},
        {titulo: 'Tareas', url: '/tareas', privada: true},
        {titulo: 'Usuarios', url: '/listado_usuarios', privada: true},
        {titulo: 'Login', url: '/login', privada: false},
        {titulo: 'Registrarse', url: '/registrarse', privada: false}
    ];

    pages = pages.filter(v => { 
        if(user?.estado) {
            return v.privada
        }
        return !v.privada;
    });

    const handleOpenNavMenu = (e) => {
        setAnchorElNav(e.currentTarget);
      };

    const handleOpenUserMenu = (e) => {
        setAnchorElUser(e.currentTarget);
    };
    
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

  const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

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
                                    disabled={pathname === pagina.url}
                                    sx={{
                                        '&.Mui-disabled': {
                                            boxSizing: 'border-box',
                                            borderLeft: '2px solid black',
                                            borderRadius: '0px'
                                        }
                                    }}
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
                                disabled={pathname === pagina.url}
                                LinkComponent={Link} to={pagina.url}
                                sx={{   my: 2, 
                                        color: 'white', 
                                        display: 'block',
                                        '&.Mui-disabled': {
                                            color: 'white',
                                            boxSizing: 'border-box',
                                            borderBottom: '2px solid white',
                                            borderRadius: '0px'
                                        }
                                    }}
                            >
                                {pagina.titulo}
                            </Button>
                        ))}
                    </Box>
                    {
                        user['estado'] ? (
                            <Box>
                                <Tooltip title={"Hola, " + user['nombres']}>
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt={user['nombres'] + " " + user['apellidos']} >
                                            {user['nombres'][0] + user['apellidos'][0]}
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>
                                <MenuMui
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={logout}>
                                        <Typography textAlign="center">
                                            Cerrar sesión
                                        </Typography>
                                    </MenuItem>
                                </MenuMui>
                            </Box>
                        ) : null
                    }
                    {
                        /*
                        user['estado'] ? (
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title={"da"}>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp"/>
                                </IconButton>
                                </Tooltip>
                                
                            </Box>
                        ) : null */
                    }
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Menu