import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors';
import AgentVideoThumbnail from 'assets/agent-video-thumbnail.png'
import HelpaVideoThumbnail from 'assets/helpa-video-thumbnail.png'
import { PlayArrow, PlayCircleFilled } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
class CreateAccountAgent extends Component {
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
            <div style={{
                marginTop: 100
            }}>
                <p>Follow the steps below to register as Agent in KeyHelpa:</p>
                <ol type='1'>
                    <li>Go to the Agent Sign Up Page (Click <a href='#'>here</a>).</li>
                    <li>Start registering your credentials such as:</li>
                    <ol type='a'>
                        <li>First Name</li>
                        <li>Last Name</li>
                        <li>Trading Name</li>
                        <li>Postcode</li>
                        <li>Username - Username requires at least 8 characters.</li>
                        <li>Email Address - A valid and existing address.</li>
                        <li>Password - Password requires at least 8 characters.</li>
                        <li>Confirm Password - Should match the previous password field.</li>
                    </ol>
                    <p>***All fields are mandatory.</p>
                    <li>Once providing all details, click the “Create Account” button. That’s it! You have successfully created your account and you will be redirected to your dashboard for <a href='#'>profile setup</a>.</li>
                    <li>You may also sign up by linking your social media account such as Facebook, Google and Linkedin.</li>              
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
                    Are you looking for Freelancers to work on your real estate business? Get started  with KeyHelpa and hire Helpa when you need help by creating an account.
                </p>
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateAccountAgent));