import React, { StyleSheet } from "react";
import {
  Layout,
  Page,
  Heading,
  Icon,
  DisplayText,
  TextStyle,
  Subheading,
  Card,
  Stack,
  RadioButton,
  TextField,
} from "@shopify/polaris";
import {
  ConversationMinor,
  ArrowRightMinor,
  SettingsMinor,
} from "@shopify/polaris-icons";
import { connect } from "react-redux";
class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          width: "100%",
          padding: 0,
          backgroundSize: "35% auto",
          backgroundPosition: "right 0 bottom 0",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "overlay",
        }}
        className="registration_container"
      >
        <div
          style={{
            width: "60%",
          }}
          className="registration"
        ></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => {
  const { actions } = require("reduxhandler");
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
