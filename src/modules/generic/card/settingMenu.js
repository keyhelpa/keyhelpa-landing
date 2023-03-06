import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Colors from "common/Colors";
export default class SettingMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          borderRadius: 5,
          minHeight: 60,
          minWidth: "100%",
          overflowY: "hidden",
          alignItems: "center",
          display: "flex",
          float: "left",
          borderWidth: 0.5,
          borderColor: Colors.gray,
          borderStyle: "solid",
          marginBottom: 20,
          padding: 20,
        }}
        onClick={() => {
          this.props.onClick(this.props.data);
        }}
        className="folder-item"
      >
        <div
          style={{
            width: "90%",
            float: "left",
          }}
        >
          <label
            style={{
              fontWeight: "bold",
            }}
          >
            {this.props.data.title}
          </label>
          <p
            style={{
              color: Colors.gray,
            }}
          >
            {this.props.data.description}
          </p>
        </div>
        <span
          style={{
            width: "10%",
            float: "left",
            textAlign: "right",
          }}
        >
          <FontAwesomeIcon icon={faChevronRight} size="2x" />
        </span>
      </div>
    );
  }
}
