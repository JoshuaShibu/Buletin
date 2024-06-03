import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Box, Button, Divider, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import logo from '../images/Logo.png'; // Import your logo
import '../styles/Header.css'; // Import the CSS file for styles

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar sx={{ background: 'transparent', boxShadow: 'none' }} position="sticky" className="header" data-testid='header'>
      <Toolbar>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
          <img src={logo} className="logo" alt="Buletin Logo" style={{ height: 40, marginRight: 8 }} />
        </Link>
        <Divider orientation="vertical" sx={{ mx: 1, height: 24, backgroundColor: 'black', opacity: 0.7 }} />
        <Button sx={{ color: 'black', textTransform: 'none', fontWeight: 500, fontSize: 'medium' }} component={Link} to="/preferences">My Feed</Button>
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button sx={{ color: 'black', textTransform: 'none', fontWeight: 500, fontSize: 'medium' }}>Stories</ Button>
            <Button sx={{ color: 'black', textTransform: 'none', fontWeight: 500, fontSize: 'medium' }}>Creator</Button>
            <Button sx={{ color: 'black', textTransform: 'none', fontWeight: 500, fontSize: 'medium' }}>Community</Button>
          </Box>
        )}
        <Box sx={{ flexGrow: 1 }} />
        {!isMobile && (
          <Box>
            <IconButton size="large" sx={{ color: 'black' }}>
              <NotificationsIcon />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              sx={{ color: 'black' }}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
