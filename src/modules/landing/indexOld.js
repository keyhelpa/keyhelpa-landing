import React, { Component } from "react";
import Features from "modules/landing/features.js";
import Video from "modules/landing/video.js";
import Others from "modules/landing/others.js";
import Banner from "modules/landing/banner.js";
import { Container, Box, Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import "./Style.css";
import API from "services/api";
import Routes from "common/Routes";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Color } from "common";
import { agent, helpa } from "./data";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "agent",
      data: [],
      isLoading: false,
      hasHelps: false,
      hasFeatures: false,
      hasOthers: false,
      othersData: [],
      featuresData: [],
    };
  }

  componentDidMount() {
    const { setColor, setSelectedUser, history } = this.props;
    const { data } = this.state;
    console.log(
      "agent>>>>>>>>>>>>>>>",
      history.location.pathname.includes("agent")
    );
    if (history.location.pathname.includes("agent")) {
      this.setState({ theme: "agent" });
      setColor("agent");
      setSelectedUser("agent");
    } else {
      console.log("helpa");
      this.setState({ theme: "helpa" });
      setColor("helpa");
      setSelectedUser("helpa");
    }
    this.retrieveLocal();
    // this.retrieve()
  }
  componentDidUpdate(nextProps) {
    const { setColor, setSelectedUser, history } = this.props;
    if (this.props.location !== nextProps.location) {
      console.log("<><><>>))))))))");
      if (history.location.pathname.includes("agent")) {
        this.setState({ theme: "agent" });
        setColor("agent");
        setSelectedUser("agent");
      } else {
        console.log("helpa");
        this.setState({ theme: "helpa" });
        setColor("helpa");
        setSelectedUser("helpa");
      }
      this.retrieveLocal();
      // this.retrieve()
    }
  }
  async retrieveLocal() {
    const { history } = this.props;
    let status = history.location.pathname.includes("agent")
      ? "agent"
      : "helpa";
    let tempFeatures = [];
    let tempOthers = [];
    let response = status == "agent" ? agent : helpa;
    await this.setState({ data: response.data, isLoading: true });
    for (let i = 0; i <= response.data.length - 1; i++) {
      const item = response.data[i];
      if (item.payload_value.others) {
        tempOthers.push(item.payload_value.others);
      }
      if (item.payload_value.features) {
        tempFeatures.push(item.payload_value.features);
      }
    }
    this.setState({
      othersData: tempOthers,
      featuresData: tempFeatures,
      isLoading: false,
    });
    this.runChecks();
  }
  retrieve() {
    const { history } = this.props;
    const { othersData, featuresData } = this.state;
    let status = history.location.pathname.includes("agent")
      ? "agent"
      : "helpa";
    this.setState({ data: [] });
    let param = {
      condition: [
        {
          column: "payload",
          clause: "=",
          value: status,
        },
      ],
    };
    this.setState({ isLoading: true });
    API.request(Routes.payloadsRetrieve, param, (response) => {
      console.log("response", response.data);
      let tempFeatures = [];
      let tempOthers = [];
      if (response.data.length > 0) {
        this.setState({
          data: response.data,
          isLoading: false,
        });
        for (let i = 0; i <= response.data.length - 1; i++) {
          const item = response.data[i];
          if (item.payload_value.others) {
            tempOthers.push(item.payload_value.others);
          }
          if (item.payload_value.features) {
            tempFeatures.push(item.payload_value.features);
          }
        }
        this.setState({
          othersData: tempOthers,
          featuresData: tempFeatures,
        });
        this.runChecks();
      }
    });
  }

  runChecks() {
    const { data } = this.state;
    console.log(">>>>>>>>>>>>", data);
    return data.map((item, index) => {
      if (
        item.payload_value.helps != null ||
        item.payload_value.helps != undefined
      ) {
        this.setState({
          ...this.state,
          hasHelps: true,
        });
      }
      if (
        item.payload_value.features != null ||
        item.payload_value.features != undefined
      ) {
        this.setState({
          ...this.state,
          hasFeatures: true,
        });
      }
      if (
        item.payload_value.others != null ||
        item.payload_value.others != undefined
      ) {
        this.setState({
          ...this.state,
          hasOthers: true,
        });
      }
    });
  }
  // componentWillUnmount(){
  //   this._isFetching = false;
  // }
  render() {
    const {
      theme,
      isLoading,
      hasFeatures,
      hasHelps,
      hasOthers,
      data,
      featuresData,
      othersData,
    } = this.state;
    // const {selectedUser} = this.props.state;
    let selectedUser = this.props.history.location.pathname.includes("agent")
      ? "agent"
      : "helpa";
    console.log("<><><><>><><<<<<<<", this.props.history.location.pathname);
    return (
      <div>
        {isLoading && data.length <= 0 && (
          <Box
            sx={{
              margin: 0,
              position: "absolute",
              top: "50%",
              left: "50%",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <CircularProgress style={{ color: Color.helpaDarkPink }} />
          </Box>
        )}
        {data.length > 0 && !isLoading && (
          <div
            className={
              selectedUser === "agent" ? " banner-agent" : "banner-helpa"
            }
          >
            {<Banner {...this.props} theme={selectedUser} />}
            {hasHelps ? <Video theme={selectedUser} data={data} /> : ""}
            {featuresData.length > 0 ? (
              <Features theme={selectedUser} data={featuresData} />
            ) : (
              ""
            )}
            {othersData.length > 0 ? (
              <Others theme={selectedUser} data={othersData} />
            ) : (
              ""
            )}
          </div>
        )}
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Landing));
