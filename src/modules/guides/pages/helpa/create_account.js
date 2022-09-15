import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors';
import AgentVideoThumbnail from 'assets/agent-video-thumbnail.png'
import HelpaVideoThumbnail from 'assets/helpa-video-thumbnail.png'
import { PlayArrow, PlayCircleFilled } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
import VideoCard from 'modules/guides/videoCard'
import './helpa.css'
import Data from 'modules/guides/data'
import Config from 'common/Config';
class CreateAccountHelpa extends Component {
    constructor(props) {
        super(props)
        this.state={
            data: Data.helpa,
            url: null
        }
    }
    componentDidMount() {
        this.handleLoad()
    }
    handleLoad(){
        const {data} = this.state;
        return(
            <div>
                {
                    data.map((item)=> {
                        if(this.props.history.location.pathname ===  item.route){
                            this.setState({
                                url: item.url
                            })
                        }
                    })
                }
            </div>
        )
    }
    renderContent(){
        return(
            <div style={{
                marginTop: 30
            }}>
                <p>Follow the steps below to register as Helpa (Freelancer) in KeyHelpa:</p>
                <ol type='1'>
                    <li>Go to the Helpa Sign Up Page (Click <a href={Config.HELPA + 'signup'}>here</a>).</li>
                    <li>Start registering your credentials such as:</li>
                        <ul>
                            <li>First Name</li>
                            <li>Last Name</li>
                            <li>Trading Name</li>
                            <li>Postcode</li>
                            <li>Username - Username requires at least 8 characters.</li>
                            <li>Email Address - Valid and existing email address.</li>
                            <li>Password - Password requires at least 8 characters.</li>
                            <li>Confirm Password - Should match the password.</li>
                            <p>	***All fields are mandatory.</p>
                        </ul>
                    <li>Once providing all details, click the “Create Account” button. That’s it! You have successfully created your account and you will be redirected to your dashboard for <a href="#">profile setup</a> .</li>
                    <li>You may also sign up by linking your social media account such as Facebook, Google and Linkedin.</li>
                </ol>
                <p>If you have any concerns or inquiries, please don’t hesitate to <a href='../contact'>contact us</a>. </p>
            </div>
        )
    }

    render() {
        const { theme } = this.props;
        const {url} = this.state;
        return (
            <div style={{
                width: '100%',
                float: 'left'
            }}>
                <p style={{
                    color: theme == 'agent' ? Colors.agentTextTitle : Colors.helpaTextTitle,
                    marginBottom: '5%'
                }}>
                    Are you into the Real Estate Industry? If yes, get any freelance jobs you want with us.Get started  with KeyHelpa and be your own boss, get paid securely!
                </p>

                <VideoCard 
                url={url}/>

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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateAccountHelpa));