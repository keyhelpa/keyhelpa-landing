import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import Strings from 'modules/generic/helper/String'
import TextField from '@mui/material/TextField';
import './Style.css'
import Routes from 'common/Routes'
import API from 'services/api'
import Footer from 'modules/generic/frames/footer.js'
import { Button, Form } from 'react-bootstrap';
import countryCodes from 'country-codes-list'
import { Alert } from '@mui/material';
import { Check } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Colors from 'common/Colors'
import './mobile.css'
import 'services/validator'
import Modal from 'modules/generic/modal/textButton'
import TextInput from "components/increment/generic/form/TextInput"
import TextArea from 'components/increment/generic/form/TextArea'
import ContactNumber from 'components/increment/generic/form/ContactNumber';
const style = {
  iconAgent: {
    width: 40,
    height: 40,
    float: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginRight: 20,
    backgroundColor: '#34475D', //34475D
    color: 'white'
  },
  iconHelpa: {
    width: 40,
    height: 40,
    // float: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginRight: 20,
    backgroundColor: '#E62D7E',
    color: 'white'
  }
}
export class Contacts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: 'agent',
      name: null,
      ename: null,
      email: null,
      eemail: null,
      contactNumber: null,
      contactPrefix: null,
      organization: null,
      message: null,
      mobilePrefixes: countryCodes.customList('countryCode', '+{countryCallingCode}'),
      submitted: false,
      error: null,
      show: false,
      errorMessage: null,
      successMessage: null
    }
  }

  componentDidMount() {
    const { history } = this.props
    if (history.location.pathname.includes('agent')) {
      this.setState({ theme: 'agent' })
    } else {
      this.setState({ theme: 'helpa' })
    }
  }

  handleSubmit() {
    const { name, email, contactNumber, contactPrefix, organization, message, error } = this.state
    this.setState({
      errorMessage: null,
      successMessage: null
    })
    let params = {
      name: name,
      email: checkEmail(email) ? email : null,
      details: JSON.stringify({
        contact_number: contactPrefix + contactNumber,
        organization: organization,
        message: message
      })
    }
    if (params.name !== null && params.email !== null && params.details.contactNumber !== null && params.details.organization !== null && params.details.message !== null) {
      API.request(Routes.createContact, params, response => {
        this.setState({
          submitted: true,
          name: null,
          email: null,
          organization: null,
          eorganization: null,
          message: null,
          contactNumber: null,
          successMessage: 'Successfully submitted.'
        })
      })
    } else {
      this.setState({
        errorMessage: 'Please fill up the required fields.'
      })
    }
  }

  renderLeft() {
    const { theme } = this.state
    const { accountType } = this.props.state;
    return (
      <div style={{
        width: '80%',
        float: 'left',
        marginLeft: '40%',
      }}
        className="full-width-mobile mt-mobile-50 contact-left-side-content"
      >
        <h1 style={{
          color: accountType == 'agent' ? Colors.agentText : Colors.helpaText
        }}>Contact us</h1>
        <p style={{
          color: accountType == 'agent' ? Colors.agentText : Colors.helpaText
        }}>We love questions and feedback - and we’re always happy to help! Here are some ways to contact us.</p>
        <br /><br />
        <div>
          <p style={{
            color: accountType == 'agent' ? Colors.agentText : Colors.helpaText
          }}>support@keyhelpa.com</p>
          <div style={{
            width: '100%',
            float: 'left'
          }}>
            {
              Strings.socialMedias.map((item) => (
                <div style={{
                  float: 'left'
                }}>
                  <span
                    style={accountType === 'agent' ? style.iconAgent : style.iconHelpa} className="cursor-hover"
                    onClick={() => {
                      window.location.href = item.route
                    }}
                  >
                    <FontAwesomeIcon icon={item.icon} size="1x" />
                  </span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }

  renderAlert() {
    const { theme, error, show } = this.state
    console.log('error', error)
    return (
      <div>
        {error == true ?
          <Modal
            show={show}
            title={'Error'}
            description={'Please fill out missing fields'}
            withCancel={true}
            onCancel={this.setState({
              show: false
            })}
          />
          :
          <Modal
            show={show}
            title={'Thank  you!'}
            description={'Your message has been sent. Our support team will respond within 24 hours'}
            withCancel={true}
            onCancel={this.setState({
              show: false
            })}
          />
        }
      </div>
    )
  }

  renderRight() {
    const { theme, mobilePrefixes, errorMessage } = this.state
    const { name, ename, email, eemail, contactNumber, organization, eorganization, message, successMessage } = this.state
    const { accountType } = this.props.state;
    return (
      <div
        style={{
          width: '60%',
          float: 'left',
          background: accountType == 'agent' ? Colors.agentDarkGray : Colors.helpaDarkPink,
          borderRadius: 20,
          padding: 30,
          color: Colors.white,
          marginLeft: '30%',
          minHeight: '45vh'
        }}
        className="full-width-mobile text-field-container"
      >
        {
          errorMessage && (
            <p style={{
              color: Colors.white
            }}>
              {
                errorMessage
              }
            </p>
          )
        }
        {
          successMessage && (
            <p style={{
              color: Colors.white
            }}>
              {
                successMessage
              }
            </p>
          )
        }
        <div style={{
          width: '100%',
          float: 'left',
        }}>
          <div style={{
            width: '100%',
            float: 'left',
            color: Colors.white,
            marginBottom: 25
          }}>
            <TextInput
              placeholder={'Type full name here'}
              type={"text"}
              label={'Full name'}
              value={name}
              onChange={(name, ename) => {
                this.setState({
                  name,
                  ename
                })
              }}
              style={{
                borderBottom: 'solid 3px ' + Colors.white
              }}
              inputStyle={{
                color: Colors.white
              }}
              errorStyle={{
                color: Colors.white
              }}
              validation={{
                size: 2,
                type: 'text',
                column: 'Name',
                error: ename
              }}
            />
          </div>

          <div style={{
            width: '100%',
            float: 'left',
            color: Colors.white
          }}>
            <div style={{
              float: 'left',
              width: '50%',
              marginBottom: 25
            }}
            className="full-width-mobile"
            >
              <TextInput
                placeholder={'Type email here'}
                type={"text"}
                value={email}
                label={'Email'}
                onChange={(email, eemail) => {
                  this.setState({
                    email,
                    eemail
                  })
                }}
                style={{
                  borderBottom: 'solid 3px ' + Colors.white
                }}
                inputStyle={{
                  color: Colors.white
                }}
                errorStyle={{
                  color: Colors.white
                }}
                validation={{
                  size: 2,
                  type: 'email',
                  column: 'Email',
                  error: eemail
                }}
              />
            </div>

            <div style={{
              float: 'left',
              width: '45%',
              marginBottom: 25,
              marginLeft: '35px'
            }}
            className="full-width-mobile"
            >
              <p style={{
                color: Colors.white
              }}>
                <b>Phone number</b>
              </p>
              <ContactNumber
                contactNumber={this.state.contactNumber}
                hasFlag={true}
                style={{borderBottom: '3px solid white'}}
                textColor={{color: 'white'}}
                handleMobileNumber={(countryCode, mobile, errorMobile) => {
                  this.setState({
                    contactPrefix: countryCode,
                    contactNumber: mobile, 
                    errorMobile
                  })
                }}
                errorMobile={''}
              />
              {/* <Form.Select aria-label="Default select example" style={{ width: '130px', margin: 0 }} onChange={(e) => this.setState({ contactPrefix: e.target.value })}>
                {
                  Object.values(mobilePrefixes).map(item => (
                    <option value={item}>{item}</option>
                  ))
                }
              </Form.Select>
              <Form.Control style={{ margin: 0 }} type="number" size="sm" onChange={(e) => this.setState({ contactNumber: e.target.value })}></Form.Control> */}
            </div>

          </div>

          <div style={{
            width: '100%',
            float: 'left',
            color: Colors.white,
            marginBottom: 25
          }}>
            <TextInput
              placeholder={'Type full organization here'}
              type={"text"}
              label={'Organization name'}
              value={organization}
              onChange={(organization, eorganization) => {
                this.setState({
                  organization,
                  eorganization
                })
              }}
              style={{
                borderBottom: 'solid 3px ' + Colors.white
              }}
              inputStyle={{
                color: Colors.white
              }}
              errorStyle={{
                color: Colors.white
              }}
              validation={{
                size: 2,
                type: 'text',
                column: 'Organization',
                error: eorganization
              }}
            />
          </div>
          <div style={{
            width: '100%',
            float: 'left',
            color: Colors.white,
            marginBottom: 25
          }}>
            <TextArea
              placeholder={'Type your message here'}
              type={"text"}
              label={'Message'}
              style={{
                background: 'transparent',
                paddingLeft: 0,
                paddingRight: 0,
                minHeight: 100,
                borderBottom: 'solid 2px ' + Colors.white
              }}
              inputStyle={{
                color: Colors.white
              }}
              errorStyle={{
                color: Colors.white
              }}
              value={message}
              rows={5}
              onChange={(message, errorMesssage) => {
                this.setState({
                  message
                })
              }}
              validation={{
                type: 'text',
                size: 0,
                column: 'Message'
              }}
            />
          </div>
        </div>
        <div>
          {/* <p>Captcha</p> */}
          <Button style={{ float: 'right' }} className="btn-submit" onClick={() => this.handleSubmit()}>Submit</Button>
        </div>
      </div>
    )
  }


  renderContent() {
    const { accountType } = this.props.state
    return (
      <div style={{
        width: '100%',
        float: 'left',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}
        className="full-width-mobile unset-flex-mobile"
      >
        <div style={{
          width: '30%',
          float: 'left'
        }}
          className="full-width-mobile"
        >
          {this.renderLeft()}
        </div>
        <div style={{
          width: '70%',
          float: 'left'
        }}
          className="full-width-mobile">
          {this.renderRight()}
        </div>
      </div>
    )
  }
  render() {
    return (
      <div style={{
        width: '100%',
        float: 'left',
        minHeight: '100vh'
      }}>
        {this.renderContent()}
        {this.state.submitted && (
          this.renderAlert()
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ state: state })

const mapDispatchToProps = (dispatch) => {
  const { actions } = require('reduxhandler');
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Contacts))