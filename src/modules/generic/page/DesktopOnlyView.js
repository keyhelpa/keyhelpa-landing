import React from 'react';
import Colors from 'common/Colors'
import BreadCrumbs from "../breadcrumbs"
import Style from './Style'
import Button from 'components/increment/generic/form/Button'
import Group from 'assets/img/group_agent.png'

export default class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div
      style={{
        float: 'left',
        width: '100%'
      }}
      className="hide-on-desktop"
      >
        <div style={{
          float: 'left',
          width: '70%',
          marginTop: 40,
          textAlign: 'center'
        }}
          className='full-width-mobile'
        >
          <h3 style={{
            marginTop: '3%',
            color: Colors.lighterText
          }}>You need to view this section on desktop or widescreen devices. Thank you
          </h3>
        </div>
      </div>
    )
  }
}
