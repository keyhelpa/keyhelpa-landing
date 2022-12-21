import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import Strings from 'modules/generic/helper/String'
import './Style.css'
import Routes from 'common/Routes'
import API from 'services/api'
import { Button, Form } from 'react-bootstrap';
import countryCodes from 'country-codes-list'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Colors from 'common/Colors'
import './mobile.css'
import Modal from 'modules/generic/modal/textButton'
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
      email: null,
      contactNumber: null,
      contactPrefix: null,
      organization: null,
      message: null,
      mobilePrefixes: countryCodes.customList('countryCode', '+{countryCallingCode}'),
      submitted: false,
      error: null
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
    const { name, email, contactNumber, contactPrefix, organization, message } = this.state
    let params = {
      name: name,
      email: email,
      details: JSON.stringify({
        contact_number: contactPrefix + contactNumber,
        organization: organization,
        message: message
      })
    }
    API.request(Routes.createContact, params, response => {
      this.setState({
        submitted: true,
        name: null,
        email: null,
        organization: null,
        message: null,
        contactNumber: null,
        error: true
      })
      setTimeout(() => {
        this.setState({ submitted: false })
      }, 5000)
    })
  }

  renderLeft() {
    const { theme } = this.state
    const { accountType } = this.props.state;
    return (
      <div style={{
        width: '60%',
        float: 'left',
        marginLeft: '40%',
      }}
      className="full-width-mobile mt-mobile-50 contact-left-side-content"
      >
        <h1 style={{
          color: accountType == 'agent' ? Colors.agentText : Colors.helpaPink
        }}>Contact Us</h1>
        <p style={{
          color: accountType == 'agent' ? Colors.agentText : Colors.helpaPink
        }}>We love questions and feedback - and we’re always happy to help! Here are some ways to contact us.</p>
        <br /><br />
        <div>
          <p style={{
            color: accountType == 'agent' ? Colors.agentText : Colors.helpaPink
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
                    style={theme === 'agent' ? style.iconAgent : style.iconHelpa} className="cursor-hover"
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
    const { theme } = this.state
    return (
      <div>
        <Modal
        show={true}
        title={'Thank  you!'}
        description={'Your message has been sent. Our support team will respond within 24 hours'}
        withCancel={true}
        />
      </div>
    )
  }

  renderRight() {
    const { theme, mobilePrefixes, error } = this.state
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
          this.error ? () => {
            <div>
              <p style={{
                color: 'red'
              }}>A network error has occurred. Please try again.</p>
            </div>
          } : ""
        }
        <Form>
          <Form.Group>
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" size="sm" onChange={(e) => this.setState({ name: e.target.value })}></Form.Control>
          </Form.Group>
          <Form.Group style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '50%' }}>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" size="sm" onChange={(e) => this.setState({ email: e.target.value })}></Form.Control>
            </div>
            <div style={{ width: '45%' }}>
              <Form.Label>Contact Number</Form.Label>
              <div style={{ display: 'flex' }}>
                <Form.Select aria-label="Default select example" style={{ width: '130px' }} onChange={(e) => this.setState({ contactPrefix: e.target.value })}>
                  {
                    Object.values(mobilePrefixes).map(item => (
                      <option value={item}>{item}</option>
                    ))
                  }
                </Form.Select>
                <Form.Control type="number" size="sm" onChange={(e) => this.setState({ contactNumber: e.target.value })}></Form.Control>
              </div>
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>Organization</Form.Label>
            <Form.Control type="text" size="sm" onChange={(e) => this.setState({ organization: e.target.value })}></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Message</Form.Label>
            <Form.Control type="text" size="sm" onChange={(e) => this.setState({ message: e.target.value })}></Form.Control>
          </Form.Group>
        </Form>
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
