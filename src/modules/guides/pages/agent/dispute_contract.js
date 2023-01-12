import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Colors from "common/Colors";
import VideoCard from "modules/guides/videoCard";
import "./agent.css";
import Data from "modules/guides/data";
import Config from "common/Config";
class DisputeContractAgent extends Component {
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
          You can view all your contracts on your “My Contracts” page. Here are
          the following guidelines for Agent to dispute a contract:
        </p>
        <ol type="1">
          <li>
            On your “My Contracts”, you can opt to dispute contracts whose
            status are:
          </li>
          <ul>
            <li>
              <b className="b-agent">Active</b> - these are contracts that are
              currently ongoing, which can be disputed when you click the “View”
              on the action column of the candidate’s contract and you will be
              redirected to the “Contract Details” page where you can see three
              buttons at the upper right corner of the page. Click the “Dispute”
              button, then an “Open dispute” confirmation modal will pop up.
            </li>
            <li>
              <b className="b-agent">Pause</b> - these are contracts that are
              temporarily on-hold, which can be disputed when you click the
              “View” on the action column of the candidate’s contract and you
              will be redirected to the “Contract Details” page where you can
              see three buttons at the upper right corner of the page. Click the
              “Dispute” button, then an “Open dispute” confirmation modal will
              pop up.
            </li>
            <p>
              You may not or may “Resume” the contract before you are going to
              open a dispute.
            </p>
            <li>
              <b className="b-agent">End</b> - these are contracts that are
              terminated. You can only open a dispute in this contract if the
              Helpa is not yet confirmed to accept the termination of this
              contract.{" "}
            </li>
            <p>
              This unconfirmed end contract status can be disputed when you
              click the “View” on the action column of the candidate’s contract
              and you will be redirected to the “Contract Details” page where
              you can see three buttons at the upper right corner of the page.
              Click the “Dispute” button, then an “Open dispute” confirmation
              modal will pop up.
            </p>
            <p>
              You may not or may “Cancel” termination of contract before you are
              going to open a dispute.
            </p>
          </ul>
          <li>
            When the “Open dispute” confirmation modal will pop up, you will
            then ask if you are sure to open a dispute with the contract and you
            will be prompted to provide the reason for disputing the job and
            give feedback. If you have understood the notice of this
            confirmation modal and authorize KeyHelpa, click the “Open dispute”
            button and the contract will be disputed.{" "}
          </li>
          <p>
            Once you open a dispute to the contract,, the Helpa will receive an
            email notification and a notification card on his/her My Contracts'
            page.
          </p>
          <li>
            All dispute contracts can be seen on your “My Contracts” page
            Dispute section.{" "}
          </li>
          <li>
            You can still “Cancel Dispute” the contract you just have disputed,
            if the Helpa does not yet take action of the dispute contract
            notification he or she has received, where Helpa can either Accept
            or Decline to open a dispute to the job contract. If Helpa confirms
            the dispute of contract (by Accept button) , it means the Agent and
            Helpa can still settle their issues within KeyHelpa’s platform
            inline with the terms and conditions set by KeyHelpa. Unless, if
            Helpa declines to open disputes with the contract, that is another
            process where the Agent can ask for consultation with KeyHelpa by
            sending them a message through the contact us form..
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
          Contract dispute may happen if there is a disagreement between Agent
          and Helpa concerning the job terms, payments or anything with the
          contract. Dispute contracts can be costly and time-consuming and may
          end up in court and damage to agencies connections and reputation if
          handled poorly.{" "}
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
)(withRouter(DisputeContractAgent));
