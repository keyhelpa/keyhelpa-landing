import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Banner from "./banner";
import Colors from "common/Colors";
import { SvgIcon } from "@mui/material";
import Data from "./data";
import Introduction from "./pages/introduction";
import "./Style.css";
import CreateAccountAgent from "./pages/agent/create_account";
import SetupAgent from "./pages/agent/setup_profile";
import SearchHelpa from "./pages/agent/search_helpa";
import JobPosting from "./pages/agent/job_posting";
import SendInvite from "./pages/agent/send_invite";
import AcceptProposal from "./pages/agent/accept_proposal";
import InterviewHelpa from "./pages/agent/interview_helpa";
import HireHelpa from "./pages/agent/hire_helpa";
import CreateContract from "./pages/agent/create_contract";
import EndContractAgent from "./pages/agent/end_contract";
import PauseContractAgent from "./pages/agent/pause_contract";
import DisputeContractAgent from "./pages/agent/dispute_contract";
import EditBasicAgent from "./pages/agent/edit_basic_info";
import EditAgency from "./pages/agent/edit_agency_info";
import UpdateBankAgent from "./pages/agent/update_bank";
import UpdatePasswordAgent from "./pages/agent/update_password";
import ManageSecurityAgent from "./pages/agent/manage_security";
import ManageNotifAgent from "./pages/agent/manage_notif";

import CreateAccountHelpa from "./pages/helpa/create_account";
import SetupHelpa from "./pages/helpa/setup_profile";
import SearchJob from "./pages/helpa/search_job";
import SubmitProposal from "./pages/helpa/submit_proposal";
import EndContractHelpa from "./pages/helpa/end_contract";
import PauseContractHelpa from "./pages/helpa/pause_contract";
import DisputeContractHelpa from "./pages/helpa/dispute_contract";
import EditBasicHelpa from "./pages/helpa/edit_basic";
import ManageSocials from "./pages/helpa/manage_socials";
import UpdateBankHelpa from "./pages/helpa/update_bank";
import UpdatePasswordHelpa from "./pages/helpa/update_password";
import ManageSecurityHelpa from "./pages/helpa/manage_security";
import WorkHistory from "./pages/helpa/work_history";
import WorkPreference from "./pages/helpa/work_preference";
import WorkAvailability from "./pages/helpa/work_availability";
import OtherData from "./pages/helpa/other_data";
import UpdateCert from "./pages/helpa/update_certificates";
import ManageNotifHelpa from "./pages/helpa/manage_notif";

class Guide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "agent",
      accountType: null,
      menu: [],
      item: null,
    };
  }

  componentDidMount() {
    const { history } = this.props;
    let user = history.location.pathname.includes("agent") ? "agent" : "helpa";
    this.setState({
      accountType: user,
      theme: user,
      menu: user == "agent" ? Data.agent : Data.helpa,
      item: Data.getMenu(
        user == "agent" ? Data.agent : Data.helpa,
        history.location.pathname
      ),
    });
  }

  managePage(item) {
    const { theme } = this.state;
    switch (item.route) {
      case "/agent/guides":
        return <Introduction theme={theme} />;
      case "/helpa/guides":
        return <Introduction theme={theme} />;
      // agent
      case "/agent/guides/create_account":
        return <CreateAccountAgent theme={theme} />;
      case "/agent/guides/setup_profile":
        return <SetupAgent theme={theme} />;
      case "/agent/guides/search_helpa":
        return <SearchHelpa theme={theme} />;
      case "/agent/guides/create_job_posting":
        return <JobPosting theme={theme} />;
      case "/agent/guides/send_invite":
        return <SendInvite theme={theme} />;
      case "/agent/guides/accept_proposal":
        return <AcceptProposal theme={theme} />;
      case "/agent/guides/interview_helpa":
        return <InterviewHelpa theme={theme} />;
      case "/agent/guides/hire_helpa":
        return <HireHelpa theme={theme} />;
      case "/agent/guides/create_contract":
        return <CreateContract theme={theme} />;
      case "/agent/guides/end_contract":
        return <EndContractAgent theme={theme} />;
      case "/agent/guides/pause_contract":
        return <PauseContractAgent theme={theme} />;
      case "/agent/guides/dispute_contract":
        return <DisputeContractAgent theme={theme} />;
      case "/agent/guides/edit_basic_info":
        return <EditBasicAgent theme={theme} />;
      case "/agent/guides/edit_agency_info":
        return <EditAgency theme={theme} />;
      case "/agent/guides/update_bank_details":
        return <UpdateBankAgent theme={theme} />;
      case "/agent/guides/update_password":
        return <UpdatePasswordAgent theme={theme} />;
      case "/agent/guides/manage_security":
        return <ManageSecurityAgent theme={theme} />;
      case "/agent/guides/manage_notifications":
        return <ManageNotifAgent theme={theme} />;
      // helpa
      case "/helpa/guides/create_account":
        return <CreateAccountHelpa theme={theme} />;
      case "/helpa/guides/setup_profile":
        return <SetupHelpa theme={theme} />;
      case "/helpa/guides/search_job":
        return <SearchJob theme={theme} />;
      case "/helpa/guides/submit_proposal":
        return <SubmitProposal theme={theme} />;
      case "/helpa/guides/end_contract":
        return <EndContractHelpa theme={theme} />;
      case "/helpa/guides/pause_contract":
        return <PauseContractHelpa theme={theme} />;
      case "/helpa/guides/dispute_contract":
        return <DisputeContractHelpa theme={theme} />;
      case "/helpa/guides/edit_basic_info":
        return <EditBasicHelpa theme={theme} />;
      case "/helpa/guides/manage_socials":
        return <ManageSocials theme={theme} />;
      case "/helpa/guides/update_bank_details":
        return <UpdateBankHelpa theme={theme} />;
      case "/helpa/guides/update_password":
        return <UpdatePasswordHelpa theme={theme} />;
      case "/helpa/guides/manage_security":
        return <ManageSecurityHelpa theme={theme} />;
      case "/helpa/guides/update_work_experience":
        return <WorkHistory theme={theme} />;
      case "/helpa/guides/update_work_preferences":
        return <WorkPreference theme={theme} />;
      case "/helpa/guides/update_work_availability":
        return <WorkAvailability theme={theme} />;
      case "/helpa/guides/update_other_data":
        return <OtherData theme={theme} />;
      case "/helpa/guides/update_certificates":
        return <UpdateCert theme={theme} />;
      case "/helpa/guides/manage_notifications":
        return <ManageNotifHelpa theme={theme} />;
    }
  }

  renderMenu() {
    const { theme, menu } = this.state;
    return (
      <div
        style={{
          float: "left",
          width: "100%",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginTop: 25,
            marginBottom: 25,
            color:
              theme === "agent" ? Colors.agentDarkGray : Colors.helpaDarkPink,
          }}
        >
          {theme === "agent" ? "Agent Guides" : "Helpa Guides"}
        </h1>
        <div
          style={{
            float: "left",
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            gap: "5%",
          }}
        >
          {menu.map((item, index) => (
            <div
              key={index}
              style={{
                width: "30%",
                float: "left",
                backgroundColor: Colors.white,
                borderRadius: 12,
                textAlign: "center",
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 20,
                paddingRight: 20,
                marginBottom: 25,
                cursor: "pointer",
              }}
              onClick={() => {
                this.setState({
                  item,
                });
                this.props.history.push(item.route);
                // setTimeout(() => {
                //     this.props.history.go(0)
                // }, 100)
                window.scrollTo(0, 0);
              }}
              className={
                theme === "agent"
                  ? "cursor-hover-agent full-width-mobile"
                  : "cursor-hover-helpa full-width-mobile"
              }
            >
              <SvgIcon
                component={item.icon}
                style={{
                  fontSize: 60,
                  color:
                    theme === "agent"
                      ? Colors.agentDarkGray
                      : Colors.helpaDarkPink,
                }}
                className="card-icon"
              />
              <p
                style={{
                  color:
                    theme === "agent"
                      ? Colors.agentDarkGray
                      : Colors.helpaDarkPink,
                }}
                className="card-text"
              >
                <b>{item.title}</b>
              </p>
              <p
                style={{
                  color:
                    theme === "agent"
                      ? Colors.agentTextTitle
                      : Colors.helpaTextTitle,
                }}
                className="card-text"
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  render() {
    const { theme, item } = this.state;
    return (
      <div
        style={{
          width: "100%",
          float: "left",
          backgroundColor:
            theme === "agent"
              ? Colors.agentBackgroundColor
              : Colors.helpaBackgroundColor,
        }}
      >
        {item && <Banner title={item.title} theme={theme} />}

        <div
          style={{
            backgroundColor:
              theme === "agent"
                ? Colors.agentBackgroundColor
                : Colors.helpaBackgroundColor,
            float: "left",
            width: "100%",
            minHeight: "100vh",
            marginBottom: 100,
          }}
        >
          <div
            style={{
              width: "50%",
              float: "left",
              marginLeft: "25%",
              marginRight: "25%",
              paddingTop: 50,
              paddingBottom: 50,
            }}
            className="full-width-mobile-with-margin"
          >
            {item && this.managePage(item)}
            {this.renderMenu()}
          </div>
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
