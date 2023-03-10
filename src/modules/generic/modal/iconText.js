import React from "react";
import Colors from "common/Colors";
import { Modal } from "react-bootstrap";
import ModalHeader from "./header";
import ModalFooter from "./footer";
import Style from "./style";
import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SvgIcon } from "@mui/material";
export default class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      errorMessage: null,
    };
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
        {this.props.type == "icon" && (
          <SvgIcon
            component={this.props.src}
            style={{
              color: Colors.gray,
              fontSize: 200,
              ...this.props.iconColor,
            }}
          />
        )}
        {this.props.type == "image" && (
          <Image
            src={this.props.src}
            style={{
              width: "80%",
              height: "auto",
            }}
          />
        )}
        <p
          style={{
            marginTop: 20,
            textAlign: this.props.list == true ? "left" : "center",
            ...this.props.textStyle,
          }}
        >
          {this.props.list && this.props.description()}
          {this.props.description}
        </p>
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
          title={this.props.title}
          subTitle={this.props.subTitle}
          onCancel={() => this.props.onCancel()}
        />

        {this.body()}

        <ModalFooter
          actions={this.props.actions}
          onClick={(params) => {
            this.props.onClick(params);
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
