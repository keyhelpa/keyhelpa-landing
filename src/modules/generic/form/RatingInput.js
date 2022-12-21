import React from 'react';
import Colors from 'common/Colors'
import { SvgIcon } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import { BasicStyles } from 'common';
const array = [0, 1, 2, 3, 4]
export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
  }

  render() {
    const { value } = this.state;
    return (
      <div style={{
        width: '100%',
        float: 'left',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        {
          array.map((i, index) => (
            <SvgIcon
              component={i < value ? Star : StarBorder} 
              className="cursor-hover"
              onClick={() => {
                this.setState({
                  value: (index + 1)
                })
                this.props.onChange((index + 1))
              }}
              style={{
                fontSize: BasicStyles.largeIcon + 20,
                color: i < value ? Colors.primary : Colors.gray
              }}
             />
          ))
        }
      </div>
    )
  }
}
