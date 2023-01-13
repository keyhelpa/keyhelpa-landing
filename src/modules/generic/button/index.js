import React from "react";
import { BasicStyles } from "common";
export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <button
        style={{ ...BasicStyles.btn, ...this.props.style }}
        onClick={(e) => this.props.onChange(e.value)}
      >
        {this.props.title}
      </button>
    );
  }
}
