import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import BreadCrumbs from "../breadcrumbs";
import Style from "./Style";
import Footer from "modules/generic/frames/footer.js";
import Helper from "common/Helper";
import Routes from "common/Routes";
import API from "services/api";

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      privacy: null,
    };
  }

  componentDidMount() {
    this.retrieve();
  }

  retrieve() {
    const { user } = this.props.state;
    let params = {
      condition: [
        {
          column: "payload",
          clause: "=",
          value: "privacy",
        },
      ],
    };

    API.request(Routes.payloadsRetrieve, params, (response) => {
      if (response.data.length > 0) {
        this.setState({ privacy: response.data[0] });
      }
    });
  }
  render() {
    const { privacy } = this.state;
    window.scrollTo(0, 0);
    return (
      <div
        style={{
          ...Style.mainContainer,
          marginTop: 100,
        }}
      >
        <BreadCrumbs
          title={"Privacy Policy"}
          page={"work"}
          backIcon={true}
          style={{
            borderBottomWidth: 0,
          }}
        />
        <div
          style={{
            widht: "100%",
            float: "left",
            marginTop: 50,
          }}
        >
          {privacy !== null && (
            <div
              dangerouslySetInnerHTML={{ __html: privacy?.payload_value }}
            ></div>
          )}
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
