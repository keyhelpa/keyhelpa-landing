import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Colors from "common/Colors";
import VideoCard from "modules/guides/videoCard";
class Stack extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
          }}
        >
          {theme == "agent"
            ? "Find Agents for you. Browse agents around the country that best fits your needs. Browse agents. Search for jobs. In Keyhelpa, work remotely. Look for agents that offers jobs that suits you."
            : "Find Helpas for you. We make it easier for you to connect with helpas around the country. Source for talents. Hire our Helpas.Look for helpas that can work remotely. Search in Keyhelpa."}
        </p>

        <VideoCard />
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
