import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Helper from 'common/Helper.js'
import { Menu, MenuItem, Button, Toolbar,  Typography, IconButton, Box, AppBar} from '@mui/material';

export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const renderMenuWeb = () => (
    <Toolbar style={{paddingRight: '5%', paddingLeft: '5%'}}>
      {
        Helper.headerMenu.map(item => (
          <div>
            {
              item.position == 'left' && (
                <Button color="inherit">{item.title}</Button>
              )
            }
          </div>
        ))
      }
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      </Typography>
      {
        Helper.headerMenu.map(item => (
          <div>
            {
              item.position == 'right' && (
                <Button color="inherit">{item.title}</Button>
              )
            }
          </div>
        ))
      }
    </Toolbar>
  )
  const renderMenuMobile = () => (
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      </Typography>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {
          Helper.headerMenu.map(item => (
            <MenuItem onClick={handleClose}>{item.title}</MenuItem>
          ))
        }
      </Menu>
    </Toolbar>
  )
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" style={{backgroundColor: 'transparent'}} elevation={0}>
        <div className="web">
          {renderMenuWeb()}
        </div>
        <div className="mobile">
          {renderMenuMobile()}
        </div>
      </AppBar>
    </Box>
  );
}