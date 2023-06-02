import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Colors from "common/Colors";
import "./Style.css";
import GuideImage from "assets/guide.png";
class Guide extends Component {
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
          height: "60vh",
          backgroundColor:
            theme === "agent" ? Colors.agentGray : Colors.helpaPink,
          display: "flex",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <div
          style={{
            width: "100%",
            float: "left",
            textAlign: "center",
          }}
        >
          <img
            src={GuideImage}
            className="imageSize"
            style={{
              height: "auto",
            }}
          />
          <h1
            style={{
              color: Colors.white,
              textAlign: "center",
              marginTop: 25,
            }}
          >
            {this.props.title}
          </h1>
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Guide));
