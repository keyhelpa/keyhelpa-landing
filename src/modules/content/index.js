import { Box, Container } from "@mui/material";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Helper } from "common";
import "./Style.css";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLeft: false,
      agent: false,
      showRight: false,
      startAlt: false,
    };
  }
  async componentDidMount() {
    if (this.props !== undefined) {
      const { selectedUser } = this.props.state;
      console.log(">>>>", selectedUser);
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
  renderLeft() {
    return (
      <Box sx={{ height: "100vh", bgColor: "#cfe8fc" }}>
        <h1>left</h1>
      </Box>
    );
  }
  renderRight() {
    return (
      <Box sx={{ height: "100vh", bgColor: "#cfe8fc" }}>
        <h1>right</h1>
      </Box>
    );
  }
  handleClick(event) {
    const { setSelectedUser, setRightMenu, setColor } = this.props;
    let elem = document.getElementById("first");
    let coord = elem.getBoundingClientRect();
    let inWidth = coord.width;
    let temp = event.screenX - coord.left;
    this.setState({ startAlt: true });
    if (this.state.startAlt === false) {
      if (inWidth / 2 > temp) {
        setSelectedUser("agent");
        localStorage.setItem("user_type", "agent");
        this.setState({ showLeft: true, showRight: false });
        setRightMenu("agent");
      } else {
        setSelectedUser("helpa");
        localStorage.setItem("user_type", "helpa");
        this.setState({ showLeft: false, showRight: true });
        setRightMenu("helpa");
      }
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

  handleHover(id, mouseEvent, hidden, show, classes) {
    let temp = document.getElementById(id);
    let toBeHidden = document.getElementById(hidden);
    let toBeShow = document.getElementById(show);
    let textLeft = document.getElementById("textLeft");
    let textRight = document.getElementById("textRight");

    if (mouseEvent === "enter") {
      temp.classList.add("animate");
      temp.classList.remove("reverse");
      console.log("=======", id);
      if (show === "agentRight") {
        toBeHidden.className = classes + " hidden";
        toBeShow.className = classes + " display";
        textRight.className = "textRight display";
      } else {
        toBeHidden.className = "imageLeft hidden";
        toBeShow.className = "helpaLeft display";
        textLeft.className = "textLeft display";
      }
    } else {
      temp.classList.add("reverse");
      temp.classList.remove("animate");
      if (show === "agentRight") {
        toBeHidden.className = classes + " display";
        toBeShow.className = classes + " hidden";
        textRight.className = "textRight hidden";
      } else {
        toBeHidden.className = "imageLeft display";
        toBeShow.className = "helpaLeft hidden";
        textLeft.className = "textLeft hidden";
      }
    }
  }

  render() {
    const { showLeft, showRight, startAlt } = this.state;
    console.log(showLeft, showRight);
    return (
      <div id="container">
        <div className="subContainer">
          <div className="containerLeft" id="containerLeft">
            <div
              id="textLeft"
              className="textLeft hidden"
              style={{ float: "left", marginTop: "100%" }}
            >
              <h1>AGENT</h1>
            </div>
            <div
              onClick={() => {
                this.handleSelect("agent");
                this.props.history.push("/agent");
              }}
            >
              <img
                src={require("assets/img/agentLeft.png")}
                onMouseEnter={() =>
                  this.handleHover(
                    "containerRight",
                    "enter",
                    "helpaRight",
                    "agentRight",
                    "imageRight"
                  )
                }
                onMouseLeave={() =>
                  this.handleHover(
                    "containerRight",
                    "leave",
                    "helpaRight",
                    "agentRight",
                    "imageRight"
                  )
                }
                className="imageLeft display"
                id="agentLeft"
              ></img>

              <img
                src={require("assets/img/agentRight.png")}
                className="imageRight hidden"
                id="agentRight"
              ></img>
            </div>
          </div>
          <div className="containerRight" id="containerRight">
            <div
              onClick={() => {
                this.handleSelect("helpa");
                this.props.history.push("/helpa");
              }}
            >
              <img
                src={require("assets/img/helpaLeft.png")}
                className="helpaLeft hidden"
                id="helpaLeft"
              ></img>
              <img
                src={require("assets/img/helpaRight.png")}
                onMouseEnter={() =>
                  this.handleHover(
                    "containerLeft",
                    "enter",
                    "agentLeft",
                    "helpaLeft",
                    "helpaLeft"
                  )
                }
                onMouseLeave={() =>
                  this.handleHover(
                    "containerLeft",
                    "leave",
                    "agentLeft",
                    "helpaLeft",
                    "helpaLeft"
                  )
                }
                className="imageRight display"
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
        {/* <div className={`${!showLeft && !showRight ? 'containers' : showLeft ? 'leftBg' : 'rightBg'}`}>
          <div className="landing-image">
            <img src={require('../../assets/img/agentLeft.png')} className="imageLeft" id="first"></img>
            
          </div>
          {
            startAlt && (
              <div style={{display: 'flex'}}>
                {
                  showRight && (
                  <div className="textLeft" onClick={() => this.handleSelect('agent')}>
                    <h1>AGENT</h1>
                  </div>
                  )
                }
                <div style={{width: '95%'}}>
                  <img src={require('../../assets/image_gray.png')} className={`landing-image ${ showRight ? 'hide' : 'display'}`} id="gray"></img>
                  <img src={require('../../assets/image_pink.png')} className={`landing-image ${showLeft ? 'hide' : 'display'}`} id="pink"></img>
                </div>
                {
                  showLeft && (
                  <div className="textRight" onClick={() => this.handleSelect('helpa')}>
                    <h1>HELPA</h1>
                  </div>
                  )
                }
              </div>
            )
          }
        </div> */}
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
)(withRouter(Homepage));
