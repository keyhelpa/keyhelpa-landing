import Config from "config";
import AgentLogo from 'assets/img/logo_footer_agent.png'
import HelpaLogo from 'assets/img/logo_footer_helpa.png'
export default {
  name: 'Keyhelpa',
  ACCOUNT_TYPE: 'landing',
  headerMenu: [{
    title: 'Agent Looking for Helpa',
    position: 'left',
    route: 'agent'
  }, {
    title: 'Helpa Looking to Earn',
    position: 'left',
    route: 'helpa'
  }, {
    title: 'Members Login',
    position: 'right',
    route: 'login-member'
  }, {
    title: 'Login',
    position: 'right',
    route: 'login'
  }],
  login: {
    leftMenu: [{
      title: 'Agent Looking for Helpa',
      type: 'internal',
      route: '/agent'
    }, {
      title: 'Helpa Looking to Earn',
      type: 'internal',
      route: '/helpa'
    }],
    rightMenu: [{
      title: 'About',
      type: 'internal',
      route:  '/about',
      isShow: window.location.pathname.includes('agent') || window.location.pathname.includes('helpa') ? true : false
    }, {
      title: 'Contact',
      type: 'internal',
      route: '/contact',
      isShow: window.location.pathname.includes('agent') || window.location.pathname.includes('helpa') ? true : false
    }, {
      title: 'Members Login',
      type: 'external',
      route:  Config.HELPA
    }, {
      title: 'Login',
      type: 'external',
      route:  Config.HELPA
    }]
  },
  getFooterLogo(){
    let curr_path = window.location.pathname
    if(curr_path.includes('agent')){
        return AgentLogo
    }else{
        return HelpaLogo
    }
  },
}