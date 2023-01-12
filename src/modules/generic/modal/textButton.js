import React from "react";
import Colors from "common/Colors";
import { Modal } from "react-bootstrap";
import ModalHeader from "./header";
import ModalFooter from "./footer";
import Style from "./style";
import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/increment/generic/form/Button";
export default class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      errorMessage: null,
    };
  }

  // Format: (Generic) Title, Text, Button
  body() {
    return (
      <Modal.Body
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          textAlign: "center",
        }}
      >
        <p
          style={{
            marginTop: 20,
          }}
        >
          {this.props.description}
        </p>
      </Modal.Body>
    );
  }
  render() {
    const { feedbackText, errorText } = this.state;
    return (
      <Modal
        show={this.props.show}
        onHide={() => this.props.onCancel()}
        style={Style.modal}
        centered={this.props.centered}
      >
        <ModalHeader
          title={this.props.title}
          onCancel={() => this.props.onCancel()}
        />

        {this.body()}

        {this.props.importedFooter && (
          <ModalFooter
            actions={this.props.actions}
            onClick={(params) => {
              this.props.onClick();
            }}
          />
        )}

        <Modal.Footer
          style={{
            padding: 0,
            borderTop: 0,
            justifyContent: "center",
          }}
        >
          {this.props.customFooter && (
            <div>
              {
                // add withCancel={true} to add cancel button
                this.props.withCancel && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
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
                )
              }
              {
                // add withButton={true} and buttonMsg={''} to add custom message button
                this.props.withButton && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: 25,
                    }}
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      style={{
                        float: "center",
                        display: "inline-block",
                        fontSize: 20,
                        width: "120px",
                        height: "50px",
                        borderRadius: "15px",
                        backgroundColor: this.props.color,
                        cursor: "pointer",
                      }}
                      onClick={() => this.props.onCancel()}
                    >
                      {this.props.buttonMsg}
                    </Button>
                  </div>
                )
              }
              {
                // add withRedirect={true} to add redirects via clickable links
                this.props.withRedirect && (
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <a href="#">Return to Login</a>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <p
                        style={{
                          display: "inline-block",
                        }}
                      >
                        Need help?
                      </p>
                      <a href="#">Contact Support</a>
                    </div>
                  </div>
                )
              }
            </div>
          )}
        </Modal.Footer>
      </Modal>
    );
  }
}
