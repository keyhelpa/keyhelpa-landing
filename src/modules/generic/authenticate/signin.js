import React from 'react';
import { connect } from 'react-redux';
import TextInput from "components/increment/generic/form/TextInput"
import Style from './style'
import HeaderLabel from './headerLabel';
import Button from 'components/increment/generic/form/Button'
import Colors from 'common/Colors';
import LeftContainer from './leftContainer';
import { withRouter } from 'react-router-dom';
import Data from "services/Data"
import CommonApi from 'services/commonApi'
import Helper from 'common/Helper'
import MenuButton from 'components/increment/generic/pagination/menuButton'
import Config from 'config.js'
import API from 'services/api'
import Routes from 'common/Routes'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import CheckBox from 'modules/generic/form/CheckBox'
import SocialAuth from './socialAuth'
import { Color } from 'common';

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      errorUsername: null,
      errorPassword: null,
      isLoading: false,
      selected: Helper.ACCOUNT_TYPE,
      errorMessage: null,
      passwordShowFlag: false,
      rememberMe: null
    };
  }
  
  componentDidMount(){
    const username = localStorage.getItem('username')
    const password = localStorage.getItem('password')
    const rememberMe = parseInt(localStorage.getItem('rememberMe'))
    if(rememberMe == 1){
      this.setState({
        rememberMe: [{
          title: 'Remember me',
          value: null
        }]
      })
      if(username){
        this.setState({
          username
        })
      }
      if(password){
        this.setState({
          password
        })
      }
    }
  }

  submit(){
    const { errorPassword, errorUsername, username, password } = this.state;
    const { rememberMe } = this.state;
    this.setState({
      errorMessage: null
    })
    if(rememberMe && rememberMe.length > 0){
      localStorage.setItem('username', username)
      localStorage.setItem('password', password)
    }
    if(Config.TEST == true){
      const { login } = this.props;
      login({
        id: 1,
        username: 'Test',
        email: 'Test@gmail.com',
        information: {
          first_name: 'Kennette',
          last_name: 'Canales'
        },
        profile: {
          url: 'test'
        }
      }, '1321321321321321')
      this.navigate('/dashboard')
    }
    if(errorPassword == null && errorUsername == null && username != null && password != null){
      this.setState({
        isLoading: true
      })
      CommonApi.authenticate(username, password, response => {
        this.setState({
          isLoading: false
        })
        if(response && response.token){
          localStorage.setItem(Helper.APP_NAME + 'token', response.token)
           API.request(Routes.authenticatedUser, {}, user => {
            const { login } = this.props;
            if(user && (user.account_type == Helper.ACCOUNT_TYPE || user.account_type == 'ADMIN')){
              login(user, response.token)
              if(user.status == 'ACCOUNT_VERIFIED' || user.status == 'PROFILE_SETUP'){
                if(user.security !== null){
                  if(user.security.sms == 1){
                    this.navigate('/2_step_verification')
                  }else if(user.security.google_auth == 1){
                    this.navigate('/2_step_verification')
                  }else{
                    this.navigate(Helper.NEXT_ROUTE)
                  }
                }else{
                  this.navigate(Helper.NEXT_ROUTE)
                }
              }else{
                this.navigate(user.status)
              }
            }else{
              this.setState({
                errorMessage: 'Invalid Accessed.'
              })
            }
          }, error => {
            this.setState({
              errorMessage: 'Invalid Accessed.'
            })
          });
        }else if(response && response.error){
          this.setState({
            errorMessage: response.error
          })
        }
      }, error => {
        this.setState({
          isLoading: false,
          errorMessage: error && error.error == 'invalid_credentials' ? 'Username and Password did not match.' : 'Invalid accessed.'
        })
      })
    }else{
      this.setState({
        errorMessage: 'Username and Password are required.'
      })
    }
  }

  navigate = (route) => {
    this.props.history.push(route)
    setTimeout(() => {
      window.location.reload()
    }, 50)
  }

  render() {
    const { errorPassword, errorUsername, isLoading, selected, errorMessage, passwordShowFlag } = this.state;
    const { rememberMe } = this.state;
    return (
      <div style={Style.mainContainer} >
        <div style={Style.leftContainer} className='two-third-container' >
          <LeftContainer />
        </div>
        <div style={Style.rightContainer} className='full-width-mobile-with-margin'>
          <HeaderLabel
            title={'Log In'}
            description={'Proceed with registration below to start your career with KeyHelpa'}
            _color={true}
            />
          
          {
            Helper.ACCOUNT_TYPE.toLowerCase() != 'admin' && (
              <div style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div
                style={{
                  width: '65%'
                }}
                className="full-width-mobile"
                >
                  <MenuButton
                    data={['Agent', 'Freelancer']}
                    selected={selected}
                    style={{
                      color: Colors.gray,
                      backgroundColor: Colors.activeGray,
                      float: 'left'
                    }}
                    onChange={(param) => {
                      if(param == 'Agent'){
                        window.location.href = Config.AGENT
                      }else{
                        window.location.href = Config.HELPA
                      }
                    }}
                  />
                </div>
              </div>
            )
          }
          
          {
            errorMessage && (
              <p style={{
                fontWeight: 'bold',
                color: Colors.danger,
                textAlign: 'center',
                marginTop: 25
              }}>
                {errorMessage}
              </p>
            )
          }

          <TextInput
            placeholder={'Username or Email Address'}
            type={"text"}
            value={this.state.username}
            style={{
              marginTop: 20
            }}
            onChange={(username, errorUsername) => {
              this.setState({
                username, errorUsername
              })
            }}
            validation={{
              type: 'text_without_space',
              size: 8,
              column: 'Username',
              error: errorUsername
            }}
            />

          <TextInput
            placeholder={'Password'}
            type={this.state.passwordShowFlag ? 'text' : 'password'}
            value={this.state.password}
            style={{
              marginTop: 20
            }}
            onChange={(password, errorPassword) => {
              this.setState({
                password, errorPassword
              })
            }}
            onClickRightIcon={() => {
              this.setState({
                passwordShowFlag: !this.state.passwordShowFlag
              })
            }}
            iconRight={passwordShowFlag === false ? faEye : faEyeSlash}
            iconStyle={Colors.darkGray}
            enterEnable={true}
            onEnter={() => this.submit()}
            validation={{
              type: 'text_without_space',
              column: 'Password',
              size: 6,
              error: errorPassword
            }}

            />


        <div style={{
          float: 'left',
          width: '100%',
          paddingTop: 20
        }}>
          
          <div style={{width: '50%'}}>
            <CheckBox
              data={[{
                title: 'Remember me',
                value: null
              }]}
              align={true}
              selected={rememberMe}
              _color={true}
              onChange={(selected) => {
                this.setState({
                  rememberMe: selected
                })

                if(selected !== null && selected.length > 0){
                  localStorage.setItem('rememberMe', 1)
                }else{
                  localStorage.setItem('rememberMe', 0)
                }
              }}
            />
          </div>

          <label
            onClick={() =>
              this.navigate('request_change_password')
            }
            style={{
              float: 'left',
              width: '50%',
              textAlign: 'right',
              fontWeight: 'bold'
            }} 
            className='href-link'>Forgot password? </label>
          
        </div>


        <div style={{
          float: 'left',
          width: '100%',
          paddingTop: 20,
          paddingBottom: 20,
          textAlign: 'center'
        }}>
          <Button
              title={'Log In'} 
              onClick={() => {
                this.submit()
              }}
              style={{
                float: 'center',
                backgroundColor: Colors.primary,
                color: Colors.white,
                paddingLeft: '10%',
                paddingRight: '10%'
              }}
              className="full-width-mobile"
              isLoading={isLoading}
              />

        </div>
      

      
        <div style={{
          width: '100%',
          float: 'left'
        }}>
          <SocialAuth payload="signin"
            isLoading={(flag) => {
              this.setState({
                isLoading: flag
              })
            }}
            errorMessage={(messsage) => {
              this.setState({
                errorMessage: messsage
              })
            }}
          />
        </div>
        
        <div style={{
          textAlign: 'center',
          width: '100%',
          marginBottom: 25
        }}>
          <span style={{
            color: Color.iconText
          }}>Don't have an account? </span>
          <span style={{
            color: Colors.primary,
            paddingLeft: 5,
            fontWeight: 'bold'
          }}
          onClick={() => {
            this.navigate('signup')
          }}
          className="href-link"
          >
            Sign Up
          </span>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => {
  const { actions } = require('reduxhandler');
  return {
    login: (user, token) => {dispatch(actions.login(user, token))}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stack));

