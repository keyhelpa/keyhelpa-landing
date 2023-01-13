import React from "react";
import { BasicStyles } from "common";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Colors from "common/Colors";
import TextInput from "components/increment/generic/form/TextInput";
import Button from "components/increment/generic/form/Button";

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxLength: null,
      textInput1: "",
      textInput2: "",
      textInput3: "",
      textInput4: "",
      textInput5: "",
      textInput6: "",
      smsCode: null,
    };
  }

  submit() {
    const {
      textInput1,
      textInput2,
      textInput3,
      textInput4,
      textInput5,
      textInput6,
    } = this.state;
    let code = `${textInput1}${textInput2}${textInput3}${textInput4}${textInput5}${textInput6}`;
    this.props.handleSubmit(code);
  }

  render() {
    const { smsCode } = this.setState;
    return (
      <div
        style={{
          width: "100%",
          float: "left",
        }}
        className="full-width-mobile"
      >
        <input
          value={smsCode}
          maxlength="1"
          className="sms-input"
          onChange={(smsCode) => {
            console.log(">>>>>>>", smsCode.target.value);
            this.setState({
              textInput1: smsCode.target.value,
            });
          }}
        />
        <input
          value={smsCode}
          maxlength="1"
          className="sms-input"
          onChange={(smsCode) => {
            this.setState({
              textInput2: smsCode.target.value,
            });
          }}
        />
        <input
          value={smsCode}
          maxlength="1"
          className="sms-input"
          onChange={(smsCode) => {
            this.setState({
              textInput3: smsCode.target.value,
            });
          }}
        />
        <input
          value={smsCode}
          maxlength="1"
          className="sms-input"
          onChange={(smsCode) => {
            this.setState({
              textInput4: smsCode.target.value,
            });
          }}
        />
        <input
          value={smsCode}
          maxlength="1"
          className="sms-input"
          onChange={(smsCode) => {
            this.setState({
              textInput5: smsCode.target.value,
            });
          }}
        />
        <input
          value={smsCode}
          maxlength="1"
          className="sms-input"
          onChange={(smsCode) => {
            this.setState({
              textInput6: smsCode.target.value,
            });
          }}
        />
        <Button
          title={"Submit"}
          onClick={() => {
            this.submit();
          }}
          style={{
            ...this.props.buttonStyle,
            float: "center",
            backgroundColor: Colors.primary,
            color: Colors.white,
            paddingLeft: "10%",
            paddingRight: "10%",
            marginTop: 25,
          }}
          className="full-width-mobile"
          isLoading={this.props.isLoading}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => {
  const { actions } = require("reduxhandler");
  return {
    login: (user, token) => {
      dispatch(actions.login(user, token));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stack));
