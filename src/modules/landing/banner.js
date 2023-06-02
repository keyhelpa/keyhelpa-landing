import React, { Component } from "react";
import Footer from "modules/generic/frames/footer.js";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { SvgIcon } from "@mui/material";
import Colors from "common/Colors";
import { Container, Box, Grid } from "@mui/material";
import Button from "modules/generic/button";
import bgAgent from "assets/lighterGray.png";
import bgHelpa from "assets/lighterPink.png";
import "./Style.css";
import API from "services/api";
import Routes from "common/Routes";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: this.props.theme,
      hasFetched: false,
    };
  }
  handleClick() {
    const { history, setColor, setSelectedUser } = this.props;
    const { theme } = this.props;
    if (theme === "helpa") {
      document.getElementById("Agents Looking for Helpas").click();
    } else {
      document.getElementById("Helpas Looking to Earn").click();
    }
  }
  render() {
    const { theme } = this.props;
    return (
      <div>
        {/* Web View */}
        <div className="web">
          <div className={theme === "helpa" ? "show" : "hidden"}>
            <img
              className={theme === "helpa" ? "Helpa" : ""}
              src={require("../../assets/Helpa.png")}
            ></img>
          </div>
          <div className="tooltip">
            <img
              className={theme === "agent" ? "agentRobyn" : ""}
              src={theme === "agent" ? require("../../assets/Robyn.png") : ""}
            ></img>
            <div className="right">
              <h3 className="tooltip-title">
                {theme === "agent" ? "Robyn" : ""}
              </h3>
              <p className="tooltip-desc">
                {theme === "agent"
                  ? "Robyn is a licenced real estate agent. She just signed four new clients who have put their properties on the market, and she needs help at the open houses."
                  : ""}
              </p>
              <i></i>
            </div>
          </div>

          <div className="tooltip">
            <img
              className={theme === "agent" ? "agentPaul" : "freelanceSarah"}
              src={
                theme === "agent"
                  ? require("../../assets/Paul.png")
                  : require("../../assets/Sarah.png")
              }
            ></img>
            <div className="right">
              <h3 className="tooltip-title">
                {theme === "agent" ? "Paul" : "Sarah"}
              </h3>
              <p className="tooltip-desc">
                {theme === "agent"
                  ? "Paul is a senior property manager at a busy real estate office. The agency manages many properties, and he has a lot going on dealing with landlords and tenants."
                  : "Sarah is a mother of two, a licensed agent with years of experience; due to her family commitments, she is limited by the number of hours she can work each week. However, Sarah's lifestyle dynamics prompted her to find a new way of earning extra money and to be her own boss."}
              </p>
              <i></i>
            </div>
          </div>

          <div className="tooltip">
            <img
              className={theme === "agent" ? "agentTrevor" : "freelanceAlan"}
              src={
                theme === "agent"
                  ? require("../../assets/Trevor.png")
                  : require("../../assets/Alan.png")
              }
            ></img>
            <div className="right">
              <h3 className="tooltip-title">
                {theme === "agent" ? "Trevor" : "Alan"}
              </h3>
              <p className="tooltip-desc">
                {theme === "agent"
                  ? "Trevor is a Strata Manager at a busy Strata Agents' office. He has a lot going on dealing with annual general meetings, building repairs, tradespeople and budgets."
                  : "Alan turns to the KeyHelpa platform. It is free to join. He creates his unique business freelancer profile page, selects strata managers category, the days and times he is available to work, and within 2 minutes his profile is live and ready to search for work opportunities in his local area."}
              </p>
              <i></i>
            </div>
          </div>

          <div className="tooltip">
            <img
              className={theme === "agent" ? "agentJohn" : "freelanceLana"}
              src={
                theme === "agent"
                  ? require("../../assets/JohnAgent.png")
                  : require("../../assets/Lana.png")
              }
            ></img>
            <div className="right">
              <h3 className="tooltip-title">
                {theme === "agent" ? "John" : "Lana"}
              </h3>
              <p className="tooltip-desc">
                {theme === "agent"
                  ? "John is a licensed real estate agent working in a busy real estate office. John needs additional assistance with his open homes and general marketing work."
                  : "Lana is a talented real estate agent with years of experience; due to the epidemic, she works remotely. This has changed the dynamics of her lifestyle and prompted her to find a new way of earning money and become her own boss."}
              </p>
              <i></i>
            </div>
          </div>

          <div className="tooltip">
            <img
              className={theme === "agent" ? "Agent" : "freelanceTracey"}
              src={
                theme === "agent"
                  ? require("../../assets/Agent.png")
                  : require("../../assets/Tracey.png")
              }
            ></img>
            <div className="right">
              <h3 className="tooltip-title">
                {theme === "agent" ? "" : "Tracey"}
              </h3>
              <p className="tooltip-desc">
                {theme === "agent"
                  ? ""
                  : "Tracey is a property manager at a busy real estate office. The agency manages properties, and she has a lot going on dealing with landlords and tenants. She needs additional assistance to manage the overload of work."}
              </p>
              <i></i>
            </div>
          </div>

          <div className="tooltip">
            <img
              className={theme === "helpa" ? "freelanceJohn" : ""}
              src={
                theme === "helpa" ? require("../../assets/JohnHelpa.png") : ""
              }
            ></img>
            <div className="left">
              <h3 className="tooltip-title">
                {theme === "helpa" ? "John" : ""}
              </h3>
              <p className="tooltip-desc">
                {theme === "helpa"
                  ? "John is a licensed real estate agent working in a busy real estate office. John needs additional assistance with his open homes and general marketing work."
                  : ""}
              </p>
              <i></i>
            </div>
          </div>

          <div
            className={theme === "agent" ? "btnLeft" : "btnRight"}
            style={{ cursor: "pointer" }}
            onClick={() => this.handleClick()}
          >
            <h1>{theme === "agent" ? "Freelancers" : "Agents"}</h1>
          </div>
        </div>

        {/* Mobile View */}
        <div className="mobile">
          <img
            style={{
              justifyContent: "right",
              width: "100%",
              marginTop: "25%",
            }}
            className={theme === "helpa" ? "Helpa" : ""}
            src={
              theme === "agent"
                ? require("../../assets/agent-mobile-bg.png")
                : require("../../assets/helpa-mobile-bg.png")
            }
          ></img>

          <div
            className={theme === "agent" ? "btnLeft" : "btnRight"}
            style={{ cursor: "pointer", paddingLeft: "14px", width: "50px" }}
            onClick={() => this.handleClick()}
          >
            {theme === "agent" ? (
              <SvgIcon
                component={ArrowBackIosIcon}
                style={{
                  fontSize: 25,
                  color:
                    theme === "agent"
                      ? Colors.helpaDarkPink
                      : Colors.agentDarkGray,
                }}
                className="card-icon"
              />
            ) : (
              <SvgIcon
                component={ArrowForwardIosIcon}
                style={{
                  fontSize: 25,
                  color:
                    theme === "agent"
                      ? Colors.helpaDarkPink
                      : Colors.agentDarkGray,
                }}
                className="card-icon"
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ state: state });
const mapDispatchToProps = (dispatch) => {
  const { actions } = require("reduxhandler");
  return {
    setColor: (type) => dispatch(actions.setColor(type)),
    setSelectedUser: (user) => {
      dispatch(actions.setSelectedUser(user));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Banner));
