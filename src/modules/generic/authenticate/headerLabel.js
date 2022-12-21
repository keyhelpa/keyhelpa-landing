import React from 'react';
import Helper from 'common/Helper';
import Colors from 'common/Colors';
export default class HeaderLabel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <span style={{
            width: '100%',
            textAlign: 'center',
            float: 'left',
            paddingTop: 50
        }}>
            <h1 style={{
                color: Colors.gray,
            }}>{this.props.title}</h1>

            <p style={{
              paddingBottom: this.props.pad ? 0 : 20
            }}
            className="padding-lr-75 padding-unset"
            ><b style={{color: this.props._color ? Colors.lightestText : ''}}>{this.props.description}</b></p>
          </span>
    )
  }
}
