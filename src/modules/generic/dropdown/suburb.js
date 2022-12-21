import React from 'react';
import {BasicStyles, Helper} from 'common'
import States from 'modules/generic/helper/states'
export default class SelectInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }

  async componentDidMount(){
    const { state, region } = this.props;
    const data = await States.getSuburb(state, region)
    this.setState({
      data
    })

    if (data && data.length > 0) {
      this.props.onChange(data[0])
    }
  }

  render(){
    const { data } = this.state;
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
          <select
            style={{
              ...BasicStyles.formControl,
              backgroundColor: 'transparent',
              ...this.props.selectStyle,
            }}
            value={this.props.value}
            onChange={(e) => {
              if(this.props.type && this.props.type == 'element'){
                for (let index = 0; index < data.length; index++) {
                  const element = data[index];
                  if(element.suburb == e.target.value){
                    this.props.onChange(element)
                    break
                  }
                }
              }else{
                this.props.onChange(e.target.value)
              }
            }}
            
            >
            {
              data && data.length > 0 && data.map(item => (
                <option value={item.suburb}>{item.suburb}</option>
              ))
            }
          </select>
        </div>
      </div>
    )
  }
}