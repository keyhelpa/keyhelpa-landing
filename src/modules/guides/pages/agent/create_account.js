import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import Colors from "common/Colors";
import VideoCard from "modules/guides/videoCard";
import "./agent.css";
import Data from "modules/guides/data";
import Config from "common/Config";
const { REACT_APP_AGENT } = process.env;
class CreateAccountAgent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: Data.agent,
      url: null,
    };
  }
  componentDidMount() {
    this.handleLoad();
  }
  handleLoad() {
    const { data } = this.state;
    const { url } = this.state;
    return (
      <div>
        {data.map((item) => {
          if (this.props.history.location.pathname === item.route) {
            this.setState({
              url: item.url,
            });
          }
        })}
      </div>
    );
  }
  renderContent() {
    return (
      <div
        style={{
          marginTop: 30,
        }}
      >
        <p>Follow the steps below to register as Agent in KeyHelpa:</p>
        <ol type="1">
          <li>
            Go to the Agent Sign Up Page (Click{" "}
            <a href={`${REACT_APP_AGENT}/signup`}>here</a>).
          </li>
          <li>Start registering your credentials such as:</li>
          <ol type="a">
            <li>First Name</li>
            <li>Last Name</li>
            <li>Trading Name</li>
            <li>Postcode</li>
            <li>Username - Username requires at least 8 characters.</li>
            <li>Email Address - A valid and existing address.</li>
            <li>Password - Password requires at least 8 characters.</li>
            <li>
              Confirm Password - Should match the previous password field.
            </li>
          </ol>
          <p>***All fields are mandatory.</p>
          <li>
            Once providing all details, click the “Create Account” button.
            That’s it! You have successfully created your account and you will
            be redirected to your dashboard for{" "}
            <a href="setup_profile">profile setup</a>.
          </li>
          <li>
            You may also sign up by linking your social media account such as
            Facebook, Google and Linkedin.
          </li>
        </ol>
        <p>
          If you have any concerns or inquiries, please don’t hesitate to{" "}
          <a href="../contact_us">contact us</a>.{" "}
        </p>
      </div>
    );
  }

  render() {
    const { theme } = this.props;
    const { url } = this.state;
    return (
      <div
        style={{
          width: "100%",
          float: "left",
        }}
      >
        <p
          style={{
            color:
              theme === "agent" ? Colors.agentTextTitle : Colors.helpaTextTitle,
            marginBottom: "5%",
          }}
        >
          Are you looking for Freelancers to work on your real estate business?
          Get started with KeyHelpa and hire Helpa when you need help by
          creating an account.
        </p>
        {url && <VideoCard url={url} />}
        {this.renderContent()}
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
)(withRouter(CreateAccountAgent));
