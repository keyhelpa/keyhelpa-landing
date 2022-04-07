import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import Social from 'modules/generic/Socials.js';
import TextField from '@mui/material/TextField';
import './Style.css'
import Footer from 'modules/frame/footer.js'
import { Button, Form } from 'react-bootstrap';

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
      theme: 'agent'
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

  renderRight(){
    const {theme} = this.state
    return (
      <div className={theme && theme === 'agent' ? "form-helpa agent-dark-bg" : "form-helpa helpa-dark-bg"}>
        <Form>
          <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" size="sm"></Form.Control>
          </Form.Group>
          <Form.Group style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{width: '50%'}}>
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" size="sm"></Form.Control>
            </div>
            <div style={{width: '45%'}}>
              <Form.Label>Contact Number</Form.Label>
              <div style={{display: 'flex'}}>
                <Form.Select aria-label="Default select example" style={{width: '80px'}}>
                  <option value="1">+23</option>
                  <option value="2">+1</option>
                  <option value="3">+63</option>
                </Form.Select>
                <Form.Control type="text" size="sm"></Form.Control>
              </div>
            </div>
          </Form.Group>
          <Form.Group>
              <Form.Label>Organization</Form.Label>
              <Form.Control type="text" size="sm"></Form.Control>
          </Form.Group>
          <Form.Group>
              <Form.Label>Message</Form.Label>
              <Form.Control type="text" size="sm"></Form.Control>
          </Form.Group>
        </Form>
        <div>
          <p>Captcha</p>
          <Button style={{float: 'right'}} className="btn-submit">Submit</Button>
        </div>
      </div>
    )
  }
  renderContent(){
    const {selectedUser} = this.props.state
    return (
      <div>
      <div className={selectedUser === 'agent' ? 'contents agent' : 'contents helpa'}>
        <div className="container-40-full-mobile" style={{
          marginTop: 50
        }}>
          {this.renderLeft()}
        </div>
        <div className="container-60-full-mobile">
          {this.renderRight()}
        </div>
        </div>
        <Footer/>
      </div>
    )
  }
  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({state: state})

const mapDispatchToProps = (dispatch) =>{
  const { actions } = require('reduxHandler');
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Contacts))