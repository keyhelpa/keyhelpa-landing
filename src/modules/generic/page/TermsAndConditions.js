import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import BreadCrumbs from "../breadcrumbs";
import Style from "./Style";
import Helper from "common/Helper";
import Routes from "common/Routes";
import Footer from "modules/generic/frames/footer.js";
import API from "services/api";

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      terms: null,
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
          value: "terms",
        },
      ],
    };

    API.request(Routes.payloadsRetrieve, params, (response) => {
      if (response.data.length > 0) {
        this.setState({ terms: response.data[0] });
      }
    });
  }
  render() {
    window.scrollTo(0, 0);
    const { terms } = this.state;
    return (
      <div
        style={{
          ...Style.mainContainer,
          marginTop: 100,
        }}
      >
        <BreadCrumbs
          title={"Terms & Conditions"}
          page={"work"}
          backIcon={true}
          style={{
            borderBottomWidth: 0,
          }}
        />

        <div>
          {terms !== null && (
            <div
              dangerouslySetInnerHTML={{ __html: terms?.payload_value }}
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
