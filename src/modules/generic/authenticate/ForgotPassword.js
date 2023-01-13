import React from "react";
import { connect } from "react-redux";
import TextInput from "components/increment/generic/form/TextInput";
import Style from "./style";
import HeaderLabel from "./headerLabel";
import Button from "components/increment/generic/form/Button";
import Colors from "common/Colors";
import LeftContainer from "./leftContainer";
import { withRouter } from "react-router-dom";
import API from "services/api";
import Routes from "common/Routes";
class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      errorUsername: null,
      sendFlag: false,
      isLoading: false,
      errorMessage: null,
    };
  }

  navigate = (route) => {
    this.props.history.push(route);
  };

  submit() {
    const { username, errorUsername } = this.state;
    this.setState({
      errorMessage: null,
    });
    var mailformat = /^([^\s\@])+\@(([^\s\@\.])+\.)+([^\s\.]{2,})+$/;
    if (errorUsername != null || username == null || username == "") {
      this.setState({
        errorMessage: "Email address is required.",
      });
      return false;
    }
    if (mailformat.test(username) == false) {
      this.setState({ errorMessage: "Invalid email format." });
      return false;
    } else {
      this.setState({ errorMessage: null });
    }
    this.setState({ sendFlag: true });
    this.setState({
      isLoading: true,
    });
    API.request(
      Routes.accountRequestChangePass,
      { username },
      (response) => {
        this.setState({ isLoading: false });
      },
      (error) => {
        this.setState({
          isLoading: false,
        });
      }
    );
  }

  render() {
    const { username, errorUsername, isLoading, sendFlag, errorMessage } =
      this.state;
    return (
      <div style={Style.mainContainer}>
        <div style={Style.leftContainer} className="two-third-container">
          <LeftContainer />
        </div>
        <div
          style={Style.rightContainer}
          className="full-width-mobile-with-margin"
        >
          <HeaderLabel title={"Forgot Password?"} pad={true} />
          {sendFlag == false && (
            <div>
              <p
                style={{
                  textAlign: "center",
                }}
                className="full-width-mobile-without-padding padding-lr-75"
              >
                Please enter your email address and we will send you an email
                with instructions for resetting your password.
              </p>
              {errorMessage && (
                <p
                  style={{
                    fontWeight: "bold",
                    color: Colors.danger,
                    textAlign: "center",
                    marginTop: 25,
                  }}
                >
                  {errorMessage}
                </p>
              )}
              <TextInput
                placeholder={"Email"}
                type={"text"}
                value={this.state.username}
                style={{
                  marginTop: 20,
                }}
                onChange={(username, errorUsername) => {
                  this.setState({
                    username,
                    errorUsername,
                  });
                }}
                validation={{
                  type: "text",
                  size: 8,
                  column: "email",
                  error: errorUsername,
                }}
              />

              <div
                style={{
                  float: "left",
                  width: "100%",
                  paddingTop: 40,
                  paddingBottom: 20,
                  textAlign: "center",
                }}
              >
                <Button
                  title={"Submit"}
                  onClick={() => this.submit()}
                  style={{
                    backgroundColor: Colors.primary,
                    color: Colors.white,
                    paddingRight: "10%",
                    paddingLeft: "10%",
                  }}
                  className="full-width-mobile"
                  isLoading={this.state.isLoading}
                />
              </div>
            </div>
          )}

          {sendFlag && (
            <span>
              <p
                style={{
                  textAlign: "center",
                }}
              >
                If the email address{" "}
                <b>
                  <i>{username}</i>
                </b>{" "}
                exists in our system, we sent an email with a link to reset the
                password.
              </p>
              <p
                style={{
                  textAlign: "center",
                }}
              >
                If you don't see our email, check your spam folder, or{" "}
                <b>contact support</b> for more help.
              </p>

              <div
                style={{
                  float: "left",
                  width: "100%",
                  paddingTop: 20,
                  paddingBottom: 20,
                  textAlign: "center",
                }}
              >
                <Button
                  title={"Resend email"}
                  onClick={() => this.submit()}
                  style={{
                    backgroundColor: Colors.primary,
                    color: Colors.white,
                    paddingRight: "10%",
                    paddingLeft: "10%",
                  }}
                  className="full-width-mobile"
                  isLoading={this.state.isLoading}
                />
              </div>
            </span>
          )}

          <div
            style={{
              width: "100%",
              textAlign: "center",
            }}
          >
            <b
              style={{
                color: Colors.lightestText,
              }}
              onClick={() => {
                this.navigate("signin");
              }}
              className="href-link"
            >
              Return to Log In
            </b>
          </div>

          <div
            style={{
              textAlign: "center",
              width: "100%",
              marginBottom: 25,
              marginTop: 10,
            }}
          >
            <span style={{ color: Colors.lightestText }}>Need help?</span>
            <b
              style={{
                color: Colors.primary,
                paddingLeft: 5,
              }}
              onClick={() => {
                this.navigate("/contact_us");
              }}
              className="href-link"
            >
              Contact Support
            </b>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => {
  const { actions } = require("reduxhandler");
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stack));
