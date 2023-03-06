import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Colors from "common/Colors";
import Config from "common/Config";
import { SvgIcon } from "@mui/material";
import { PersonOutline } from "@mui/icons-material";

const { REACT_APP_API_URL } = process.env;
export default class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getUrl(url) {
    if (url && url.includes("storage/")) {
      return REACT_APP_API_URL + url;
    }
    return url;
  }

  render() {
    const { data, size } = this.props;
    return (
      <div
        style={{
          backgroundColor: Colors.headerGray,
          height: size,
          width: size,
          borderRadius: size / 2,
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        {(data === null || data === undefined) && (
          <SvgIcon
            component={PersonOutline}
            style={{
              color: Colors.white,
              fontSize: size,
              borderRadius: size / 2,
              border: "solid 2px " + Colors.headerProfileBorder,
            }}
          />
        )}
        {data && data.url && (
          <img
            src={this.getUrl(data.url)}
            style={{
              height: size,
              width: size,
              borderRadius: size / 2,
              border: "solid 2px " + Colors.headerProfileBorder,
            }}
          />
        )}
        {data && (data.url === undefined || data.url === null) && (
          <img
            src={this.getUrl(data.url)}
            style={{
              height: size,
              width: size,
              borderRadius: size / 2,
              border: "solid 2px " + Colors.headerProfileBorder,
            }}
          />
        )}
      </div>
    );
  }
}
