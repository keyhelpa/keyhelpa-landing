import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import BreadCrumbs from "../breadcrumbs";
import Style from "./Style";
import Helper from "common/Helper";
import Routes from "common/Routes";
import Footer from "modules/generic/frames/footer.js";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import API from "services/api";

class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutUs: null,
      isLoading: false,
    };
  }
  componentDidMount() {
    this.retrieve();
  }
  retrieve() {
    let params = {
      condition: [
        {
          column: "payload",
          clause: "=",
          value: "about_us",
        },
      ],
    };
    this.setState({ isLoading: true });
    API.request(Routes.payloadsRetrieve, params, (response) => {
      this.setState({ isLoading: false });
      if (response.data.length > 0) {
        this.setState({ aboutUs: response.data[0] });
      }
    });
  }
  render() {
    const { aboutUs, isLoading } = this.state;
    return (
      <div style={Style.mainContainer}>
        <BreadCrumbs
          title={"About Us"}
          page={"about_us"}
          backIcon={true}
          description="Display details about keyhelpa"
          style={{
            borderBottomWidth: 0,
          }}
        />
        {aboutUs !== null && !isLoading && (
          <div
            dangerouslySetInnerHTML={{ __html: aboutUs?.payload_value }}
          ></div>
        )}
        {aboutUs === null && isLoading && <Skeleton height={90} />}
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
)(withRouter(AboutUs));
