import React from 'react';
import {BasicStyles} from 'common'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDotCircle, faCircle } from '@fortawesome/free-solid-svg-icons'
import Colors from 'common/Colors'
import { SvgIcon } from '@mui/material';
import { Adjust, RadioButtonCheckedOutlined, RadioButtonUncheckedOutlined } from '@mui/icons-material';
export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props; 
    const { active } = this.props;
    return (
      <div style={{
        width: '100%',
        float: 'left'
      }}>
        {
          data.map((item) => (
            <div style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px'
            }}
            className="primary-hover"
            onClick={() => {
              this.props.onChange(item)
            }}
            >
              <SvgIcon component={active && active.title == item.title ? RadioButtonCheckedOutlined : RadioButtonUncheckedOutlined} style={{
                fontSize: BasicStyles.iconSize,
                color: active && active.title == item.title ? Colors.primary : Colors.iconColor
              }} />
              
              <span style={{
                paddingLeft: '10px',
                color: Colors.textGray
              }}>{item.title}</span>
            </div>
          ))
        }
      </div>
    )
  }
}
