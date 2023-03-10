import React from "react";
import Colors from "common/Colors";
import { Modal } from "react-bootstrap";
import ModalHeader from "./header";
import ModalFooter from "./footer";
import Style from "./style";
import Routes from "common/Routes";
import API from "services/api";

export default class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      errorMessage: null,
    };
  }

  delete() {
    const { user } = this.props.state;
    let parameter = {
      account_id: user.id,
      id: this.state.id,
    };
    this.setState({
      isLoading: true,
    });
    API.request(Routes.securitySettingsDelete, parameter, (response) => {
      this.setState({
        isLoading: false,
      });
      if (response.data > 0) {
        // this.retrieve()
        this.props.history.push("");
      }
    });
  }

  body() {
    const { message, errorMesssage } = this.state;
    return (
      <Modal.Body
        style={{
          paddingLeft: 20,
          paddingRight: 20,
        }}
      ></Modal.Body>
    );
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={() => this.props.onCancel()}
        style={Style.modal}
      >
        <ModalHeader
          title={"Deleting authenticator app"}
          subTitle={
            "Are you sure? Deleting your authenticator app will disable authenticator verification and remove the extra security on your account."
          }
          onCancel={() => this.props.onCancel()}
        />

        {this.body()}

        <ModalFooter
          actions={[
            {
              title: "Yes, Delete",
            },
          ]}
          onClick={(params) => {
            this.props.delete();
          }}
          onCancel={(params) => {
            this.props.onCancel();
          }}
          cancel={true}
        />
      </Modal>
    );
  }
}
