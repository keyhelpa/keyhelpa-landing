import React from "react";
import { connect } from "react-redux";
import Style from "./Style";
import { withRouter } from "react-router-dom";
import ViewAgent from "modules/generic/page/ViewAgent";
import DetailsLoading from "modules/generic/card/DetailsLoading";
import API from "services/api";
import Routes from "common/Routes";

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      submitProposal: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    if (this.props.match.params.code != null) {
      this.retrieveAgent();
    }
  }

  retrieveAgent() {
    const { user } = this.props.state;
    if (user === null) {
      return;
    }
    let parameter = {
      condition: [
        {
          column: "account_type",
          value: "AGENT",
          clause: "=",
        },
        {
          column: "code",
          value: this.props.match.params.code,
          clause: "=",
        },
      ],
    };
    API.request(Routes.accountRetrieve, parameter, (response) => {
      if (response.data.length > 0) {
        let newData = response.data.map((item) => {
          let details =
            item.merchant && item.merchant.addition_informations !== null
              ? JSON.parse(item.merchant.addition_informations)
              : null;
          return {
            ...item,
            profile_status: true,
            document: "Certificate",
            state: details !== null ? details.state : null,
            region: details !== null ? details.region : null,
          };
        });
        this.setState({
          data: newData[0],
        });
      }
    });
  }

  render() {
    const { data, isLoading } = this.state;

    return (
      <div style={Style.mainContainer}>
        {!isLoading && data && (
          <ViewAgent
            data={data}
            navigate={(route) => {
              this.props.history.push(route);
            }}
            submitProposal={(data) => {
              this.setState({
                submitProposal: true,
              });
            }}
          />
        )}

        {isLoading && <DetailsLoading />}
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
