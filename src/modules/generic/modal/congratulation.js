import React from "react";
import { Modal } from "react-bootstrap";
import ModalHeader from "./header";
import ModalFooter from "./footer";
import Style from "./style";
import Colors from "common/Colors";
import Logo from "../../assets/img/posted_congratss.png";
export default class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  body() {
    return (
      <Modal.Body
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          textAlign: "center",
        }}
      >
        <img
          src={Logo}
          style={{
            width: "auto",
            height: "60px",
          }}
        />
        <p>{this.props.message}</p>
      </Modal.Body>
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
          title={"Confirmation"}
          subTitle={null}
          onCancel={() => this.props.onCancel()}
        />

        {this.body()}

        <ModalFooter
          actions={[
            {
              title: "Close",
              style: {
                backgroundColor: Colors.danger,
                marginRight: 20,
              },
            },
            {
              title: "Continue",
              style: {
                backgroundColor: Colors.primary,
              },
            },
          ]}
          onClick={(params) => {
            if (params.title == "Close") {
              this.props.onCancel();
            } else {
              this.props.onContinue();
            }
          }}
        />
      </Modal>
    );
  }
}
