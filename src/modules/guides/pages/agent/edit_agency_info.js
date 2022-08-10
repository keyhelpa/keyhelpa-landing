import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors';
import AgentVideoThumbnail from 'assets/agent-video-thumbnail.png'
import HelpaVideoThumbnail from 'assets/helpa-video-thumbnail.png'
import { PlayArrow, PlayCircleFilled } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
class EditAgency extends Component {
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
                <p>To edit your agency information, read the following instructions below:</p>
                <ol type='1'>
                    <li>On Agent’s web application, click your profile icon or photo then a dropdown menu will appear. Choose “Settings” and you will be taken to a new sidebar menu. Click the “Agency information” on your sidebar menu and you will be redirected to the “Agency information” page.</li>
                    <li>On your “Agency information” page, all of the information is automatically filled with data you have already entered during your registration and profile setup. These are the datas you can update and edit on your agency  info:</li>
                    <ul>
                        <li>Trading name (Agency name)</li>
                        <li>About the Agency (Description about the Agency including  products and services offered, mission, vision, and the likes)</li>
                        <li>Profile Photo  (this is your profile picture - the Agent)</li>
                    </ul>
                    <li>Once you have made changes or updates on your agency information, just click the “Save” button to save your changes.</li>
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
Agency information is vital data that needs to be up-to-date within KeyHelpa platform, so that Helpas who are searching for jobs will know the kind of business your Agency is offering. It will help them correlate their interest to your Agency and may find interest in submitting job proposals.                </p>


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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditAgency));