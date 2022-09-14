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
      title: 'Agents Looking for Helpas',
      type: 'internal',
      route: '/agent'
    }, {
      title: 'Helpas Looking to Earn',
      type: 'internal',
      route: '/helpa'
    }],
    rightMenu: [{
      title: 'Guides',
      type: 'internal',
      route: '/guides'
    }, {
      title: 'Members login',
      type: 'external',
      route: Config.HELPA 
    }, {
      title: 'Join us',
      type: 'external',
      route: Config.HELPA + "signup"
    }]
  },
  mobileMenu: [{
    title: 'Agents Looking for Helpas',
    type: 'internal',
    route: '/agent'
  }, {
    title: 'Helpas Looking to Earn',
    type: 'internal',
    route: '/helpa'
  }, {
    title: 'Guides',
    type: 'internal',
    route: '/guides'
  }, {
    title: 'Members login',
    type: 'external',
    route: Config.HELPA
  }, {
    title: 'Join us',
    type: 'external',
    route: Config.HELPA + "signup"
  }],
  getFooterLogo() {
    let curr_path = window.location.pathname
    if (curr_path.includes('agent')) {
      return AgentLogo
    } else {
      return HelpaLogo
    }
  },
  async addHeaderItem() {
    let userType = await localStorage.getItem('user_type')
    // if(userType && this.login.rightMenu.length <= 2){
    //   this.login.rightMenu.unshift({
    //     title: 'About',
    //     type: 'internal',
    //     route:  '/' + userType + '/about'
    //   })
    //   this.login.rightMenu.unshift({
    //     title: 'Contact',
    //     type: 'internal',
    //     route: '/' + userType + '/contact'
    //   })
    // }
  }
}