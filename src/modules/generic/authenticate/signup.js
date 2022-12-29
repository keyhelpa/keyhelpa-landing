import React from 'react';
import { connect } from 'react-redux';
import { Helper, BasicStyles } from 'common'
import Button from 'components/increment/generic/form/Button'
import TextInput from "components/increment/generic/form/TextInput"
import Style from './style'
import Colors from 'common/Colors';
import HeaderLabel from './headerLabel';
import LeftContainer from './leftContainer';
import { withRouter } from 'react-router-dom';
import API from 'services/api'
import Routes from 'common/Routes'
import MenuButton from 'components/increment/generic/pagination/menuButton'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import SocialAuth from './socialAuth'
import Config from 'config.js'
import CommonApi from 'services/commonApi'
const {REACT_APP_AGENT, REACT_APP_HELPA, REACT_APP_TEST} = process.env
class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      errorUsername: null,
      email: null,
      errorEmail: null,
      password: null,
      errorPassword: null,
      confirmPassword: null,
      errorConfirmPassword: null,
      firstName: null,
      errorFirstName: null,
      lastName: null,
      errorLastName: null,
      tradingName: null,
      errorTradingName: null,
      postCode: null,
      errorPostCode: null,
      isLoading: false,
      selected: Helper.ACCOUNT_TYPE,
      errorMessage: null,
      passwordShowFlag: false,
      confirmPasswordShowFlag: false
    };
  }
  navigate = (route) => {
    this.props.history.push(route)
    setTimeout(() => {
      window.location.reload()
    }, 50)
  }

  login() {
    const { errorPassword, errorUsername, username, password } = this.state;
    if (!!REACT_APP_TEST) {
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
      this.navigate('/welcome')
    }
    if (errorPassword === null && errorUsername === null && username !== null && password !== null) {
      this.setState({
        isLoading: true
      })
      CommonApi.authenticate(username, password, response => {
        this.setState({
          isLoading: false
        })
        if (response && response.token) {
          localStorage.setItem(Helper.APP_NAME + 'token', response.token)
          API.request(Routes.authenticatedUser, {}, user => {
            const { login } = this.props;
            if (user && (user.account_type === Helper.ACCOUNT_TYPE || user.account_type === 'ADMIN')) {
              login(user, response.token)
              this.navigate('/welcome')
            } else {
              this.setState({
                errorMessage: 'Invalid Accessed.'
              })
            }
          }, error => {
            this.setState({
              errorMessage: 'Invalid Accessed.'
            })
          });
        }
      }, error => {
        this.setState({
          isLoading: false,
          errorMessage: 'Invalid accessed.'
        })
      })
    } else {
      this.setState({
        errorMessage: 'Username and Password are required.'
      })
    }
  }


  submit() {
    const { errorUsername, username, email, errorEmail } = this.state;
    const { password, errorPassword, confirmPassword, errorConfirmPassword } = this.state;
    const { errorFirstName, firstName, errorLastName, lastName } = this.state;
    const { errorTradingName, tradingName } = this.state;

    this.setState({
      errorMessage: null
    })
    if (errorFirstName != null || firstName == null) {
      this.setState({
        errorFirstName: 'First name is required.'
      })
      return false
    }

    if (errorLastName != null || lastName == null) {
      this.setState({
        errorLastName: 'Last name is required.'
      })
      return false
    }
    if (errorTradingName != null || tradingName == null) {
      this.setState({
        errorTradingName: 'Trading name is required.'
      })
      return false
    }
    if (errorUsername != null || username == null){
      this.setState({
        errorUsername: 'Username is required.'
      })
      return false
    }
    if (errorEmail != null || email == null) {
      this.setState({
        errorEmail: 'Email is required.'
      })
      return false
    }
    if (errorPassword != null || password == null) {
      this.setState({
        errorPassword: 'Password is required.'
      })
      return false
    }
    if (Helper.ACCOUNT_TYPE.toLowerCase() === 'admin') {
      this.setState({
        errorMessage: 'Registration not allowed.'
      })
      return false
    }
    if (password !== confirmPassword) {
      this.setState({
        errorConfirmPassword: 'Password not match'
      })
      return false
    }
    this.setState({
      isLoading: true
    })
    API.request(Routes.accountCreate, {
      username, email, password,
      first_name: firstName,
      last_name: lastName,
      merchant: tradingName,
      referral_code: null,
      account_type: Helper.ACCOUNT_TYPE,
      status: 'ADMIN',
      account_status: '/welcome'
    }, response => {
      this.setState({
        isLoading: false
      })
      if (response && response.data) {
        this.login()
      } else if (response && response.error) {
        for (var key in response.error.message) {
          if (response.error.message.hasOwnProperty(key)) {
            this.setState({
              errorMessage: response.error.message[key][0]
            })
            break
          }
        }
      }
    }, error => {
      this.setState({
        isLoading: false
      })
    })
  }


  renderFirst() {
    const { firstName, errorFirstName, lastName, errorLastName } = this.state;
    return (
      <div
        style={{
          width: '100%',
          float: 'left',
          paddingTop: 20,
          paddingBottom: 20,
        }}
        className="full-width-mobile-without-padding"
      >
        <div style={{
          width: '48%',
          float: 'left',
          marginRight: '2%'
        }}
          className="full-width-mobile-without-padding"
        >
          <TextInput
            placeholder={'First name'}
            type={"text"}
            value={firstName}
            onChange={(firstName, errorFirstName) => {
              this.setState({
                firstName, errorFirstName
              })
            }}
            validation={{
              type: 'text_without_space',
              size: 2,
              column: 'First name',
              error: errorFirstName
            }}
          />
        </div>
        <div style={{
          width: '48%',
          float: 'left',
          marginLeft: '2%'
        }}
          className="full-width-mobile-without-padding"
        >
          <TextInput
            placeholder={'Last name'}
            type={"text"}
            value={lastName}
            onChange={(lastName, errorLastName) => {
              this.setState({
                lastName, errorLastName
              })
            }}
            validation={{
              type: 'text_without_space',
              size: 2,
              column: 'Last name',
              error: errorLastName
            }}
          />
        </div>
      </div>
    )
  }

  renderSecond() {
    const { tradingName, errorTradingName, postCode, errorPostCode } = this.state;
    return (
      <div
        style={{
          width: '100%',
          float: 'left',
          paddingTop: 20,
          paddingBottom: 20,
        }}
        className="full-width-mobile-without-padding"
      >
        <div style={{
          width: '100%',
          float: 'left'
        }}
          className="full-width-mobile-without-padding"
        >
          <TextInput
            placeholder={'Trading name'}
            type={"text"}
            value={tradingName}
            onChange={(tradingName, errorTradingName) => {
              this.setState({
                tradingName, errorTradingName
              })
            }}
            validation={{
              type: 'text_without_space',
              size: 3,
              column: 'Trading name',
              error: errorTradingName
            }}
          />
        </div>
        {/* <div style={{
          width: '48%',
          float: 'left',
          marginLeft: '2%'
        }}
          className="full-width-mobile-without-padding"
        >
          <TextInput
            placeholder={'Postcode'}
            type={"text"}
            value={postCode}
            onChange={(postCode, errorPostCode) => {
              this.setState({
                postCode, errorPostCode
              })
            }}
            validation={{
              type: 'text_without_space',
              size: 4,
              column: 'Postcode',
              error: errorPostCode
            }}
          />
        </div> */}
      </div>
    )
  }
  render() {
    const { errorUsername, username, email, errorEmail, selected, passwordShowFlag, confirmPasswordShowFlag } = this.state;
    const { password, errorPassword, confirmPassword, errorConfirmPassword, errorMessage } = this.state;
    return (
      <div style={Style.mainContainer}>
        <div style={Style.leftContainer} className='two-third-container'>
          <LeftContainer />
        </div>
        <div style={Style.rightContainer} className='full-width-mobile-with-margin'>
          <HeaderLabel
            title={'Sign Up'}
            description={'Proceed with registration below to start your career with KeyHelpa'}
            _color={true}
          />
          {
            Helper.ACCOUNT_TYPE.toLowerCase() !== 'admin' && (
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
                      if (param === 'Agent') {
                        window.location.href = REACT_APP_AGENT + '/signup'
                      } else {
                        window.location.href = REACT_APP_HELPA + '/signup'
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

          {this.renderFirst()}

          {this.renderSecond()}

          <TextInput
            placeholder={'Username'}
            type={"text"}
            value={username}
            style={{
              marginTop: 20
            }}
            className="full-width-mobile-without-padding"
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
            placeholder={'Email'}
            type={"text"}
            value={email}
            style={{
              marginTop: 20
            }}
            onChange={(email, errorEmail) => {
              this.setState({
                email, errorEmail
              })
            }}
            validation={{
              type: 'email',
              size: 8,
              column: 'Email',
              error: errorEmail
            }}
          />

          <TextInput
            placeholder={'Password'}
            type={this.state.passwordShowFlag ? 'text' : 'password'}
            value={password}
            style={{
              marginTop: 20
            }}
            onChange={(password, errorPassword) => {
              this.setState({
                password, errorPassword,
                errorMessage: null
              })
            }}
            onClickRightIcon={() => {
              this.setState({
                passwordShowFlag: !this.state.passwordShowFlag
              })
            }}
            iconRight={passwordShowFlag === false ? faEye : faEyeSlash}
            validation={{
              type: 'text',
              size: 8,
              column: 'Password',
              error: errorPassword
            }}
          />
          <TextInput
            placeholder={'Confirm Password'}
            type={this.state.confirmPasswordShowFlag ? 'text' : 'password'}
            value={confirmPassword}
            style={{
              marginTop: 20,
            }}
            onChange={(confirmPassword, errorConfirmPassword) => {
              this.setState({
                confirmPassword, errorConfirmPassword,
                errorMessage: null
              })
            }}
            onClickRightIcon={() => {
              this.setState({
                confirmPasswordShowFlag: !this.state.confirmPasswordShowFlag
              })
            }}
            iconRight={confirmPasswordShowFlag === false ? faEye : faEyeSlash}
            validation={{
              type: 'text',
              size: 8,
              column: 'Confirm Password',
              error: errorConfirmPassword
            }}
          />

          <div style={{
            display: 'flex',
            width: '100%',
            float: 'left',
            justifyContent: 'center',
            marginTop: 25
          }}>
            <Button
              title={'Create Account'}
              onClick={() => {
                this.submit()
              }
              }
              style={{
                backgroundColor: Colors.primary,
                color: Colors.white,
                paddingLeft: '10%',
                paddingRight: '10%'
              }}
              className="full-width-mobile"
              isLoading={this.state.isLoading}
            />
          </div>

          <div style={{
            width: '100%',
            float: 'left',
            marginTop: 25
          }}>
            <SocialAuth payload="signup"
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
            float: 'left',
            width: '100%',
            marginTop: 20,
            paddingTop: 20,
            paddingBottom: 20,
            textAlign: 'center'
          }}>
            <label style={{
              color: Colors.iconText
            }}>Already have an account?</label>

            <span
              onClick={() =>
                this.navigate('signin')
              }
              className="href-link"
              style={{
                fontWeight: 'bold',
                color: Colors.primary,
                paddingLeft: 5
              }}
            >Log In</span>
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
    login: (user, token) => { dispatch(actions.login(user, token)) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stack));

