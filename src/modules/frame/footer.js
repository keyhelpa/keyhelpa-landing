import React from 'react';
import Colors from "assets/style/Colors.scss"
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LogoHelpa from 'assets/logo_footer_helpa.png'
import LogoAgent from 'assets/logo_footer_agent.png'
import Social from 'modules/generic/Socials.js'
import './Style.css'

const links = [{
  title: 'Company',
  route: '/company'
}, {
  title: 'About Us',
  route: 'about_us'
}, {
  title: 'Contact Us',
  route: '/contact_us'
}, {
  title: 'Privacy Policy',
  route: '/privacy_policy'
}, {
  title: 'Terms and Conditions',
  route: '/terms_and_conditions'
}, {
  title: 'Guides',
  route: '/guides'
}]

const menuLink = [{
  title: "Agents Looking for Helpas",
  route: ''
}, {
  title: "Helpas Looking to Earn",
  route: '' 
}]
class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  navigate(route){
    this.props.history.push(route)
  }

    
  quickLinks(){
    return(
      <div style={{
        width: '100%',
        float: 'left',
        textAlign: 'left'
      }}>
        <div>
          <h3 style={{
            marginBottom: 25
          }}>Quick Links</h3>
          <div style={{
            width: '100%'
          }}>
            <ul style={{
              fontSize: 23,
              listStyle: 'none',
              padding: 0,
              margin: 0,
              width: '50%',
              float: 'left',
              marginBottom: 50
            }}>
              {
                links.map((item) => (
                  <li style={{
                    paddingTop: 10,
                    width: '100%',
                    float: 'left'
                  }}
                  onClick={() => {
                    this.navigate(item.route)
                  }}
                  className="href-link"
                  >{item.title}</li>
                ))
              }
            </ul>

            
            <ul style={{
              fontSize: 14,
              listStyle: 'none',
              padding: 0,
              margin: 0,
              width: '50%',
              float: 'left',
              marginBottom: 50
            }}>
              {
                menuLink.map((item) => (
                  <li style={{
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
        color: 'white'
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
        marginTop: '4%'
      }}
      className="container-40-full-mobile"
      >
        <div style={{
          color: 'white',
        }}
        className="container-100 no-padding-on-mobile"
        >
          <img src={this.props.history.location.pathname.includes('agent') ? LogoAgent : LogoHelpa} style={{
            width: 'auto',
            height: '40px',
          }}
          className="cursor-hover"
          onClick={() => {
            // window.location.href = Config.HOST
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
        color: 'white',
        textAlign: 'left'
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
            Social.socialMedias.map((item) => (
              <span
                style={this.props.history.location.pathname.includes('agent') ? style.iconAgent : style.iconHelpa} className="cursor-hover"
                onClick={() => {
                  window.location.href = item.route
                }}
              >

                {item.icon}
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
        color: '#F0CADB',
        textAlign: 'right',
        paddingRight: 50
      }}
      className="container-100 text-left-on-mobile"
      >
        {/* <span>@ 2021 {Helper.APP_NAME_BASIC}. All rights reserved.</span> */}
      </div>
    )
  }

  render() {
    return (
      <div className={
        this.props.history.location.pathname.includes('agent') ? "container-100 padding-lr-50 footer agent-bg"
        : "container-100 padding-lr-50 footer helpa-bg"}>
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
  iconAgent: {
    width: 40,
    height: 40,
    float: 'left',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginRight: 20,
    backgroundColor: '#E62D7E',
    color: 'white'
  },
  iconHelpa: {
    width: 40,
    height: 40,
    float: 'left',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginRight: 20,
    backgroundColor: '#34475D',
    color: 'white'
  }
}

const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => {
  const { actions } = require('reduxhandler');
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Footer));
