import React from 'react';
import { BasicStyles, Helper } from 'common'
import States from 'modules/generic/helper/states'
export default class SelectInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      states: null,
      selected: null
    }
  }

  async componentDidMount() {
    const states = await States.getStates()
    this.setState({
      states: states
    })
    if (states && states.length > 0) {
      this.props.onChange(states[0])
    }
  }

  render() {
    const { states } = this.state;

    return (
      <div
        style={{
          ...this.props.style
        }}
        className={this.props.className ? this.props.className : null}
      >
        <div style={{
          ...BasicStyles.formControlContainer
        }}>
          {
            states && (
              <select
                style={{
                  ...BasicStyles.formControl,
                  backgroundColor: 'transparent',
                  ...this.props.selectStyle
                }}
                value={this.props.value}
                onChange={(e) => {
                  this.props.onChange(e.target.value)
                }}

              >
                {
                  states && states.length > 0 && states.map(item => (
                    <option value={item} selected={this.props.value == item}>{item}</option>
                  ))
                }
              </select>
            )
          }

        </div>
      </div>
    )
  }
}