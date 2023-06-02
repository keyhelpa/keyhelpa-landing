import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./Style.css";
import VideoModal from "../generic/modal/video";
import withWindowDimensions from "../../common/withWindowDimensions";
class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLeft: false,
      agent: false,
      showRight: false,
      startAlt: false,
      video: null,
      showVideo: false,
    };
  }
  async componentDidMount() {
    if (this.props !== undefined) {
      const { selectedUser } = this.props.state;
      if (selectedUser == null) {
        this.setState({
          showLeft: false,
          showRight: false,
          agent: false,
          startAlt: false,
        });
      }
    }
    let userType = await localStorage.getItem("user_type");
    if (userType) {
      this.setState({ startAlt: true });
      await this.handleSelect(userType);
    }
  }

  async handleSelect(select) {
    const { setSelectedUser, setRightMenu } = this.props;
    if (select === "agent") {
      setSelectedUser("agent");
      localStorage.setItem("user_type", "agent");
      await this.setState({ showLeft: true, showRight: false, agent: true });
      setRightMenu("agent");
    } else {
      setSelectedUser("helpa");
      localStorage.setItem("user_type", "helpa");
      await this.setState({ showLeft: false, showRight: true, agent: true });
      setRightMenu("helpa");
    }
  }

  handleImgClick(e) {
    const clickedXSide = this.getClickedHorizontalSide(e);
    const clickedYSide = this.getClickedVerticalSide(e);
    e.stopPropagation();
    let video;
    switch (clickedXSide + clickedYSide) {
      case "lefttop":
        video = { url: "UcPjJNF14kw" };
        break;
      case "leftbottom":
        video = { url: "KZ4sZq0ZF1A" };
        break;
      case "righttop":
        video = { url: "P_Ck-4XNGsM" };
        break;
      case "rightbottom":
        video = { url: "l4iB_xsHXIQ" };
        break;
    }
    this.setState({ video });
  }

  getClickedHorizontalSide(e) {
    const clickTarget = e.target;
    const clickTargetWidth = clickTarget.offsetWidth;
    const xCoordInClickTarget =
      e.clientX - clickTarget.getBoundingClientRect().left;
    if (clickTargetWidth / 2 > xCoordInClickTarget) {
      return "left";
    } else {
      return "right";
    }
  }

  getClickedVerticalSide(e) {
    const clickTarget = e.target;
    const clickTargetHeight = clickTarget.offsetHeight;
    const yCoordInClickTarget =
      e.clientY - clickTarget.getBoundingClientRect().top;
    if (clickTargetHeight / 2 > yCoordInClickTarget) {
      return "top";
    } else {
      return "bottom";
    }
  }

  render() {
    const { video, showVideo } = this.state;
    const { isMobileSized } = this.props;
    console.log("-> isMobileSized", isMobileSized);

    return (
      <div id="container" style={{ position: "relative", cursor: "pointer" }}>
        <div
          className={showVideo ? "click-overlay" : ""}
          onClick={(event) => this.handleImgClick(event)}
        ></div>
        <div className="subContainer">
          <div className="containerLeft" id="containerLeft">
            <div
              id="textLeft"
              className="textLeft hidden"
              style={{ float: "left", marginTop: "100%" }}
            >
              <h1>AGENT</h1>
            </div>

            {isMobileSized && (
              <div
                style={{
                  marginTop: "100px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img src={require("assets/img/agents.png")} />
              </div>
            )}

            <div
              className={"left-half"}
              onClick={() => {
                document.getElementById("Agents Looking for Helpas").click();
              }}
            >
              <img
                src={require(isMobileSized
                  ? "assets/img/agentImageMobile.png"
                  : "assets/img/agentLeft.png")}
                className="imageLeft display agent-img"
                id="agentLeft"
              />
            </div>
          </div>
          <div className="containerRight" id="containerRight">
            {isMobileSized && (
              <div
                style={{
                  marginTop: "100px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img src={require("assets/img/helpas.png")} />
              </div>
            )}
            <div
              className={"right-half"}
              onClick={() => {
                document.getElementById("Helpas Looking to Earn").click();
              }}
            >
              <img
                src={require(isMobileSized
                  ? "assets/img/freelanceImageMobile.png"
                  : "assets/img/helpaRight.png")}
                className="imageRight display helpa-img"
                id="helpaRight"
              ></img>
            </div>
            <div
              id="textRight"
              className="textRight hidden"
              style={{ float: "right", marginTop: "100%" }}
            >
              <h1>HELPA</h1>
            </div>
          </div>
        </div>
        {video && showVideo && (
          <VideoModal
            show={true}
            data={video}
            onCancel={() => {
              this.setState({
                video: null,
              });
            }}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ state: state });
const mapDispatchToProps = (dispatch) => {
  const { actions } = require("reduxhandler");
  return {
    setSelectedUser: (user) => {
      dispatch(actions.setSelectedUser(user));
    },
    setRightMenu: (type) => dispatch(actions.setRightMenu(type)),
    setColor: (type) => dispatch(actions.setColor(type)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withWindowDimensions(Homepage)));
