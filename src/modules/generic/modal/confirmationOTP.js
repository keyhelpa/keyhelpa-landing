import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Colors from "common/Colors";
import { Modal } from "react-bootstrap";
import ModalHeader from "./header";
import ModalFooter from "./footer";
import Style from "./style";
import SmsCodeInput from "modules/generic/form/SmsCode";
import API from "services/api";
import Routes from "common/Routes";

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      textCode: null,
      errorCode: null,
      errorMessage: null,
    };
  }

  navigate(route) {
    this.props.history.push(route);
  }
  submit() {
    const { data, textCode } = this.state;
    const { user } = this.props.state;
    let parameter = {
      account_id: user.id,
      otp: textCode,
      phoneNumber: this.props.number,
      method: "sms",
    };
    this.setState({
      isSubmitLoading: true,
    });
    API.request(
      Routes.securitySettingsConfirm,
      parameter,
      (response) => {
        this.setState({
          isSubmitLoading: false,
        });
        if (response.error !== null) {
          this.setState({ errorMessage: response.error });
        } else {
          this.setState({ errorMessage: null });
          this.navigate("");
        }
      },
      (error) => {
        this.setState({
          errorMessage: "Invalid",
          isSubmitLoading: false,
        });
      }
    );
  }

  body() {
    const { textCode, errorCode, errorMessage } = this.state;
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
          <p style={{ color: Colors.danger }}>{errorMessage}</p>
          <div
            style={{
              width: "100%",
              float: "left",
              textAlign: "center",
            }}
            className="full-width-mobile"
          >
            <SmsCodeInput
              value={textCode}
              isLoading={this.state.isSubmitLoading}
              handleSubmit={async (textCode) => {
                await this.setState({
                  textCode,
                });
                this.submit();
              }}
            />
          </div>
        </div>
      </Modal.Body>
    );
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={() => this.props.onCancels()}
        style={Style.modal}
      >
        <ModalHeader
          title={"Enter SMS code"}
          subTitle={"Text message verification"}
          subTitle1={`We've sent a text message to`}
          onCancel={() => this.props.onCancels()}
        />

        <h2 style={{ alignSelf: "center" }}>{this.props.number}</h2>

        {this.body()}

        <ModalFooter
          actions={null}
          bottomComponent={() => {
            return (
              <p>
                Didn't receive your code?
                <b
                  style={{
                    paddingLeft: 5,
                  }}
                  onClick={() => {
                    this.navigate("");
                  }}
                  className="href-link"
                >
                  Resend.
                </b>
              </p>
            );
          }}
        />
      </Modal>
    );
  }
}
const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => {
  const { actions } = require("reduxhandler");
  return {
    login: (user, token) => {
      dispatch(actions.login(user, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stack));
