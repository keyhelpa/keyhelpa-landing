import React from 'react';
import {BasicStyles, Helper} from 'common'
import Colors from "common/Colors"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import Logo from 'assets/img/logo_footer.png'
import Config from 'config';
import Strings from 'modules/generic/helper/String'
import Common from 'modules/generic/helper/Common'

const {REACT_APP_URL,REACT_APP_AGENT,REACT_APP_HELPA,REACT_APP_HOST}= process.env;

const mainRoute = `${REACT_APP_URL}/`
// const mainRoute = 'http://localhost:3000/'
const links = [{
//   title: 'Company',
//   route: '/company'
// }, {
  title: 'About Us',
  option: 'external',
  route: mainRoute + `${Helper.ACCOUNT_TYPE === 'Freelancer' ? 'helpa/about' : 'agent/about'}`
}, {
  title: 'Contact Us',
  option: 'external',
  route: mainRoute + `${Helper.ACCOUNT_TYPE === 'Freelancer' ? 'helpa/contact_us' : 'agent/contact_us'}`
}, {
  title: 'Privacy Policy',
  option: 'external',
  route: mainRoute + `${Helper.ACCOUNT_TYPE === 'Freelancer' ? 'helpa/privacy_policy' : 'agent/privacy_policy'}`
}, {
  title: 'Terms and Conditions',
  option: 'external',
  route: mainRoute + `${Helper.ACCOUNT_TYPE === 'Freelancer' ? 'helpa/terms_and_conditions' : 'agent/terms_and_conditions'}`
}, {
  title: 'FAQs',
  route: '/faq'
}]
// {
//   title: 'Guides',
//   route: '/guides'
// }]

const menuLink = [{
  title: "Agents Looking for Helpas",
  route: REACT_APP_AGENT
}, {
  title: "Helpas Looking to Earn",
  route: REACT_APP_HELPA
}]
class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null
    }
  }

  componentDidMount() {
  }

  navigate(route){
    this.props.history.push(route)
  }
  quickLinks(){
    return(
      <div style={{
        widht: '100%',
        float: 'left'
      }}>
        <div>
          <h3 style={{
            marginBottom: 25
          }}>Quick Links</h3>
          <div style={{
            width: '100%'
          }}>
            <ul style={{
              fontSize: BasicStyles.fontSize,
              listStyle: 'none',
              padding: 0,
              margin: 0,
              width: '50%',
              float: 'left',
              marginBottom: 50
            }}>
              {
                links && links.map((item, index) => (
                  <li key={index} style={{
                    paddingTop: 10,
                    width: '100%',
                    float: 'left'
                  }}
                  onClick={() => {
                    window.location.href = item.route
                  }}
                  className="href-link"
                  >{item.title}</li>
                ))
              }
            </ul>


            <ul style={{
              fontSize: BasicStyles.fontSize,
              listStyle: 'none',
              padding: 0,
              margin: 0,
              width: '50%',
              float: 'left',
              marginBottom: 50
            }}>
              {
                menuLink.map((item, index) => (
                  <li key={index} style={{
                    paddingTop: 10,
                    width: '100%',
                    float: 'left'
                  }}
                  onClick={() => {
                    window.location.href = item.route
                  }}
                  className="href-link"
                  >{item.title}</li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }

  menus(){
    return(
      <div style={{
        color: Colors.white
      }}
      className="container-60-full-mobile"
      >
        <div
        className="container-60-full-mobile"
        >
        {
          this.quickLinks()
        }
        </div>
        <div
          className="container-40-full-mobile"
        >
          {
            this.widget()
          }
        </div>
      </div>
    )
  }

  logo(){
    return(
      <div style={{
      }}
      className="container-40-full-mobile"
      >
        <div style={{
          color: Colors.white,
          marginBottom: 50
        }}
        className="container-100 no-padding-on-mobile"
        >
          <img src={Helper.getFooterLogo()} style={{
            width: 'auto',
            height: '40px',
          }}
          className="cursor-hover"
          onClick={() => {
            window.location.href = REACT_APP_HOST
          }}
          />
          <p style={{
            marginTop: '25px'
          }}><b>Where doors open.</b></p>
        </div>
      </div>
    )
  }

  widget(){
    return(
      <span style={{
        color: Colors.white
      }}
      className="cotainer-100"
      >
        <h3 style={{
          marginBottom: 25
        }}>Connect With Us On</h3>
        <span style={{
          width: '100%'
        }}
        >
          {
            Strings.socialMedias.map((item, index) => (
              <span key={index}
                style={{...style.icon, backgroundColor: Colors.footerIcons}} className="cursor-hover"
                onClick={() => {
                  window.location.href = item.route
                }}
              >
                <FontAwesomeIcon icon={item.icon} size="1x"/>
              </span>
            ))
          }
        </span>
      </span>
    )
  }

  copyright(){
    return(
      <div style={{
        marginTop: 50,
        color: Colors.copyright,
        textAlign: 'right',
        paddingRight: 50
      }}
      className="container-100 text-left-on-mobile"
      >
        <span>@ 2021 {Helper.APP_NAME_BASIC}. All rights reserved. V{Common.VERSION}</span>
      </div>
    )
  }

  render() {
    const { user } = this.props.state;
    Common.setColor()
    return (
      <div style={{
        minHeight: 50,
        overflowY: 'hidden',
        paddingTop: 100,
        paddingBottom: 20,
        backgroundColor: Colors.footerBackground
      }}
      className="container-100 padding-lr-50"
      >
        <div className="container-100">
          {
            this.logo()
          }
          {
            this.menus()
          }
        </div>
        {
          this.copyright()
        }
      </div>
    )
  }
}


const style = {
  icon: {
    width: 40,
    height: 40,
    float: 'left',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginRight: 20,
    // backgroundColor: Colors.footerIcons,
    color: Colors.white
  }
}

const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => {
  const { actions } = require('reduxhandler');
  return {
    setViewActivity: (flag) => dispatch(actions.setViewActivity(flag))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stack));
