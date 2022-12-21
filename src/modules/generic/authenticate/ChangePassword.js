import React from 'react';
import { connect } from 'react-redux';
import TextInput from "components/increment/generic/form/TextInput"
import Style from './style'
import HeaderLabel from './headerLabel';
import Button from 'components/increment/generic/form/Button'
import Colors from 'common/Colors';
import LeftContainer from './leftContainer';
import { withRouter } from 'react-router-dom';
import API from 'services/api'
import Routes from 'common/Routes'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        password:  null,
        errorPassword: null,
        confirmPassword: null,
        errorConfirmPassword: null,
        isLoading: false,
        passwordShowFlag: false,
        passwordShowFlag2: false
    };
  }

  navigate = (route) => {
    this.props.history.push(route)
  }


  submit(){
    const { password, confirmPassword } = this.state;
    if(password == null || confirmPassword == null || password == '' || confirmPassword == '') return false
    if(password != confirmPassword){
      this.setState({errorConfirmPassword: 'Please confirm password.'})
      return false
    }
    this.setState({
      isLoading: true
    })
    let par = {
      password: password,
      username: this.props.match.params.username,
      code: this.props.match.params.code
    }
    API.request(Routes.updatePassword, par, response => {
      this.setState({
        isLoading: false
      })
      this.navigate('/signin')
    }, error => {
      this.setState({
        isLoading: false
      })
    })
  }

  render() {

    const { errorPassword, password, confirmPassword, errorConfirmPassword, passwordShowFlag, passwordShowFlag2, isLoading } = this.state;
    return (
      <div style={Style.mainContainer} >
        <div style={Style.leftContainer} className='two-third-container' >
          <LeftContainer />
        </div>
        <div style={Style.rightContainer} className='full-width-mobile-with-margin'>
          <HeaderLabel title={'Update Password'}/>

          <p style={{
            textAlign: 'center',
          }}>
            We received a request that you want to update your password. Please enter your new password below. You’ll be asked to verify your identity, and then you can update your password.
          </p>
          <p style={{
            textAlign: 'center',
          }}>
          This request expires in 4 hours.
          </p>
          
          <TextInput
            placeholder={'New password'}
            type={this.state.passwordShowFlag ? 'text' : 'password'}
            value={password}
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
            enterEnable={true}
            onEnter={() => this.submit()}
            validation={{
              type: 'text_without_space',
              column: 'Password',
              size: 6,
              error: errorPassword
            }}

            />
        
        <TextInput
            placeholder={'Confirm new password'}
            type={this.state.passwordShowFlag2 ? 'text' : 'password'}
            value={confirmPassword}
            style={{
              marginTop: 20
            }}
            onChange={(confirmPassword, errorConfirmPassword) => {
              this.setState({
                confirmPassword, errorConfirmPassword
              })
            }}
            onClickRightIcon={() => {
              this.setState({
                passwordShowFlag2: !this.state.passwordShowFlag2
              })
            }}
            iconRight={passwordShowFlag2 === false ? faEye : faEyeSlash}
            enterEnable={true}
            onEnter={() => this.submit()}
            validation={{
              type: 'text_without_space',
              column: 'Confirm Password',
              size: 6,
              error: errorConfirmPassword
            }}

            />

        <div style={{
          float: 'left',
          width: '100%',
          paddingTop: 20,
          paddingBottom: 20,
          textAlign: 'center'
        }}>
          <Button
            title={'Submit'} 
            onClick={() => this.submit()}
            style={{
              backgroundColor: Colors.primary,
              color: Colors.white,
              paddingRight: '10%',
              paddingLeft: '10%'
            }}
            className="full-width-mobile"
            isLoading={this.state.isLoading}
            />
        </div>
        
        <div style={{
            textAlign: 'center',
            width: '100%',
            marginBottom: 25,
            marginTop: 10
          }}>
            <b style={{

            }}>Need help?</b>
            <b style={{
              color: Colors.primary,
              paddingLeft: 5
            }}
            onClick={() => {
              this.navigate('/contact_us')
            }}
            className="href-link"
            >
              Contact Support
            </b>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stack));

