import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Colors from "common/Colors";
import VideoCard from "modules/guides/videoCard";
import "./agent.css";
import Data from "modules/guides/data";
import Config from "common/Config";
class SetupAgent extends Component {
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
          When you sign up to KeyHelpa, automatically, you will be redirected to
          the welcome page. If you have logged out right after you sign up, you
          can still login using your newly registered credentials and then
          proceed to the welcome page.{" "}
        </p>
        <p>
          Follow the steps below to complete your profile setup with KeyHelpa as
          an Agent:
        </p>
        <ol type="1">
          <li>
            Start your profile setup by clicking on the “Profile setup” button
            on the “Welcome to KeyHelpa” Page. Then you will be redirected to
            the Agency information page.
          </li>
          <li>
            On the Agency information page, please fill in all the fields and
            upload your profile photo to continue. Once all is done, click the
            “Next” button at the bottom right corner of the page and you will be
            taken to the Contact details page.
          </li>
          <li>
            On the Contact details page, most of the information is
            automatically populated with data you used during your registration.
            Please add your mobile phone number. Click the “Next button” to
            proceed to the Billing page.
          </li>
          <li>
            On the Billing page, add your authorized banking details to be used
            in payments when doing transactions with KeyHelpa. Once added, click
            the “Next” button to proceed to the Verification page.
          </li>
          <li>
            On the Verification page, please read the instructions and click the
            “Verify me” pink button to get your ID validated. Once validated,
            click the “Submit” button at the bottom right corner of the page.{" "}
          </li>
          <li>
            Once all done with Step 1-5, you can now enjoy searching for
            candidates and create your job postings!
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
              theme == "agent" ? Colors.agentTextTitle : Colors.helpaTextTitle,
            marginBottom: "5%",
          }}
        >
          Have you registered as an Agent in KeyHelpa? If yes, it is time to
          complete your profile setup to access all features of KeyHelpa!
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
)(withRouter(SetupAgent));
