import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const pages = [
  {page: 'Agent Looking for Helpa', route: '/agents'},
  {page: 'Helpa Looking to Earn', route: '/helpa'},
];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed" elevation="0" style={{backgroundColor: 'transparent'}}>
      <div style={{paddingLeft: '1%', paddingRight: '5%'}}>
        <Toolbar disableGutters>
          <Avatar
            sx={{ mr: 4, display: { xs: 'none', md: 'flex' } }}
            variant="square"
            alt="Remy Sharp" src={require('../../assets/logo_icon.png')} />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
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
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.page}</Typography>
                </MenuItem>
              ))}
              <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Members Login</Typography>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.page}
              </Button>
            ))}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            </Typography>
            <Button  sx={{ my: 2, color: 'white', display: 'block' }} color="inherit">Members Login</Button>
            <Button  sx={{ my: 2, color: 'white', display: 'block' }} color="inherit">Login</Button>
          </Box>

          {/* <Box sx={{ flexGrow: 0 }}>
            <Button color="inherit">Members Login</Button>
            <Button color="inherit">Login</Button>
          </Box> */}
        </Toolbar>
      </div>
    </AppBar>
  );
};
export default ResponsiveAppBar;
