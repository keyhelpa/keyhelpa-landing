import React from 'react';
import { connect } from 'react-redux';
import Style from './Style'
import { withRouter } from 'react-router-dom';
import BreadCrumbs from "../breadcrumbs"
import Button from 'components/increment/generic/form/Button'
import Colors from 'common/Colors'
import Background from 'assets/img/welcome_background.png'
import Persons from 'assets/img/persons.png'
import API from 'services/api'
import Routes from 'common/Routes'

class Stack extends React.Component{

  submit(){
    const { user } = this.props.state;
    if(user == null) return null
    API.request(Routes.accountUpdateStatus, {
      id: user.id,
      status: this.props.nextRoute
    }, response => {  
      this.setState({
        isLoading: false
      })
      if(response && response.data)(
        this.props.history.push(this.props.nextRoute)
      )
      setTimeout(() => {
        window.location.reload()
      }, 50)
    }, error => {
      this.setState({
        isLoading: false
      })
    })
  }
  renderRight(){
    return (
      <div className="container-85-full-mobile welcome-content-mobile">
        <BreadCrumbs
          title={'Welcome to KeyHelpa'}
          page={'welcome'}
          backIcon={true}
          style={{
              paddingRight: "50px"
          }}
        />
          <div
          style={{textAlign: 'justify'}}
          className="full-width-mobile">
            {
                this.props.message
            }
          </div>
          <div>
            <span style={{
              width: "100%",
              float: 'left'
            }}>
            <Button
              title={'Profile setup'}
              className="full-width-mobile"
              onClick={() => {
                  this.submit()
              }}
              style={{
                float: 'left',
                backgroundColor: Colors.primary,
                color: Colors.white,
                paddingLeft: '5%',
                paddingRight: '5%',
                marginTop: 20,
                marginBottom: 25
            }}/>
            </span>
            <p style={{
              }}
              className="href-link"
              onClick={() => {
                console.log('=========');
                this.props.logout()
                setTimeout(() => {
                  window.location.reload()
                }, 100)
              }}
              >
              Or
              <b style={{
                color: Colors.primary,
                fontWeight: 'bold',
                paddingLeft: 5
              }}>Logout?</b>
            </p>
            </div>
      </div>
    )
  }

  renderLeft(){
    return(
      <div class="container-40-full-mobile  welcome-image-mobile" 
        style={{
          backgroundColor: Colors.footerBackground, 
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: '100vh',
          overflowY: 'hidden',
        }}>
        <div  style={{
            float: 'left',
        }}>
          <img src={Persons} style={{
                width: '80%',
                height: 'auto',
                marginLeft: '10%',
                marginRight: '10%',
                float: 'left',
            }} />

        <h4 style={{
            color: Colors.white,
            textAlign: 'center',
          }}>
              Connecting real estate work opportunities <br/> with freelancers
        </h4>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderLeft()}
        <div className="container-60-full-mobile" style={{
          paddingLeft: '5%',
          backgroundImage: `url(${Background})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'auto 70%',
          backgroundPosition: '50% 150px',
          }}>
            {this.renderRight()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => {
  const { actions } = require('reduxhandler');
  return {
    logout: () => dispatch(actions.logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stack));