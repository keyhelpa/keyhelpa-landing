import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Colors from "common/Colors";
import Button from "components/increment/generic/form/Button";
import Persons from "assets/img/persons.png";
class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  render() {
    const { user } = this.props.state;
    return (
      <div
        style={{
          width: "50%",
          float: "left",
          marginTop: 100,
          marginLeft: "25%",
          marginRight: "25%",
          color: Colors.textGray,
        }}
      >
        <div>
          <img
            src={Persons}
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
        <p style={{}}>
          Hi <b>{user?.username.toUpperCase()}!</b>
        </p>
        <p>
          Your profile is currently under review. Please give us 48 hours to
          complete the verification process.
        </p>

        <p>
          Please check your email address about the updates of your account.
        </p>
        <p>Thank you!</p>
        <p
          style={{}}
          className="href-link"
          onClick={() => {
            this.props.logout();
          }}
        >
          Or
          <b
            style={{
              color: Colors.primary,
              fontWeight: "bold",
              paddingLeft: 5,
            }}
          >
            Logout?
          </b>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => {
  const { actions } = require("reduxhandler");
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stack));
