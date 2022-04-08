import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Helper from 'common/Helper.js'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Routes from 'common/Routes';
import { Menu, MenuItem, Button, Toolbar,  Typography, IconButton, Box, AppBar} from '@mui/material';

function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [color, setColor] = React.useState('white')
  const [theme, setTheme] = React.useState(null)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleRedirect = (route) => {
    // const {selectedUser} = props.state
    const {history} = props;
    console.log('=====', props.history);
    if(route === 'login' || route === 'login-member'){
      if(theme === 'agent'){
        window.open(Routes.agent, '_blank')
      }else{
        window.open(Routes.freelancer, '_blank')
      }
    }else{
      props.history.push(`/${theme}/${route}`)
    }
  }

  React.useEffect(() => {
    const {history} = props;
    if(props){
      if(history.location.pathname.includes('agent')){
        setColor('#34475D')
        setTheme('agent')
      }else if(history.location.pathname.includes('helpa')){
        setColor('#E62D7E')
        setTheme('helpa')
      }else{
        setColor('white')
      }
      if(Helper.headerMenu.length <= 2){
        Helper.headerMenu.push({
          title: 'About',
          position: 'right',
          route: 'about'
        }, {
          title: 'Contact',
          position: 'right',
          route: 'contact'
        }, {
          title: 'Members Login',
          position: 'right',
          route: 'login-member'
        }, {
          title: 'Login',
          position: 'right',
          route: 'login'
        })
      }
    }else{
      setColor('white')
    }
  })


  const renderMenuWeb = () => (
    <Toolbar style={{paddingRight: '5%', paddingLeft: '5%'}}>
      {
        Helper.headerMenu.map(item => (
          <div>
            {
              item.position == 'left' && (
                <Button style={{color: color}}>{item.title}</Button>
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
                <Button 
                  style={{color: color}}
                  onClick={() => handleRedirect(item.route)}>{item.title}</Button>
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
        style={{color: color}}
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

const mapStateToProps = (state) => ({state: state});
const mapDispatchToProps = (dispatch) =>{
  const { actions } = require('reduxHandler');
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));