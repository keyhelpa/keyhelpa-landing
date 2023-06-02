import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import BreadCrumbs from "../breadcrumbs";
import Style from "./Style";
import Footer from "modules/generic/frames/footer.js";
import Helper from "common/Helper";
import Routes from "common/Routes";
import API from "services/api";
import Button from "components/increment/generic/form/Button";
import HeaderLabel from "modules/generic/authenticate/headerLabel";
import Colors from "common/Colors";
import SmsCodeInput from "modules/generic/form/SmsCode";
import LeftContainer from "modules/generic/authenticate/leftContainer";
import { NULL } from "sass";

class StepVerifcation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isSubmitLoading: false,
      textCode: null,
      platform: "sms",
      data: null,
      errorMessage: null,
    };
  }

  componentDidMount() {
    this.retrieve();
  }

  navigate = (route) => {
    this.props.history.push(route);
    setTimeout(() => {
      window.location.reload();
    }, 50);
  };

  retrieve() {
    const { user } = this.props.state;
    console.log(">>>>>>>>>>", user);
    if (!user) return;
    let parameter = {
      account_id: user?.id,
    };
    this.setState({ isLoading: true });
    API.request(
      Routes.securitySettingsRetrieve,
      parameter,
      (response) => {
        this.setState({
          isLoading: false,
        });
        if (response.data.length > 0) {
          let temp = response.data[0];
          if (temp.sms == 1) {
            this.setState({ platform: "sms" });
            this.sendOtp();
          } else if (temp.google_auth == 1) {
            this.setState({ platform: "google_auth" });
          }
          this.setState({ data: response.data });
        } else {
          this.setState({
            data: [],
          });
        }
      },
      (error) => {
        this.setState({
          isLoading: false,
        });
      }
    );
  }

  sendOtp() {
    const { user } = this.props.state;
    let params = {
      platform: this.state.platform,
      phoneNumber: user?.information?.cellular_number,
      account_id: user?.id,
    };
    this.setState({ isLoading: true });
    API.request(Routes.securitySettingsSetup, params, (response) => {
      this.setState({
        isLoading: false,
      });
    });
  }

  submit() {
    const { data, textCode, platform } = this.state;
    const { user } = this.props.state;
    let parameter = {
      account_id: user.id,
      otp: textCode,
      phoneNumber: user?.information?.cellular_number,
      cache: true,
      method: platform,
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
          if (
            user?.status == "ACCOUNT_VERIFIED" ||
            user?.status == "PROFILE_SETUP"
          ) {
            this.navigate(Helper.NEXT_ROUTE);
          } else {
            this.navigate(user?.status);
          }
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

  renderSMS() {
    const { user } = this.props.state;
    const { isLoading, textCode, isSubmitLoading, platform } = this.state;
    return (
      <div>
        <SmsCodeInput
          value={textCode}
          isLoading={isSubmitLoading}
          buttonStyle={{ marginTop: "40px !important" }}
          handleSubmit={async (textCode) => {
            await this.setState({
              textCode,
            });
            this.submit();
          }}
        />
        <div
          style={{
            textAlign: "center",
            width: "100%",
            marginBottom: 25,
          }}
        >
          <span
            style={{
              color: Colors.iconText,
            }}
          >
            Didn't get verification code?{" "}
          </span>
          <span
            style={{
              color: Colors.primary,
              paddingLeft: 5,
              fontWeight: "bold",
            }}
            onClick={() => {
              this.sendOtp();
            }}
            className="href-link"
          >
            Resend
          </span>
        </div>
        <div
          style={{
            textAlign: "center",
            width: "100%",
            marginBottom: 25,
          }}
        >
          <span
            style={{
              color: Colors.iconText,
            }}
          >
            Try other way?{" "}
          </span>
          <span
            style={{
              color: Colors.primary,
              paddingLeft: 5,
              fontWeight: "bold",
            }}
            onClick={() => {
              this.setState({ platform: "google_auth" });
            }}
            className="href-link"
          >
            Google Authenticator
          </span>
        </div>
      </div>
    );
  }

  renderGoogleAuth() {
    const { user } = this.props.state;
    const { isLoading, textCode, isSubmitLoading, platform, data } = this.state;
    return (
      <div style={{ padding: "2%" }}>
        <SmsCodeInput
          value={textCode}
          isLoading={isSubmitLoading}
          buttonStyle={{ marginTop: "40px !important", marginBottom: "10%" }}
          handleSubmit={async (textCode) => {
            await this.setState({
              textCode,
            });
            this.submit();
          }}
        />
        {data && data[0].sms == 1 && (
          <div
            style={{
              textAlign: "center",
              width: "100%",
              marginBottom: 25,
            }}
          >
            <span
              style={{
                color: Colors.iconText,
              }}
            >
              Try other way?{" "}
            </span>
            <span
              style={{
                color: Colors.primary,
                paddingLeft: 5,
                fontWeight: "bold",
              }}
              onClick={() => {
                this.setState({ platform: "sms" });
              }}
              className="href-link"
            >
              SMS OTP
            </span>
          </div>
        )}
      </div>
    );
  }

  render() {
    const { user } = this.props.state;
    const { isLoading, textCode, isSubmitLoading, platform, data } = this.state;
    return (
      <div style={Style.pageWithBackground}>
        <div style={Style.leftPage} className="two-third-container">
          <LeftContainer />
        </div>
        <div style={Style.cardStyle} className="full-width-mobile-with-margin">
          <HeaderLabel
            title={"2-Step Verification"}
            description={
              "Please enter valid value for the field below to continue"
            }
            _color={true}
          />
          <p>
            Hello <b>{user?.username}</b>
          </p>
          {platform == "sms" && (
            <p>
              We send an otp to your mobile phone: ******
              {user?.information?.cellular_number.slice(-4)}
            </p>
          )}
          {platform == "google_auth" && (
            <p>
              Please input the code that google generate in your google
              authenticator app
            </p>
          )}
          <div
            style={{
              width: "100%",
              float: "left",
              textAlign: "center",
              marginTop: 40,
            }}
            className="full-width-mobile"
          >
            {platform == "sms" && data && data[0].sms == 1 && this.renderSMS()}
            {platform == "google_auth" &&
              data &&
              data[0].google_auth == 1 &&
              this.renderGoogleAuth()}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(StepVerifcation));
