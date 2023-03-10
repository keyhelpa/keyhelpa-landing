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
    };
  }

  navigate = (route) => {
    this.props.history.push(route);
  };

  submit() {
    this.setState({
      sendFlag: true,
    });
    // const { username, errorUsername } = this.state;
    // if(errorUsername != null || username == null) return false
    // this.setState({
    //   isLoading: true
    // })
    // API.request(Routes.accountRequestChangePassword, {username}, response => {
    //   this.setState({
    //     isLoading: false
    //   })
    //   // this.navigate('signin')
    // }, error => {
    //   this.setState({
    //     isLoading: false
    //   })
    // })
  }

  render() {
    const { username, errorUsername, isLoading, sendFlag } = this.state;
    return (
      <div style={Style.mainContainer}>
        <div style={Style.leftContainer} className="two-third-container">
          <LeftContainer />
        </div>
        <div
          style={Style.rightContainer}
          className="full-width-mobile-with-margin"
        >
          <HeaderLabel title={"Forgot Password?"} />
          {sendFlag == false && (
            <span>
              <p
                style={{
                  textAlign: "center",
                }}
              >
                Please enter your email address and we will send an email
                instructions for resetting your password.
              </p>
              <TextInput
                placeholder={"Username or Email Address"}
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
                  column: "Username or Email Address",
                  error: errorUsername,
                }}
              />

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
                  title={"Submit"}
                  onClick={() => this.submit()}
                  style={{
                    backgroundColor: Colors.primary,
                    color: Colors.white,
                  }}
                  className="full-width-mobile"
                  isLoading={this.state.isLoading}
                />
              </div>
            </span>
          )}

          {sendFlag && (
            <span>
              <p
                style={{
                  textAlign: "center",
                }}
              >
                If the email address exists email@gmail.com exists in our
                system, we sent an email with a link to reset the password.
              </p>
              <p
                style={{
                  textAlign: "center",
                }}
              >
                If you don't see our email, check your spam folder, or contact
                support for more help.
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
            <b style={{}}>Need help?</b>
            <b
              style={{
                color: Colors.primary,
                paddingLeft: 5,
              }}
              onClick={() => {
                this.navigate("signup");
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
