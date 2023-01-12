import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Colors from "common/Colors";
import VideoCard from "modules/guides/videoCard";
import "./agent.css";
import Data from "modules/guides/data";
import Config from "common/Config";
class ManageNotifAgent extends Component {
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
        <p>
          On Agent’s web application, click your profile icon or photo then a
          dropdown menu will appear. Choose “Settings” and you will be taken to
          a new sidebar menu. Click the “Notifications” on your sidebar menu and
          you will be redirected to the “Notifications” page.
        </p>
        <p>
          Agents can set where to receive notifications either via Email, Push,
          or SMS. The notifications that an Agent can received are categorized
          into two categories:
        </p>
        <ol type="1">
          <li>
            <b className="b-agent">Messages</b> - these are notifications that
            can be received by Agents that are outside contracts or non-contract
            related such as::
          </li>
          <ul>
            <li>A job invitation is received</li>
            <li>An invitation has been received</li>
            <li>An interview is accepted or modified</li>
            <li>An interview or offer is declined or withdrawn</li>
            <li>An offer is accepted</li>
            <li>An offer is rejected</li>
            <li>A job posting will expire soon</li>
            <li>A job posting expired</li>
          </ul>
          <li>
            <b className="b-agent">Contracts</b> - these are notifications that
            can be received by Agents are contract-related such as:
          </li>
          <ul>
            <li>Freelancer accepted terms</li>
            <li>Freelancer requested changes</li>
            <li>Other contract-related messages</li>
            <li>Communications from KeyHelpa</li>
          </ul>
        </ol>
        <p>
          If you have any concerns or inquiries, please don’t hesitate to{" "}
          <a href="../contact_us">contact us</a>.{" "}
        </p>
      </div>
    );
  }

  render() {
    const { url } = this.state;
    const { theme } = this.props;
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
              theme == "agent" ? Colors.agentTextTitle : Colors.helpaTextTitle,
            marginBottom: "5%",
          }}
        >
          A notification email relays an important message to both Helpa and
          Agent. It is important for them to get notified what has been going on
          with their jobs, contracts, and any activities they do in KeyHelpa.{" "}
        </p>

        <VideoCard url={url} />
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
)(withRouter(ManageNotifAgent));
