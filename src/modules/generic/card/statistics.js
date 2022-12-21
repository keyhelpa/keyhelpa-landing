import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faFileWord } from '@fortawesome/free-solid-svg-icons'
import Colors from 'common/Colors'
export default class Folder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { data } = this.props;
    return (
      <div style={{
        minHeight: 100,
        width: '24%',
        float: 'left',
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        ...this.props.style,
        marginTop: 25,
        color: Colors.white
      }}
      >
          <h1 style={{
            textAlign: 'center',
            marginTop: 15
          }}>{data.title}</h1>

          <div style={{
            display: 'flex',
            width: '100%',
            marginTop: 25,
            alignItems: 'center'
          }}>
            <span style={{
              width: '20%',
              float: 'left',
              textAlign: 'center'
            }}>
              <FontAwesomeIcon icon={data.icon} size={"2x"}/>
            </span>
            <span style={{
              width: '80%',
              float: 'left'
            }}>{data.description}</span>
          </div>
      </div>
    )
  }
}
