import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Strings from "modules/generic/helper/String";
import "./Style.css";
import Routes from "common/Routes";
import API from "services/api";
import Button from "modules/generic/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Colors from "common/Colors";
import "./mobile.css";
import Modal from "modules/generic/modal/textButton";
import TextInput from "components/increment/generic/form/TextInput";
import TextArea from "components/increment/generic/form/TextArea";
import loaderAgent from "../../assets/img/Dual Ring-1.4s-16px agent.svg";
import lighterGray from "../../assets/lighterGray.png";
import lighterPynk from "../../assets/lighterPink.png";

const style = {
  iconAgent: {
    width: 40,
    height: 40,
    float: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginRight: 20,
    backgroundColor: "#34475D",
    color: "white",
  },
  iconHelpa: {
    width: 40,
    height: 40,
    // float: 'center',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginRight: 20,
    backgroundColor: "#E62D7E",
    color: "white",
  },
};
export class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,

      theme: "agent",
      name: null,
      errorName: null,
      email: null,
      errorEmail: null,
      phone: null,
      errorPhone: null,
      organization: null,
      errorOrganization: null,
      message: "",
      errorMessage: null,
      submitted: false,
      error: null,
      show: false,
      responseMessage: null,
      submitErrorMessage: null,
      loader: null,
    };
  }

  componentDidMount() {
    this.setState({
      theme: "agent",
      loader: loaderAgent,
    });
  }

  handleSubmit() {
    const {
      name,
      email,
      phone,
      organization,
      message,
      errorName,
      errorEmail,
      errorPhone,
      errorOrganization,
      errorMessage,
    } = this.state;

    if (!name || !email || !phone || !organization || !message) {
      this.setState({
        submitErrorMessage: "All fields are required",
        responseMessage: null,
      });
      return;
    }

    if (
      errorName ||
      errorEmail ||
      errorPhone ||
      errorOrganization ||
      errorMessage
    ) {
      this.setState({
        submitErrorMessage: "Fields contain errors",
        responseMessage: null,
      });
      return;
    }

    this.setState({
      responseMessage: null,
      submitErrorMessage: null,
      isLoading: true,
    });

    let params = {
      name: name,
      email: email,
      phone: phone,
      organization: organization,
      message: message,
    };

    API.request(
      Routes.contactForm,
      params,
      (response) => {
        this.setState({
          isLoading: false,
          submitted: true,
          responseMessage: response.message,
          name: null,
          email: null,
          phone: null,
          organization: null,
          message: "",
          errorName: null,
          errorEmail: null,
          errorPhone: null,
          errorOrganization: null,
          errorMessage: null,
          show: true,
        });
      },
      (error) => {
        const arrResponse = Object.values(error?.data).flat();
        debugger;
        this.setState({
          isLoading: false,
          responseMessage: arrResponse,
        });
      }
    );
  }

  renderLeft() {
    const { accountType } = this.props.state;
    console.log({
      accountType,
    });
    return (
      <div
        style={{
          width: "80%",
          float: "left",
          marginLeft: "40%",
        }}
        className="full-width-mobile mt-mobile-50 contact-left-side-content"
      >
        <h1
          style={{
            color: Colors.agentTextTitle,
          }}
        >
          Contact us
        </h1>
        <p
          style={{
            color: Colors.agentText,
          }}
        >
          We love questions and feedback - and we're always happy to help! Here
          are some ways to contact us.
        </p>
        <br />
        <br />
        <div>
          <p
            style={{
              color: Colors.agentDarkGray,
              fontWeight: "bold",
            }}
          >
            support@keyhelpa.com
          </p>
          <div
            style={{
              width: "100%",
              float: "left",
            }}
          >
            {Strings.socialMedias.map((item, index) => (
              <div
                key={index}
                style={{
                  float: "left",
                }}
              >
                <span
                  style={style.iconAgent}
                  className="cursor-hover"
                  onClick={() => {
                    window.location.href = item.route;
                  }}
                >
                  <FontAwesomeIcon icon={item.icon} size="1x" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  renderAlert() {
    const { show } = this.state;
    return (
      <div>
        <Modal
          customFooter={true}
          centered={true}
          show={show}
          title={"Thank  you!"}
          description={
            "Your message has been sent. Our support team will respond within 24 hours"
          }
          withButton={true}
          buttonMsg={"Ok"}
          color={Colors.agentDarkGray}
          onCancel={() =>
            this.setState({
              show: false,
            })
          }
        />
      </div>
    );
  }

  renderRight() {
    const {
      name,
      email,
      phone,
      organization,
      message,
      errorName,
      errorEmail,
      errorPhone,
      errorOrganization,
      errorMessage,
      responseMessage,
      loader,
      submitErrorMessage,
    } = this.state;
    return (
      <div
        style={{
          width: "75%",
          float: "right",
          background: Colors.agentDarkGray,
          borderRadius: "25px 0 0 25px/ 25px 0 0 25px",
          padding: 30,
          color: Colors.white,
          margin: "10% 0 10% 30%",
          minHeight: "45vh",
        }}
        className="full-width-mobile text-field-container"
      >
        {submitErrorMessage &&
          submitErrorMessage !== "Invalid Mobile phone" && (
            <p
              style={{
                color: Colors.white,
              }}
            >
              {submitErrorMessage}
            </p>
          )}

        {responseMessage && (
          <p style={{ color: Colors.white }}>{responseMessage}</p>
        )}

        <div
          style={{
            width: "100%",
            float: "left",
          }}
        >
          <div
            style={{
              width: "100%",
              float: "left",
              color: Colors.white,
              marginBottom: 25,
            }}
          >
            <TextInput
              placeholder={"Type full name here"}
              type={"text"}
              label={"Full name"}
              value={name}
              onChange={(name, errorName) => {
                this.setState({
                  name,
                  errorName,
                  responseMessage: null,
                });
              }}
              style={{
                borderBottom: "solid 3px " + Colors.white,
              }}
              inputStyle={{
                color: Colors.white,
              }}
              errorStyle={{
                color: Colors.white,
              }}
              validation={{
                size: 2,
                type: "text",
                column: "Name",
                error: errorName,
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              marginBottom: 25,
              color: Colors.white,
            }}
          >
            <div
              style={{
                float: "left",
              }}
              className="full-width-mobile email"
            >
              <TextInput
                placeholder={"Type email here"}
                type={"text"}
                value={email}
                label={"Email"}
                onChange={(email, errorEmail) => {
                  this.setState({
                    email,
                    errorEmail,
                    responseMessage: null,
                  });
                }}
                style={{
                  borderBottom: "solid 3px " + Colors.white,
                }}
                inputStyle={{
                  color: Colors.white,
                }}
                errorStyle={{
                  color: Colors.white,
                }}
                validation={{
                  size: 8,
                  type: "email",
                  column: "Email",
                  error: errorEmail,
                }}
              />
            </div>

            <div
              style={{
                float: "left",
                marginLeft: 35,
                paddingLeft: 20,
              }}
              className="full-width-mobile contactNumber"
            >
              <TextInput
                placeholder={"Mobile phone"}
                type={"tel"}
                label={"Mobile phone"}
                value={phone}
                numbersOnly={true}
                onChange={(phone, errorPhone) => {
                  if (!isNaN(phone) && phone.length <= 10) {
                    this.setState({
                      phone,
                      errorPhone,
                      responseMessage: null,
                    });
                  }
                }}
                validation={[
                  {
                    type: "australian_phone",
                    column: "Mobile phone",
                    error: errorPhone,
                  },
                  {
                    type: "text",
                    size: 9,
                    column: "Mobile phone",
                    error: errorPhone,
                  },
                  {
                    type: "required",
                    column: "Mobile phone",
                    error: errorPhone,
                  },
                ]}
                style={{
                  borderBottom: "solid 3px " + Colors.white,
                }}
                inputStyle={{
                  color: Colors.white,
                }}
                errorStyle={{
                  color: Colors.white,
                }}
              />
            </div>
          </div>

          <div
            style={{
              width: "100%",
              float: "left",
              color: Colors.white,
              marginBottom: 25,
            }}
          >
            <TextInput
              placeholder={"Organization name"}
              type={"text"}
              label={"Organization"}
              value={organization}
              onChange={(organization, errorOrganization) => {
                this.setState({
                  organization,
                  errorOrganization,
                  responseMessage: null,
                });
              }}
              style={{
                borderBottom: "solid 3px " + Colors.white,
              }}
              inputStyle={{
                color: Colors.white,
              }}
              errorStyle={{
                color: Colors.white,
              }}
              validation={[
                {
                  size: 2,
                  type: "text",
                  column: "Organization",
                  error: errorOrganization,
                },
                {
                  type: "required",
                  column: "Organization",
                  error: errorOrganization,
                },
              ]}
            />
          </div>
          <div
            style={{
              width: "100%",
              float: "left",
              color: Colors.white,
              marginBottom: 25,
            }}
          >
            <TextArea
              placeholder={"Type your message here"}
              type={"text"}
              label={"Message"}
              style={{
                background: "transparent",
                paddingLeft: 0,
                paddingRight: 0,
                borderBottom: "solid 2px " + Colors.white,
              }}
              inputStyle={{
                color: Colors.white,
                fontSize: 14,
                paddingTop: 10,
              }}
              errorStyle={{
                color: Colors.white,
              }}
              value={message}
              rows={5}
              onChange={(message, errorMessage) => {
                if (message.length <= 5000) {
                  this.setState({
                    message,
                    errorMessage,
                    responseMessage: null,
                  });
                }
              }}
              validation={{
                type: "text",
                size: 20,
                column: "Message",
                error: errorMessage,
              }}
            />
          </div>
        </div>
        <div>
          {/* <p>Captcha</p> */}
          <Button
            title={"Submit"}
            loader={loader}
            isLoading={this.state.isLoading}
            style={{
              backgroundColor: Colors.white,
              color: Colors.agentDarkGray,
              fontSize: "24px",
              width: "10%",
              float: "right",
            }}
            onChange={() => {
              this.handleSubmit();
            }}
          ></Button>
        </div>
      </div>
    );
  }

  renderContent() {
    return (
      <div
        style={{
          width: "100%",
          float: "left",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
        className="full-width-mobile unset-flex-mobile"
      >
        <div
          style={{
            width: "30%",
            float: "left",
          }}
          className="full-width-mobile"
        >
          {this.renderLeft()}
        </div>
        <div
          style={{
            width: "70%",
            float: "left",
          }}
          className="full-width-mobile"
        >
          {this.renderRight()}
        </div>
      </div>
    );
  }
  render() {
    const { accountType } = this.props.state;
    return (
      <div
        style={{
          width: "100%",
          float: "left",
          minHeight: "100vh",
          backgroundImage:
            accountType === "agent"
              ? `url(${lighterGray})`
              : `url(${lighterPynk})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {this.renderContent()}
        {this.state.submitted && this.renderAlert()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Contacts));
