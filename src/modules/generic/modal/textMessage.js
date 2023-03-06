import React, { createRef } from "react";
import { Modal } from "react-bootstrap";
import ModalHeader from "./header";
import ModalFooter from "./footer";
import Style from "./style";
import TextInput from "components/increment/generic/form/TextInput";

export default class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.menu = createRef();
    this.state = {
      message: null,
      errorMessage: null,
      errorLastName: null,
      contactNumber: null,
    };
  }

  body() {
    const { contactNumber, errorLastName } = this.state;
    return (
      <Modal.Body
        style={{
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <div
          style={{
            width: "100%",
            float: "left",
          }}
          className="full-width-mobile"
        >
          <TextInput
            placeholder={"Mobile"}
            type={"text"}
            value={contactNumber}
            numbersOnly={true}
            prefix={"+61"}
            style={{
              width: "100%",
              float: "left",
            }}
            onChange={(e) => {
              // this.validation(e)
              this.setState({
                contactNumber: e,
              });
            }}
            validation={{
              type: "text_without_space",
              size: 11,
              column: "contactNumber",
              error: errorLastName,
            }}
          />
        </div>
      </Modal.Body>
    );
  }

  render() {
    const { contactNumber } = this.state;
    return (
      <Modal
        show={this.props.show}
        onHide={() => this.props.onCancel()}
        style={Style.modal}
      >
        <ModalHeader
          title={"Add your mobile"}
          subTitle={"Text message verification"}
          onCancel={() => this.props.onCancel()}
        />

        {this.body()}

        <ModalFooter
          actions={[
            {
              title: "Next",
            },
          ]}
          onClick={() => {
            this.props.next(contactNumber);
          }}
          bottomLabel="Messaging rates may apply."
        />
      </Modal>
    );
  }
}
