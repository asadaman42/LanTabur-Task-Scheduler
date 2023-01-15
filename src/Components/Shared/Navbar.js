import React, { useContext, useState } from 'react';
import { AppBar, Container, Toolbar, Typography, Box, IconButton, Menu, Avatar, Button, Tooltip, MenuItem, Switch, } from '@mui/material';
import { EventAvailable, MenuOpen, MenuOutlined } from '@mui/icons-material';
import { Link, useNavigate, } from 'react-router-dom';
import { UniversalContext } from '../../ContextSupplier/ContextSupplier';


const pages = [
    {
        heading: 'Add Task',
        link: 'addtask'
    },
    {
        heading: 'My Task',
        link: 'mytask'
    },
    {
        heading: 'Completed Tasks',
        link: 'completedtask'
    }
];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navbar = () => {
    const { mode, setMode, logOut, user } = useContext(UniversalContext);


    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => { setAnchorElNav(event.currentTarget); };
    const handleOpenUserMenu = (event) => { setAnchorElUser(event.currentTarget); };
    const handleCloseNavMenu = () => { setAnchorElNav(null); };
    const handleCloseUserMenu = () => { setAnchorElUser(null); };

    const navigate = useNavigate();
    const signOut = () => {
        // <Navigate to='/dashboard'></Navigate>
        navigate("/");
        logOut().then(() => { }).catch(error => console.error(error));
    }

    return (
        <AppBar position="static" sx={{ mb: 2 }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <EventAvailable sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6" noWrap component={Link} to="/"
                        sx={{
                            mr: 2, display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',
                        }}>
                        LanTabur Task Scheduler
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            {anchorElNav ? <MenuOpen /> : <MenuOutlined />}
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.heading} onClick={handleCloseNavMenu}>
                                    <Link to={page.link} >
                                        <Typography textAlign="center">{page.heading}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <EventAvailable sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LanTabur Task Scheduler
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button key={page.heading} component={Link} to={page.link} sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.heading}
                            </Button>
                        ))}
                    </Box>

                    <Switch onClick={() => setMode(mode === 'light' ? 'dark' : 'light')} />

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={user?.displayName} src={user?.photoURL} />
                            </IconButton>
                        </Tooltip>
                        <Menu
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
                            {
                                user?.uid ?
                                    [
                                        <MenuItem key={2} component={Link} to='/profile'>
                                            <Typography textAlign="center" >{user?.displayName}</Typography>
                                        </MenuItem>,
                                        <MenuItem key={1} onClick={signOut}>
                                            <Typography textAlign="center" >Log out</Typography>
                                        </MenuItem>,
                                    ]
                                    :
                                    [
                                        <MenuItem key={1} component={Link} to='/login'>
                                            <Typography textAlign="center" >Log In</Typography>
                                        </MenuItem>,
                                        <MenuItem key={2} component={Link} to='/register'>
                                            <Typography textAlign="center" >Register</Typography>
                                        </MenuItem>,

                                    ]
                            }
                        </Menu>
                    </Box>
                </Toolbar>
            </Container >
        </AppBar >
    );
};

export default Navbar;







