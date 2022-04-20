import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import Social from 'common/Socials.js';
import TextField from '@mui/material/TextField';
import './Style.css'
import Routes from 'common/Routes'
import API from 'services/Api'
import Footer from 'modules/generic/frames/footer.js'
import { Button, Form } from 'react-bootstrap';
import countryCodes from 'country-codes-list'
import { Alert } from '@mui/material';
import { Check } from '@mui/icons-material';

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
    this.state={
      theme: 'agent',
      name: null,
      email: null,
      contactNumber: null,
      contactPrefix: null,
      organization: null,
      message: null,
      mobilePrefixes: countryCodes.customList('countryCode', '+{countryCallingCode}'),
      submitted: false
    }
  }

  componentDidMount() {
    const {history} = this.props
    if(history.location.pathname.includes('agent')) {
      this.setState({theme: 'agent'})
    }else{
      this.setState({theme: 'helpa'})
    }
  }

  handleSubmit(){
    const {name, email, contactNumber, contactPrefix, organization, message} = this.state
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
      this.setState({submitted: true})
      setTimeout(() => {
        this.setState({submitted: false})
      }, 5000)
    })
  }

  renderLeft(){
    const {theme} = this.state
    return (
      <div className="main-content">
            <h1 className="agent">Contact Us</h1>
            <p>We love questions and feedback - and we’re always happy to help! Here are some ways to contact us.</p>
            <br/><br/>
            <div>
              <p>Connect With Us On</p>
              <div style={{
                width: '100%',
                display: 'flex',
                textAlign: 'center',
                justifyContent: 'center'
              }}>
                {
                  Social.socialMedias.map((item) => (
                    <span
                      style={theme === 'agent' ? style.iconAgent : style.iconHelpa} className="cursor-hover"
                      onClick={() => {
                        window.location.href = item.route
                      }}
                    >
                      {item.icon}
                    </span>
                  ))
                }
              </div>
            </div>
        </div>
    )
  }

  renderAlert(){
    const {theme} = this.state
    return (
      <div style={{
        position: 'absolute',
        bottom: 0
      }}>
      <Alert icon={<Check fontSize='inherit'/>}  severity="success">
          {theme === 'agent' ? 'Your message was sent to the agent' : 'Your message was sent to the helpa'}
      </Alert>
      </div>
    )
  }

  renderRight(){
    const {theme, mobilePrefixes} = this.state
    return (
      <div className={theme && theme === 'agent' ? "form-helpa agent-dark-bg" : "form-helpa helpa-dark-bg"}>
        <Form>
          <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" size="sm" onChange={(e) => this.setState({name: e.target.value})}></Form.Control>
          </Form.Group>
          <Form.Group style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{width: '50%'}}>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" size="sm" onChange={(e) => this.setState({email: e.target.value})}></Form.Control>
            </div>
            <div style={{width: '45%'}}>
              <Form.Label>Contact Number</Form.Label>
              <div style={{display: 'flex'}}>
                <Form.Select aria-label="Default select example" style={{width: '130px'}} onChange={(e) => this.setState({contactPrefix: e.target.value})}>
                  {
                    Object.values(mobilePrefixes).map(item => (
                      <option value={item}>{item}</option>
                    ))
                  }
                </Form.Select>
                <Form.Control type="number" size="sm" onChange={(e) => this.setState({contactNumber: e.target.value})}></Form.Control>
              </div>
            </div>
          </Form.Group>
          <Form.Group>
              <Form.Label>Organization</Form.Label>
              <Form.Control type="text" size="sm" onChange={(e) => this.setState({organization: e.target.value})}></Form.Control>
          </Form.Group>
          <Form.Group>
              <Form.Label>Message</Form.Label>
              <Form.Control type="text" size="sm" onChange={(e) => this.setState({message: e.target.value})}></Form.Control>
          </Form.Group>
        </Form>
        <div>
          <p>Captcha</p>
          <Button style={{float: 'right'}} className="btn-submit" onClick={() => this.handleSubmit()}>Submit</Button>
        </div>
      </div>
    )
  }
  renderContent(){
    const {theme} = this.state
    return (
      <div className={theme === 'agent' ? 'contents agent' : 'contents helpa'}>
        <div className="container-40-full-mobile" style={{
          marginTop: 50
        }}>
          {this.renderLeft()}
        </div>
        <div className="container-60-full-mobile">
          {this.renderRight()}
        </div>
      </div>
    )
  }
  render() {
    return (
      <div>
        {this.renderContent()}
        {this.state.submitted && (
          this.renderAlert()
        )}
        <Footer/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({state: state})

const mapDispatchToProps = (dispatch) =>{
  const { actions } = require('reduxhandler');
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Contacts))