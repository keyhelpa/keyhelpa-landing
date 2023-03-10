import React from "react";
import Colors from "common/Colors";
import { SvgIcon } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import { BasicStyles } from "common";
const array = [0, 1, 2, 3, 4];
export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { value } = this.props;
    return (
      <div
        style={{
          width: "100%",
          float: "left",
        }}
      >
        {array.map((i, index) => (
          <SvgIcon
            key={index}
            component={i < value ? Star : StarBorder}
            style={{
              fontSize: BasicStyles.largeIcon,
              color: Colors.primary,
            }}
          />
        ))}
      </div>
    );
  }
}
