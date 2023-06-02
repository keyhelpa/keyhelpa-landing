import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Colors from "common/Colors";
import VideoCard from "modules/guides/videoCard";
import "./agent.css";
import Data from "modules/guides/data";
import Config from "common/Config";
class AcceptProposal extends Component {
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
        <p>There are two types of Helpa that will send you job proposals:</p>
        <ul>
          <li>
            Invited Helpa - this are helpa you send a job invitation and have
            accept your invitation by sending you a proposal.
          </li>
          <li>
            Uninvited Helpa - this are helpa that send a job proposal even if
            you did not invite them.
          </li>
        </ul>
        <p>
          To check the proposals Helpa has sent you to your job postings, read
          the following instructions below:
        </p>
        <ol type="1">
          <li>
            Go to your Proposals page, where you will find all your candidates
            who sent you proposals and also candidates that you interviewed.
          </li>
          <li>
            On your proposals' page, you can check the proposals sent to you by
            Invited Helpa under your “Accepted Invites” section and click the
            “View Proposal” on the action column to view their proposals.{" "}
          </li>
          <p>
            On the other hand, you may view the proposals sent to you by
            Uninvited Helpa under your “Pending Proposals' ' sections and click
            the “View” on the action column to view their proposals.{" "}
          </p>
          <li>
            To accept the proposal a Helpa has sent you, either invited or not,
            you just need to invite them into an interview by clicking the
            “Interview” button on the View Proposal page. Click here to know how
            to interview Helpa.
          </li>
          <p>
            However, if you do not like the proposal of the Helpa, you may
            simply click the “Reject Proposal” button on the View Proposal page
            to let the Helpa know that you did not approve the proposal.
          </p>
          <p>
            By clicking the “Interview” button on the proposal page, it means
            that you accept the Helpa’s job proposal.
          </p>
          <li>
            When accepting or rejecting the proposal, the Helpa will receive an
            email notification about his job proposal.
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
          How is your job post going on? Have you received a lot of proposals
          from Helpas? Check your My Proposals page now to check proposals from
          Helpa you invited and those you did not send a job invitation who were
          interested to apply for your job hiring that they send you a proposal.
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
)(withRouter(AcceptProposal));
