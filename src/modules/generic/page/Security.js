import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BreadCrumbs from "../breadcrumbs"
import Toggle from '../card/cardToggle'
import Colors from 'common/Colors'
import TextMessageModal from 'modules/generic/modal/textMessage'
import GoogleAuthenticatorModal from 'modules/generic/modal/googleAuthenticator'
import SecurityQuestionModal from 'modules/generic/modal/securityQuestion'
import DeleteAuthenticatorModal from 'modules/generic/modal/deleteAuthenticator'
import ConfirmationOTP from 'modules/generic/modal/confirmationOTP'
import API from 'services/api'
import Routes from 'common/Routes'

const menu = [{
  id: 1,
  title: 'Text message',
  description: `Receive a six digit code by text message to confirm it's you.`,
  flag: false,
  icon: true
}, {
  id: 2,
  title: 'Google Authenticator',
  description: `Enter a code generated by your authenticator app to confirm it's you.`,
  flag: false,
  icon: true
}
// , {
//   id: 3,
//   title: 'Security question',
//   description: `Answer a question you choose to confirm it's you.`,
//   flag: false,
//   icon: true
// }
]
class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorUsername: null,
      message: null,
      errorMessage: null,
      textMessage: false,
      addMessage: false,
      googleAuthenticator: false,
      securityQuestion: false,
      deleteAuthenticator: false,
      addMobile: false,
      num: null,
      flag: false,
      sms: null,
      data: [],
      activeData: null,
      isLoading: false
    };
  }

  componentDidMount() {
    if (this.props.state.user != null) {
      this.retrieve()
    }
  }

  retrieve() {
    const { user } = this.props.state;
    let parameter = {
      account_id: user.id
    }
    this.setState({ isLoading: true })
    API.request(Routes.securitySettingsRetrieve, parameter, response => {
      this.setState({
        isLoading: false
      })
      if (response.data.length > 0) {
        let temp = response.data[0];
        if (temp.sms == 1) {
          menu[0].flag = true
        } else {
          menu[0].flag = false
        }
        if (temp.google_auth == 1) {
          menu[1].flag = true
        } else {
          menu[1].flag = false
        }
        this.setState({ data: response.data })
      } else {
        this.setState({
          data: []
        })
      }
    }, error => {
      this.setState({
        isLoading: false
      })
    })
  }

  next(code, num) {
    const { user } = this.props.state;
    let lastCharRemoved = code.slice(2, code.length);
    let params = {
      platform: "sms",
      phoneNumber: lastCharRemoved.concat(num),
      account_id: user?.id
    }
    API.request(Routes.securitySettingsSetup, params, response => {
      this.setState({
        textMessage: false,
        addMobile: true,
        num: lastCharRemoved.concat(num)
      })
    })
  }

  updateSecurity(security) {
    const { data } = this.state
    const { user } = this.props.state
    let params = null;
    if (security == 'sms') {
      params = {
        'id': data[0].id,
        'sms': 0,
        '2fa': 0,
        'account_id': user?.id
      }
    }else if (security == 'google_auth') {
      params = {
        'id': data[0].id,
        'sms': data[0].sms == 1 ? 1 : 0,
        '2fa': data[0].sms == 0 && data[0].google_auth == 0 ? 0 : 1,
        'google_auth': 0,
        'account_id': user?.id
      }
    }
    API.request(Routes.securitySettingsUpdate, params, response => {
      this.retrieve()
    })
  }

  async flag(params) {
    const { user } = this.props.state
    if (params.id == 1 && params.flag == false) {
      await this.setState({
        textMessage: true,
        googleAuthenticator: false,
        securityQuestion: false,
        // flag: true
      })
      // params.flag = true 
    }
    else if (params.id == 1 && params.flag == true) {
      await this.setState({
        textMessage: false,
        googleAuthenticator: false,
        securityQuestion: false,
        deleteAuthenticator: true,
        flag: false,
        activeData: 'sms'
      })
      // params.flag = false
    }
    else if (params.id == 2 && params.flag == false) {
      // window.open(`https://www.authenticatorApi.com/pair.aspx?AppName=KeyHelpa&AppInfo=${user?.username}&SecretCode=${user?.code.slice(-12)}`, '_blank').focus()
      await this.setState({
        qrCode: `https://www.authenticatorApi.com/pair.aspx?AppName=KeyHelpa&AppInfo=${user?.username}&SecretCode=${user?.code.slice(-12)}`,
        textMessage: false,
        googleAuthenticator: true,
        securityQuestion: false,
      })
      // params.flag = true
    }
    else if (params.id == 2 && params.flag == true) {
      await this.setState({
        textMessage: false,
        googleAuthenticator: false,
        securityQuestion: false,
        deleteAuthenticator: true,
        activeData: 'google_auth',
        flag: false
      })
      // params.flag = false
    }
    else if (params.id == 3) {
      await this.setState({
        textMessage: false,
        googleAuthenticator: false,
        securityQuestion: true
      })
      // params.flag = true
    }
    else {
      await this.setState({
        textMessage: false,
        googleAuthenticator: false,
        securityQuestion: false,
        deleteAuthenticator: true,
        // flag: false
      })
      // params.flag = false
    }
  }

  body() {
    const { isLoading } = this.state
    return (
      <div style={{
        marginTop: 20,
        width: '100%',
        float: 'left'
      }}>
        {
          menu.map((item, index) => (
            <Toggle
              data={item}
              loading={isLoading}
              onClick={(params) => {
                this.flag(params)
              }}
            />
          ))
        }
      </div>
    )
  }

  render() {
    const { textMessage, googleAuthenticator,
      securityQuestion, deleteAuthenticator,
      addMobile, num, qrCode
    } = this.state;
    return (
      <div>
        <BreadCrumbs
          title={'Two-step verification'}
          page={'account'}
          backIcon={true}
          description="Add an extra layer of security to block unauthorized access and protect your account."
          style={{
            borderBottomWidth: 0
          }}
        />
        {
          this.body()
        }
        {
          (textMessage) && (
            <TextMessageModal
              show={textMessage}
              next={(code, num) => {
                this.next(code, num)
              }}
              onCancel={() => {
                this.setState({
                  textMessage: false
                })
              }}
            />
          )
        }
        {
          (googleAuthenticator) && (
            <GoogleAuthenticatorModal
              show={googleAuthenticator}
              qrCode={qrCode}
              onCancel={() => {
                this.setState({
                  googleAuthenticator: false,
                  flag: true
                })
              }}
            />
          )
        }
        {
          (securityQuestion) && (
            <SecurityQuestionModal
              show={securityQuestion}
              onCancel={() => {
                this.setState({
                  securityQuestion: false,
                  flag: true
                })
              }}
            />
          )
        }
        {
          (addMobile) && (
            <ConfirmationOTP
              show={addMobile}
              number={num}
              onCancels={() => {
                this.setState({
                  addMobile: false,
                  flag: true
                })
              }}
            />
          )
        }
        {
          (deleteAuthenticator) && (
            <DeleteAuthenticatorModal
              show={deleteAuthenticator}
              delete={() => {
                switch (this.state.activeData) {
                  case 'sms':
                    this.updateSecurity('sms');
                    break;
                  case 'google_auth':
                      this.updateSecurity('google_auth');
                      break;
                  default:
                    break;
                }
              }}
              onCancel={() => {
                this.setState({
                  deleteAuthenticator: false,
                  flag: true
                })
              }}
            />
          )
        }
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

