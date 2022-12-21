import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors'
import { Modal } from 'react-bootstrap'
import ModalHeader from './header'
import ModalFooter from './footer'
import Style from './style'
import TextInput from "components/increment/generic/form/TextInput"
import CheckBox from 'modules/generic/form/CheckBox'
import { BasicStyles } from 'common';
import SelectInput from 'components/increment/generic/form/SelectInput'
import Routes from 'common/Routes'
import API from 'services/api'

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      errorMessage: null,
      securityQuestion: null,
      answer: null,
      errorAnswer: null,
      thisDevice: null,
      security_questions: null

    };
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange() {
    this.setState({ securityQuestion: this.menu.value })
  }
  componentDidMount() {
    const { user } = this.props.state;
    if (user == null) return null
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
      if (response.data && response.data.length > 0) {
        let details = JSON.parse(response.data[0].details)
        this.setState({
          data: response.data[0],
          securityQuestion: details.securityQuestion ? details.securityQuestion : null,
          answer: details.answer ? details.answer : null,
        })
      } else {
        this.setState({
          data: null
        })
      }
    }, error => {
      this.setState({
        errorMessage: 'Invalid',
        isLoading: false
      })
    });
  }

  submit() {
    const { data, answer, securityQuestion } = this.state;
    const { user } = this.props.state;
    let parameter = data ? {
      id: data.id,
      account_id: user.id,
      details: JSON.stringify({
        securityQuestion,
        answer
      })
    }
      : {
        account_id: user.id,
        details: JSON.stringify({
          securityQuestion,
          answer
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
      }
    }, error => {
      this.setState({
        errorMessage: 'Invalid',
        isSubmitLoading: false
      })
    });
  }

  navigate(route) {
    this.props.history.push(route)
  }

  submit(){
    const { data, securityQuestion, answer } = this.state;
    const { user } = this.props.state;
    if(user == null) return
    if(securityQuestion == null || answer == null){
      this.setState({
        errorMessage: 'All fields are required'
      })
      return
    }

    let parameter = data ? {
      id: data.id,
      account_id: user.id,
      security_questions: 1,
      details: JSON.stringify({
        securityQuestion,
        answer
      })
    }
      : {
        account_id: user.id,
        security_questions: 1,
        details: JSON.stringify({
          securityQuestion,
          answer
        })
      };

    this.setState({
      isSubmitLoading: true
    })

    API.request(data ? Routes.securitySettingsUpdate : Routes.securitySettingsCreate, parameter, response => {
      this.setState({
        isSubmitLoading: false
      })
      if(response && response.data){
        this.navigate('/settings/security')
      }
    }, error => {
      this.setState({
        errorMessage: 'Invalid',
        isSubmitLoading: false
      })
    });
  }
  
  body() {
    const { answer, securityQuestion,
      errorAnswer, thisDevice
    } = this.state;
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
          className="full-width-mobile"
        >
          <SelectInput
            value={securityQuestion}
            items={['Question', 'What is the name of your first pet?']}
            style={{
              marginRight: '5%'
            }}
            onChange={(securityQuestion,errorAnswer) => {
              this.handleChange()
              this.setState({
                securityQuestion
              })
            }}
            ref={(input) => this.menu = input}
            validation={{
              type: 'text_without_space',
              size: '',
              column: 'securityQuestion',
              error: errorAnswer
            }}
            className="container-45-full-mobile"
          />
          <div
            className="container-45-full-mobile"
          >
            <TextInput
              placeholder={'Answer'}
              type={"text"}
              value={answer}
              style={{
                width: '100%',
                float: 'left',
              }}
              onChange={(answer, errorAnswer) => {
                this.setState({
                  answer
                })
              }}
              validation={{
                type: 'text_without_space',
                size: 1000,
                column: 'answer',
                error: errorAnswer
              }}
            />
          </div>
          <div
            style={{
              width: '100%',
              float: 'left',
              margin: '3%'
            }}
            className="full-width-mobile">
            <CheckBox
              selected={thisDevice}
              data={[{
                title: 'Keep me logged in on this device',
              }]}
              onChange={(res) => {
                this.setState({ thisDevice: res })
              }}
            />
          </div>
        </div>
      </Modal.Body>
    )
  }

  render() {
    const { feedbackText, errorText } = this.state;
    return (
      <Modal
        show={this.props.show}
        onHide={() => this.props.onCancel()}
        style={Style.modal}
      >

        <ModalHeader
          title={'Security question'}
          subTitle={'Set a security question'}
          onCancel={() => this.props.onCancel()}
        />

        {
          this.body()
        }

        <ModalFooter
          actions={[{
            title: 'Save'
          }]}
          onClick={(params) => {
            this.submit()
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
