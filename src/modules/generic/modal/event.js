import React from "react";
import { Modal } from "react-bootstrap";
import ModalHeader from "./header";
import ModalFooter from "./footer";
import Style from "./style";
export default class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      errorMessage: null,
    };
  }

  // Format: (Generic) Title, Image/Icon, Text, Button
  body() {
    return (
      <Modal.Body
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          textAlign: "center",
        }}
      ></Modal.Body>
    );
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
          title={this.props.title}
          onCancel={() => this.props.onCancel()}
        />

        {this.body()}

        <ModalFooter
          actions={this.props.actions}
          onClick={(params) => {
            this.props.onClick();
          }}
        />
        {this.props.withCancel && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            <p
              style={{
                display: "inline-block",
                fontSize: 20,
                cursor: "pointer",
              }}
              onClick={() => this.props.onCancel()}
            >
              Close
            </p>
          </div>
        )}
      </Modal>
    );
  }
}
