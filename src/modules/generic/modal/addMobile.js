import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors'
import { Modal } from 'react-bootstrap'
import ModalHeader from './header'
import ModalFooter from './footer'
import Style from './style'
import SmsCodeInput from 'modules/generic/form/SmsCode'
import API from 'services/api'
import Routes from 'common/Routes'

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      errorMessage: null,
      textCode: null,
      errorCode: null,
      errorMessage: null
    };
  }

  componentDidMount() {
    this.retrieve()

  }
  retrieve(){
    const { user } = this.props.state;
    if(user == null)return
    this.setState({
      isLoading: true
    })
    API.request(Routes.securitySettingsRetrieve, {
      condition: [{
        value: user.id,
        column: 'account_id',
        clause: '='
      }]
    }, response => {
      this.setState({
        isLoading: false
      })
      if(response && response.data > 0){
        this.setState({
          data: response.data[0],
          textCode: response.data[0].code
        })
      }else{
        this.setState({
          data: null
        })
      }
    }, error => {
      this.setState({
        isLoading: false
      })
    })
  }
  navigate(route) {
    this.props.history.push(route)
  }
  submit() {
    const { data, textCode } = this.state;
    const { user } = this.props.state;
    let parameter = data ? {
      id: data.id,
      account_id: user.id,
      details: JSON.stringify({
        textCode
      })
    }
      : {
        account_id: user.id,
        details: JSON.stringify({
          textCode
        })
      };
    this.setState({
      isSubmitLoading: true
    })
    API.request(data ? Routes.securitySettingsUpdate : Routes.securitySettingsCreate, parameter, response => {
      this.setState({
        isSubmitLoading: false
      })
      if (response && response.data) {
        this.navigate('')
      }
    }, error => {
      this.setState({
        errorMessage: 'Invalid',
        isSubmitLoading: false
      })
    });
  }
  // componentDidMount() {
  //   const { user } = this.props.state;
  //   if (user == null) return null
  //   this.setState({
  //     isLoading: true
  //   })
  //   API.request(Routes.securitySettingsRetrieve, {
  //     condition: [{
  //       value: user.id,
  //       column: 'account_id',
  //       clause: '='
  //     }]
  //   }, response => {
  //     this.setState({
  //       isLoading: false
  //     })
  //     if (response.data && response.data.length > 0) {
  //       this.setState({
  //         data: response.data[0],
  //         sms: response.data[0].sms
  //       })
  //     } else {
  //       this.setState({
  //         data: null
  //       })
  //     }
  //   }, error => {
  //     this.setState({
  //       errorMessage: 'Invalid Accessed',
  //       isLoading: false
  //     })
  //   });
  // }

  body() {
    const { textCode, errorCode } = this.state;
    return (
      <Modal.Body style={{
        paddingLeft: 20,
        paddingRight: 20
      }}>
        <div
          style={{
            width: '100%',
            float: 'left',
          }}
          className="full-width-mobile">
          <div
            style={{
              width: '100%',
              float: 'left',
              textAlign: 'center'
            }}
            className="full-width-mobile"
          >
            <SmsCodeInput
            value={textCode}
              onChange={(textCode, errorCode) => {
                this.setState({
                  textCode
                })
              }}
            />
          </div>

        </div>
      </Modal.Body>

    )
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={() => this.props.onCancels()}
        style={Style.modal}
      >

        <ModalHeader
          title={'Enter SMS code'}
          subTitle={'Text message verification'}
          subTitle1={`We've sent a text message to`}
          onCancel={() => this.props.onCancels()}
        />

        <h2 style={{ alignSelf: 'center' }}>{this.props.number}</h2>

        {
          this.body()
        }

        <ModalFooter
          actions={[{
            title: 'Next'
          }]}
          onClick={(params) => {
            this.submit()
          }}
          bottomComponent={() => {
            return (
              <p>Didn't receive your code?
                <b style={{
                  paddingLeft: 5
                }}
                  onClick={() => {
                    this.navigate('')
                  }}
                  className="href-link"
                >
                  Resend.
                </b></p>
            )
          }}
        />

      </Modal>
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

