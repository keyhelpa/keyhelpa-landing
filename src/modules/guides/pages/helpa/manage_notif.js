import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors';
import VideoCard from 'modules/guides/videoCard'
import './helpa.css'
import Data from 'modules/guides/data'
class ManageNotifHelpa extends Component {
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
                marginTop: "50%"
            }}>
                <p >On Helpa’s web application, click your profile icon or photo then a dropdown menu will
                appear. Choose “Settings” and you will be taken to a new sidebar menu. Click the
                “Notifications” on your sidebar menu and you will be redirected to the “Notifications” page.</p>
                <p>Helpa can set where to receive notifications either via Email, Push, or SMS. The notifications
                that a Helpa can received are categorized into two categories:</p>
                <ol type='1'>
                    <li><b className='b-helpa'>Messages</b> - these are notifications that can be received by Helpa that are outside
                    contracts or non-contract related such as:</li>
                    <ul>
                        <li>A job invitation is received</li>
                        <li>An interview is initiated</li>
                        <li>An interview invitation is withdrawn</li>
                        <li>A job I applied for has been closed</li>
                        <li>An offer is rejected</li>
                        <li>An offer is accepted</li>
                    </ul>
                    <li><b className='b-helpa'>Contracts</b> - these are notifications that can be received by Helpa are contract-
                    related such as:</li>
                    <ul>
                        <li>You are hired</li>
                        <li>A contract ends</li>
                        <li>Feedback received</li>
                        <li>Payment processed</li>
                        <li>Communications from KeyHelpa</li>
                        <li>Other contract-related messages</li>
                    </ul>
                </ol>
                <p>If you have any concerns or inquiries, please don’t hesitate to <a href='#'>contact us</a>. </p>
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
                    marginBottom: "25px"
                }}>
                    A notification email relays an important message to both Helpa and Agent. It is important
                    for them to get notified what has been going on with their jobs, contracts, and any activities
                    they do in KeyHelpa.
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ManageNotifHelpa));