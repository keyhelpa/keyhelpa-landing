import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons'
import Colors from 'common/Colors'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import CircularProgress from '@mui/material/CircularProgress';
export default class SettingMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div style={{
                borderRadius: 25,
                minWidth: '100%',
                overflowY: 'hidden',
                alignItems: 'center',
                display: 'flex',
                float: 'left',
                borderWidth: 0.5,
                borderStyle: 'solid',
                marginBottom: 20,
                padding: 20,
                backgroundColor: Colors.activeGray,
                borderColor: Colors.activeGray
            }}
            >
                <div style={{
                    width: '85%',
                    float: 'left',
                    paddingLeft: 10
                }}>
                    <label style={{
                        fontWeight: 'bold'
                    }}>{this.props.data.title}</label>
                    {
                        this.props.data.icon &&
                        <FontAwesomeIcon icon={faQuestionCircle} size="2x" style={{ color: 'lightGray' }} />
                    }
                    <p style={{
                        color: Colors.gray
                    }}>{this.props.data.description}</p>
                </div>
                <span style={{
                    width: '15%',
                    float: 'left',
                    textAlign: 'right',
                    color: Colors.primary,
                    paddingRight: 10
                }}
                    className="href-link"
                >
                    {
                        this.props.loading !== undefined ? (
                            <div>
                                {
                                    this.props.loading && (
                                        <CircularProgress color="inherit" />
                                    )
                                }
                                {
                                    !this.props.loading && (
                                        <FontAwesomeIcon icon={this.props.data.flag ? faToggleOn : faToggleOff} size="3x"
                                            onClick={() => {
                                                this.props.onClick(this.props.data)
                                            }} />
                                    )
                                }
                            </div>
                        ) : (
                            <FontAwesomeIcon icon={this.props.data.flag ? faToggleOn : faToggleOff} size="3x"
                                onClick={() => {
                                    this.props.onClick(this.props.data)
                                }} />
                        )
                    }
                </span>
            </div>
        )
    }
}
