import React from "react";
import VerifyButton from "@passbase/button/react";
import Colors from "common/Colors";
import config from "config.js";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import API from "services/api";
import Routes from "common/Routes";
class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  updateStatus(key) {
    const { user } = this.props.state;
    if (user == null) {
      return;
    }

    this.setState({ isLoading: true });
    API.request(
      Routes.accountUpdateStatus,
      {
        id: user.id,
        status: "/ongoing_verification",
      },
      (response) => {
        this.setState({
          isLoading: false,
        });
        window.location.href = "/ongoing_verification";
      },
      (error) => {
        this.setState({
          isLoading: false,
        });
      }
    );
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        <VerifyButton
          apiKey={config.PASSBASE_KEY}
          onStart={() => {}}
          onError={(errorCode) => {}}
          onFinish={(identityAccessKey) => {
            this.updateStatus(identityAccessKey);
          }}
        />
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
