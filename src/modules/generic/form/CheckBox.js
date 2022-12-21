import React from 'react';
import {BasicStyles} from 'common'
import Colors from 'common/Colors'
import { SvgIcon } from '@mui/material';
import { CheckBoxOutlineBlankOutlined, CheckBox, CheckBoxRounded} from '@mui/icons-material';
import { CheckBoxOutlineBlankRounded } from '@material-ui/icons';
export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  checkIfExist(param){
    const { selected } = this.props;
    if(selected == null) return false
    for (var i = 0; i < selected.length; i++) {
      let item = selected[i]
      if(item.title !== undefined ? item.title == param.title : item.name == param.name){
        return true
      }
    }
    return false
  }

  addItem(param){
    const { selected } = this.props;
    if(this.checkIfExist(param)){
      let newSelected = selected.filter((item) => {
        if(item.title !== undefined){
          return item.title != param.title
        }else{
          return item.name != param.name
        }
      })
      // this.setState({
      //   selected: newSelected
      // })
      this.props.onChange(newSelected)
    }else{
      let newSelected = selected ? selected : []
      newSelected.push(param)
      // this.setState({
      //   selected: newSelected
      // })
      this.props.onChange(newSelected)
    }
  }

  render() {
    const { data } = this.props; 
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
              textAlign: 'left',
              marginBottom: '10px',
              alignItems: this.props.align ? 'center' : 'unset'
            }}
            className={"primary-hover" + this.props.className ? this.props.className : ''}
            onClick={() => {
              this.addItem(item)
            }}
            >
              <SvgIcon component={this.checkIfExist(item) ?  CheckBoxRounded : CheckBoxOutlineBlankRounded} style={{
                fontSize: BasicStyles.iconSize,
                color: this.checkIfExist(item) ? Colors.primary : Colors.iconColor
              }} />
              {
                item.component && (
                  <span style={{
                    textAlign: 'left',
                    color: Colors.textGray
                  }} className="cursor-hover">{item.component()}</span>
                )
              }
              {
                !item.component && (
                  <span style={{
                    textAlign: 'left',
                    marginLeft: '3%',
                    color: Colors.textGray,
                    fontWeight: this.props._color ? 'bold' : ''
                  }} className="cursor-hover">{item.title !== undefined ? item.title : item.name}</span>
                )
              }
             
            </div>
          ))
        }
      </div>
    )
  }
}
