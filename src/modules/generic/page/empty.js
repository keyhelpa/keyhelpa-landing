import React from 'react';
import {BasicStyles} from 'common'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmile } from '@fortawesome/free-solid-svg-icons'
import Colors from 'common/Colors'
import Persons from 'assets/img/persons.png'
export default class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '500px'
      }}>
        <div style={{
          width: '100%',
        }}>
          <span style={{
            float: 'left',
            width: '100%',
            marginBottom: '50px'
          }}>
            <img
              src={Persons} 
              style={{
                width: 'auto',
                height: 200
              }}
            />
          </span>
          <h1 style={{
            color: Colors.textGray
          }}>{this.props.message}</h1>
        </div>
      </div>
    )
  }
}
