import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import BreadCrumbs from "../breadcrumbs";
import TextInput from "components/increment/generic/form/TextInput";
import Button from "components/increment/generic/form/Button";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Color } from "common";
import API from "services/api";
import Routes from "common/Routes";
import CommonApi from "services/commonApi";
import Helper from "common/Helper";
import Config from "config.js";

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: null,
      errorPassword: null,
      newPassword: null,
      errorNewPassword: null,
      confirmPassword: null,
      errorConfirmPassword: null,
      passwordShowFlag: false,
      newPasswordShowFlag: false,
      confirmPasswordShowFlag: false,
    };
  }

  componentDidMount() {
    const { user } = this.props.state;
    const { password, newPassword } = this.state;
    if (user == null) return null;
    this.setState({
      username: user.username,
      email: user.email,
    });
    API.request(
      Routes.accountRetrive,
      {
        condition: [
          {
            value: user.id,
            column: "id",
            clause: "=",
          },
        ],
      },
      (response) => {
        this.setState({
          isLoading: false,
        });
      }
    );
  }

  submit() {
    const {
      old_password,
      new_password,
      code,
      username,
      email,
      errorPassword,
      password,
      confirmPassword,
      newPassword,
      confirmNewPassword,
      errorConfirmPassword,
    } = this.state;
    const { user } = this.props.state;

    if (errorPassword == null && password != null) {
      this.setState({
        isLoading: true,
      });
      CommonApi.authenticate(
        username,
        password,
        (response) => {
          this.setState({
            isLoading: false,
          });
          if (response && response.token) {
            localStorage.setItem(Helper.APP_NAME + "token", response.token);
            API.request(Routes.authenticatedUser, {}, (user) => {
              const { login } = this.props;
            });
          }
        },
        (error) => {
          this.setState({
            errorPassword: "Wrong Password",
          });
        }
      );
    } else {
      if (password == null) {
        this.setState({
          errorPassword: "Old Password is required",
        });
      }
    }
    let parameter = {
      account_id: user.id,
      code: user.code,
      old_password: password,
      new_password: newPassword,
    };
    this.setState({
      isSubmitLoading: true,
    });
    if (newPassword == null && confirmPassword == null) {
      this.setState({
        errorNewPassword: "New Password is required",
        errorConfirmPassword: "Confirm Password is required",
      });
    } else {
      if (newPassword == confirmPassword) {
        API.request(Routes.accountChangePassword, parameter, (response) => {
          this.setState({
            isLoading: false,
          });
          if (response && response.data) {
            const { login } = this.props;
            const { token } = this.props.state;
            login(
              {
                ...user,
                account: parameter,
              },
              token
            );
            this.navigate("");
          }
        });
      } else {
        this.setState({
          errorConfirmPassword: "Both New Password do not match",
        });
      }
    }
  }

  navigate(route) {
    this.props.history.push(route);
  }

  render() {
    const {
      password,
      errorPassword,
      confirmPassword,
      errorConfirmPassword,
      errorNewPassword,
      newPassword,
      passwordShowFlag,
      confirmPasswordShowFlag,
      newPasswordShowFlag,
    } = this.state;
    return (
      <div style={{ width: "100%" }}>
        <BreadCrumbs
          title={"Password"}
          page={"account"}
          backIcon={true}
          description=""
          style={{
            borderBottomWidth: 0,
          }}
        />

        <div
          style={{
            width: "50%",
            float: "left",
          }}
          className="full-width-mobile"
        >
          <TextInput
            placeholder={"Old Password"}
            type={this.state.passwordShowFlag ? "text" : "password"}
            value={password}
            style={{
              backgroundColor: "transparent",
              marginTop: 20,
              marginBottom: 20,
            }}
            onChange={(password, errorPassword) => {
              this.setState({
                password,
                errorPassword,
              });
            }}
            iconStyle={Color.gray}
            onClickRightIcon={() => {
              this.setState({
                passwordShowFlag: !this.state.passwordShowFlag,
              });
            }}
            iconRight={passwordShowFlag === false ? faEye : faEyeSlash}
            validation={{
              type: "text",
              size: 8,
              column: "Password",
              error: errorPassword,
            }}
          />
          <TextInput
            placeholder={"New Password"}
            type={this.state.newPasswordShowFlag ? "text" : "password"}
            value={newPassword}
            style={{
              marginTop: 20,
              backgroundColor: "transparent",
              // marginBottom: 20
            }}
            onChange={(newPassword, errorNewPassword) => {
              this.setState({
                newPassword,
                errorNewPassword,
              });
            }}
            onClickRightIcon={() => {
              this.setState({
                newPasswordShowFlag: !this.state.newPasswordShowFlag,
              });
            }}
            iconStyle={Color.gray}
            iconRight={newPasswordShowFlag === false ? faEye : faEyeSlash}
            validation={{
              type: "text",
              size: 8,
              column: "New Password",
              error: errorNewPassword,
            }}
          />
          <p style={{ color: Color.gray }}>*At least one symbol(?.,!_-~$%+=)</p>
          <TextInput
            placeholder={"Confirm Password"}
            type={this.state.confirmPasswordShowFlag ? "text" : "password"}
            value={confirmPassword}
            style={{
              // marginTop: 20,
              backgroundColor: "transparent",
              // marginBottom: 20
            }}
            onChange={(confirmPassword, errorConfirmPassword) => {
              this.setState({
                confirmPassword,
                errorConfirmPassword,
              });
            }}
            iconStyle={Color.gray}
            onClickRightIcon={() => {
              this.setState({
                confirmPasswordShowFlag: !this.state.confirmPasswordShowFlag,
              });
            }}
            iconRight={confirmPasswordShowFlag === false ? faEye : faEyeSlash}
            validation={{
              type: "text",
              size: 8,
              column: "Confirm Password",
              error: errorConfirmPassword,
            }}
          />
        </div>

        <div
          style={{
            width: "100%",
            float: "left",
            marginTop: 80,
          }}
        >
          <Button
            title={"Save"}
            onClick={() => {
              this.submit();
            }}
            style={{
              float: "right",
              backgroundColor: Color.primary,
              color: Color.white,
              marginTop: 10,
              marginRight: "50%",
            }}
            className="full-width-mobile"
          />
        </div>
      </div>
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
