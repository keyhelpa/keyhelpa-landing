import React from 'react';
import { BasicStyles } from 'common'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import Colors from 'common/Colors'
import ReactTooltip from "react-tooltip";
import { SvgIcon } from '@mui/material';
import { Help } from '@mui/icons-material';
export default class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, enabled, color, message, icon } = this.props;
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius: '20px',
        backgroundColor: Colors.activeGray,
        paddingTop: '20px',
        paddingBottom: '20px',
        fontWeight: 'bold',
        color: Colors.gray,
        paddingLeft: 20,
        paddingRight: 20,
        ...this.props.style
      }}
        className="cursor-hover"
        onClick={() => {
          this.props.onChange(!enabled)
        }}
      >

        <span style={{
          fontWeight: 600
        }}><b>{title}</b>
          {
            icon && (
              <span
                className="full-width-mobile unset-flex-mobile mt-mobile-15 no-padding-mobile"
                data-tip={message}>
                <ReactTooltip place="top" type="light" effect="solid" multiline={true} />
                <SvgIcon
                  style={{
                    fontSize: BasicStyles.largeIcon,
                    color: Colors.gray,
                    paddingRight: 5,
                    marginLeft: 10
                  }}
                  component={Help}
                  className="href-link"
                />
              </span>
            )
          }
        </span>
        <FontAwesomeIcon icon={enabled ? faChevronUp : faChevronDown} color={color} size={"2x"} />
      </div>
    )
  }
}
