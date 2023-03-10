import React from "react";
import Colors from "common/Colors";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { faFileWord } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class File extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          borderRadius: 5,
          height: 50,
          width: 200,
          float: "left",
          border: "solid 1px " + Colors.textGray,
          marginRight: "1%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          alignContent: "center",
          paddingLeft: 5,
          paddingRight: 5,
        }}
        className="cursor-hover"
        title={this.props.data.name}
      >
        <span
          style={{
            float: "left",
            marginRight: 5,
          }}
        >
          <FontAwesomeIcon icon={faFileWord} size="2x" />
        </span>
        <div
          style={{
            width: "100%",
            float: "left",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <span>{this.props.data.name}</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(File));
