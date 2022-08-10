import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors';
import AgentVideoThumbnail from 'assets/agent-video-thumbnail.png'
import HelpaVideoThumbnail from 'assets/helpa-video-thumbnail.png'
import { PlayArrow, PlayCircleFilled } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
class EditBasicAgent extends Component {
    constructor(props) {
        super(props)
    }
    
    renderVideo() {
        const { theme } = this.props;

        return (
            <div style={{
                width: '100%',
                float: 'left',
                height: 500,
                backgroundImage: `url(${theme == 'agent' ? AgentVideoThumbnail : HelpaVideoThumbnail})`,
                alignItems: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% auto',
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center'
            }}
                className="active-color-hover full-width-mobile video-player-holder"
            >
                <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50px',
                    float: 'left',
                    background: theme == 'agent' ? Colors.agentGray : Colors.helpaPink,
                    alignItems: 'center',
                    alignContent: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                }}
                >
                    <SvgIcon
                        component={PlayArrow}
                        style={{
                            color: Colors.white,
                            fontSize: 60
                        }}
                    />
                </div>
            </div>
        )
    }
    renderContent(){
        return(
            <div>
                <p>To edit your basic information, read the following instructions below:</p>
                <ol type='1'>
                    <li>On Agent’s web application, click your profile icon or photo then a dropdown menu will appear. Choose “Settings” and you will be taken to a new sidebar menu with a default dashboard of the “Basic information” page.</li>
                    <li>On your “Basic information” page, most of the information is automatically filled with data you have already entered during your registration and profile setup. These are the datas you can update and edit on your basic info:</li>
                    <ul>
                        <li>First name</li>
                        <li>Last name</li>
                        <li>Position (refers to your position on your Agency)</li>
                        <li>Email Address</li>
                        <li>Mobile number</li>
                        <li>ACN/ABN (Australian Company Number/Australian Business Number)</li>
                        <li>Suburb</li>
                        <li>Address (specific address - i.e., building name, street,etc.)</li>
                        <li>State</li>
                        <li>Postcode</li>
                        <li>Region</li>
                        <li>Area</li>
                    </ul>
                    <li>Once you have made changes or updates on your basic information, just click the “Save” button to save your changes.</li>
                </ol>
                <p>If you have any concerns or inquiries, please don’t hesitate to <a href='#'>contact us</a>. </p>
            </div>
        )
    }

    render() {
        const { theme } = this.props;
        return (
            <div style={{
                width: '100%',
                float: 'left'
            }}>
                <p style={{
                    color: theme == 'agent' ? Colors.agentTextTitle : Colors.helpaTextTitle
                }}>
Basic information is vital data that needs to be up-to-date within KeyHelpa platform, not just for the systems identity verification but also important to Helpa who are looking for Agents with good credibility and fit to their choice of work location.                 </p>


                {
                    this.renderVideo()
                }
                {
                    this.renderContent()
                }
            </div>
        )
    }
}
const mapStateToProps = (state) => ({ state: state });
const mapDispatchToProps = (dispatch) => {
    const { actions } = require('reduxhandler');
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditBasicAgent));