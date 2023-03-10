import React from "react";
import { BasicStyles } from "common";
import Colors from "common/Colors";
import { ResponsivePie } from "@nivo/pie";
const data = [
  {
    id: "java",
    label: "java",
    value: 301,
    color: Colors.primary,
  },
  {
    id: "ruby",
    label: "ruby",
    value: 288,
    color: Colors.secondary,
  },
];
export default class Stack extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        style={{
          width: "100%",
        }}
      >
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={Colors.primary}
        />
      </div>
    );
  }
}
