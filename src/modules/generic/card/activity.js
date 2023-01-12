import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faFileWord } from "@fortawesome/free-solid-svg-icons";
import Colors from "common/Colors";
export default class Folder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          height: 60,
          width: "100%",
          float: "left",
          borderBottom: "solid 1px " + Colors.gray,
          paddingTop: 10,
          paddingBottom: 10,
        }}
        className="folder-item"
      >
        <div
          style={{
            width: "10%",
            textAlign: "center",
            float: "left",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon icon={faUserCircle} size="3x" />
          </span>
        </div>

        <div
          style={{
            width: "90%",
            float: "left",
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <label
            style={{
              width: "100%",
              float: "left",
            }}
          >
            <b>{this.props.data.username}</b> {this.props.data.activity}
          </label>
          <span
            style={{
              width: "100%",
              float: "left",
            }}
          >
            <label
              style={{
                width: "70%",
                float: "left",
              }}
            >
              <FontAwesomeIcon icon={faFileWord} size="1x" />
              {this.props.data.file.name}
            </label>
            <label
              style={{
                width: "30%",
                float: "left",
                textAlign: "right",
              }}
            >
              <b>{this.props.data.date}</b>
            </label>
          </span>
        </div>
      </div>
    );
  }
}
