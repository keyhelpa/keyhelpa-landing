import React from "react";
import { BasicStyles, Helper } from "common";
import States from "modules/generic/helper/states";
export default class SelectInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  async componentDidMount() {
    const { state } = this.props;
    const data = await States.getRegions(state);
    this.setState({
      data,
    });

    if (data && data.length > 0) {
      this.props.onChange(data[0]);
    }
  }

  render() {
    const { data } = this.state;
    return (
      <div
        style={{
          ...this.props.style,
        }}
        className={this.props.className ? this.props.className : null}
      >
        <div
          style={{
            ...BasicStyles.formControlContainer,
          }}
        >
          <select
            style={{
              ...BasicStyles.formControl,
              backgroundColor: "transparent",
              ...this.props.selectStyle,
            }}
            value={this.props.value}
            onChange={(e) => {
              this.props.onChange(e.target.value);
            }}
          >
            {data &&
              data.length > 0 &&
              data.map((item) => <option value={item}>{item}</option>)}
          </select>
        </div>
      </div>
    );
  }
}
