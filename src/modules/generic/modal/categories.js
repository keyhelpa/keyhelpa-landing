import React from 'react';
import { connect } from 'react-redux';
import Colors from 'common/Colors'
import { Modal } from 'react-bootstrap'
import ModalHeader from './header'
import ModalFooter from './footer'
import Style from './style'
import API from 'services/api'
import { withRouter } from 'react-router-dom';
import Routes from 'common/Routes'
import CheckBox from 'modules/generic/form/CheckBox'
import TextInput from "components/increment/generic/form/TextInput"
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      errorMessage: null,
      task: '',
      tasks: [],
      licenses: [],
      cert: [],
      errorTask: null,
      certificate: false,
      registration: false,
      license: false,
      isLoading: false
    };
  }

  componentDidMount() {
    if (this.props.data > 0) {
      this.retrieveById()
    }
  }

  retrieveById() {
    const { user } = this.props.state;
    let parameter = {
      account_id: user.id,
      id: this.props.data
    }
    API.request(Routes.categoriesRetrieve, parameter, response => {
      let data = response.data
      this.setState({
        message: data.name,
        tasks: JSON.parse(data.tasks),
        licenses: JSON.parse(data.licences)
        // cert: data.certificate_required === 1 ? [{ title: "Certificate required", value: false }] : [],
      })
    })
  }

  addToTasks(tasking, certs) {
    this.setState({
      task: '',
      cert: []
    })
    if (tasking !== null && tasking !== '') {
      var taskJoine = this.state.tasks.concat({ tasking, cert: certs })
      this.setState({
        task: '',
        cert: [],
        tasks: taskJoine
      })
    }
  }

  deleteTasks(index) {
    if (index > -1) {
      let temp = this.state.tasks
      let temp2 = temp.filter((item, idx) => { return idx !== index })
      this.setState({ tasks: temp2 })
    }
  }

  update() {
    const { user } = this.props.state;
    this.setState({
      isLoading: true
    })
    let parameter = {
      account_id: user.id,
      id: this.props.data,
      name: this.state.message,
      tasks: JSON.stringify(this.state.tasks),
      certificate_required: 0,
      licences: JSON.stringify(this.state.licenses)
    }
    API.request(Routes.categoriesUpdate, parameter, response => {
      this.setState({
        isLoading: false
      })
      if (response.data === true) {
        this.props.onSuccess()
      }
    })
  }

  create() {
    const { user } = this.props.state;
    this.setState({
      isLoading: true
    })
    let parameter = {
      account_id: user.id,
      name: this.state.message,
      tasks: JSON.stringify(this.state.tasks),
      certificate_required: 0,
      licences: JSON.stringify(this.state.licenses)
    }
    API.request(Routes.categoriesCreate, parameter, response => {
      this.setState({
        isLoading: false
      })
      if (response.data > 0) (
        this.props.onSuccess()
      )
    }, error => {
      this.setState({
        isLoading: false
      })
    })
  }

  onChangeTask(item, errorMessage) {
    this.setState({
      task: item, errorMessage
    })
  }

  renderDetails() {
    const { message, errorMesssage, task, errorTask, certificate, tasks, registration, license, cert, licenses } = this.state;
    return (
      <div style={{
        width: '100%',
        float: 'left'
      }}>
        <TextInput
          placeholder={this.props.placeholder}
          type={"text"}
          value={message}
          style={{
            background: 'transparent'
          }}
          onChange={(message, errorMesssage) => {
            this.setState({
              message, errorMesssage
            })
          }}
          validation={{
            type: 'text_without_space',
            size: 5,
            column: 'Name',
            error: errorMesssage
          }}
        />
        <TextInput
          placeholder={'Enter task'}
          type={"text"}
          value={task}
          style={{
            background: 'transparent',
            marginTop: 10,
            marginBottom: 15
          }}
          onChange={(task, errorTask) => {
            this.onChangeTask(task, errorTask)
          }}
          iconRight={faPlusCircle}
          iconStyle={Colors.darkGray}
          onClickRightIcon={() => {
            if (task !== null) {
              this.addToTasks(task, cert)
            }
          }}
          validation={{
            type: 'text_without_space',
            size: 5,
            column: 'Task',
            error: errorTask
          }}
        />

        <CheckBox
          data={[{
            title: "Certificate required",
            value: certificate
          }]}
          selected={cert}
          onChange={(res) => {
            this.setState({ cert: res })
          }}
        />

        {
          tasks.length > 0 && tasks.map((item, index) =>
            <div>
              <TextInput
                placeholder={'Enter task'}
                type={"text"}
                value={item.tasking}
                disable={true}
                style={{
                  background: 'transparent',
                  marginBottom: 15
                }}
                iconRight={faMinusCircle}
                iconStyle={Colors.darkGray}
                onClickRightIcon={() => {
                  this.deleteTasks(index)
                }}
                validation={{
                  type: 'text_without_space',
                  size: 0
                }}
              />
              <CheckBox
                data={[{
                  title: "Certificate required",
                  value: certificate
                }]}
                selected={item.cert}
                onChange={(res) => {
                  console.log('[.......]', res)
                }}
              />
            </div>

          )
        }


        <h3
          style={{
            color: Colors.darkGray
          }}>
          Licence
        </h3>
        <p>Do you hold a property certificate of registration or a real estate license</p>
        <CheckBox
          data={[{
            title: "Property certificate of registration",
            value: registration
          }, {
            title: "Real estate license",
            value: license
          }]}
          selected={licenses}
          onChange={(title) => {
            this.setState({
              licenses: title
            })
            // this.onChangeCheck(title)
          }}
        />
      </div>
    )
  }

  body() {
    return (
      <Modal.Body style={{
        paddingLeft: 20,
        paddingRight: 20
      }}>
        {
          this.renderDetails()
        }
      </Modal.Body>

    )
  }
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={() => this.props.onCancel()}
        style={Style.modal}
      >

        <ModalHeader
          title={this.props.title}
          subTitle={this.props.description}
          onCancel={() => this.props.onCancel()}
        />

        {
          this.body()
        }

        <ModalFooter
          actions={[{
            title: this.props.data > 0 ? 'Update' : 'Create'
          }]}
          onClick={() => {
            this.props.data > 0 ? this.update() : this.create()
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