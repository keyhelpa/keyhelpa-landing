import React from "react";
import Colors from "common/Colors";
import BreadCrumbs from "../breadcrumbs";
import Style from "./Style";
import Button from "components/increment/generic/form/Button";
import GroupAgent from "assets/img/group_agent.png";
import GroupFreelancer from "assets/img/group_freelancer.png";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Config from "config";

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { accountType } = this.props.state;
    return (
      <div style={Style.mainContainer}>
        <div
          style={{
            float: "left",
            width: "100%",
            marginTop: 40,
            textAlign: "center",
            alignContent: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="full-width-mobile"
        >
          <img
            src={
              accountType && accountType.toLowerCase() == "agent"
                ? GroupAgent
                : GroupFreelancer
            }
            style={{
              width: "auto",
              height: "300px",
            }}
            className="hide-on-mobile"
          />
          <img
            src={
              accountType && accountType.toLowerCase() == "agent"
                ? GroupAgent
                : GroupFreelancer
            }
            style={{
              width: "100%",
              height: "auto",
            }}
            className="hide-on-desktop"
          />
        </div>
        <div
          style={{
            float: "left",
            width: "100%",
            marginTop: 40,
            textAlign: "center",
          }}
        >
          <h1
            style={{
              color:
                accountType && accountType.toLowerCase() == "agent"
                  ? Colors.agentTextTitle
                  : Colors.helpaTextTitle,
            }}
          >
            Page not found
          </h1>
          <p
            style={{
              color:
                accountType && accountType.toLowerCase() == "agent"
                  ? Colors.agentText
                  : Colors.helpaTextTitle,
            }}
          >
            The page you are looking for might have been removed.
          </p>
          <Button
            title={"Home"}
            className="full-width-mobile"
            onClick={() => {
              this.props.history.push("/");
            }}
            style={{
              float: "center",
              backgroundColor:
                accountType && accountType.toLowerCase() == "agent"
                  ? Colors.agentDarkGray
                  : Colors.helpaDarkPink,
              color: Colors.white,
              paddingLeft: 55,
              paddingRight: 55,
              marginTop: 20,
              marginBottom: 25,
            }}
          />
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
