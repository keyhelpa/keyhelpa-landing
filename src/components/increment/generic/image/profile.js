import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Colors from "common/Colors";
import Config from "config";
export default class Folder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data, size } = this.props;
    return (
      <div
        style={{
          backgroundColor: Colors.primary,
          height: size,
          width: size,
          borderRadius: size / 2,
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        {data && data.url && data.url != "default" && (
          <img
            src={Config.API_URL + data.url}
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
            }}
          />
        )}
        {(data == null ||
          (data && (data.url == null || data.url == "default"))) && (
          <FontAwesomeIcon
            icon={faUserCircle}
            size={this.props.iconSize ? this.props.iconSize : "10x"}
            color={Colors.white}
          />
        )}
      </div>
    );
  }
}
