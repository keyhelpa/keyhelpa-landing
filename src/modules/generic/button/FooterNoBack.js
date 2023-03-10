import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Button from "components/increment/generic/form/Button";
import Colors from "common/Colors";
class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          width: "100%",
          float: "left",
          marginTop: 100,
        }}
      >
        <Button
          title={"Back"}
          onClick={() => {
            this.props.onPrev();
          }}
          style={{
            float: "left",
            backgroundColor: "transparent",
            color: Colors.primary,
            border: "solid 1px " + Colors.primary,
          }}
          key={1}
          className="full-width-mobile"
        />
        <Button
          title={"Next"}
          onClick={() => {
            this.props.onNext();
          }}
          style={{
            float: "right",
            backgroundColor: Colors.primary,
            color: Colors.white,
          }}
          key={2}
          isLoading={this.props.isLoading}
          className="full-width-mobile mt-mobile-25"
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
