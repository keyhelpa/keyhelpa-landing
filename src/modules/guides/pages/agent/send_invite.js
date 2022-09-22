import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors';
import './agent.css'
import Data from 'modules/guides/data'
import VideoCard from 'modules/guides/videoCard'
import Config from "common/Config";
class SendInvite extends Component {
    constructor(props) {
        super(props)
        this.state={
            data: Data.agent,
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
    renderContent() {
        return (
            <div style={{
                marginTop: 30
            }}>
                <p>To invite a candidate to view your job post just simply do the following:</p>
                <ol type='1'>
                    <li>On your Candidates page, click on the “View candidate” button on the card of the candidate you are interested in inviting  and you will be redirected to the Candidate details page.</li>
                    <li>On the Candidate details page, click the “Invite” button and a “Send Invite” modal will pop up where you can select which job you would like this candidate to be invited to and also you can add a message to Helpa. </li>
                    <p>Once you are done selecting the job and adding your message to Helpa, you can click the “Send” button to finally send the invitation.</p>
                    <li>By sending a job invitation to Helpa, the Helpa will receive an email notification and will create a thread message on your app Messages' page.</li>
                </ol>
                <p>If you have any concerns or inquiries, please don’t hesitate to <a href="../contact_us">contact us</a>. </p>
            </div>
        )
    }

    render() {
        const {url} = this.state;
        const { theme } = this.props;
        return (
            <div style={{
                width: '100%',
                float: 'left'
            }}>
                <p style={{
                    color: theme == 'agent' ? Colors.agentTextTitle : Colors.helpaTextTitle,
                    marginBottom: '5%'
                }}>
                    Have you searched for Helpa and find them applicable to the job you are hiring? Don’t hesitate to send them a job invitation now so that they can be notified and will check on your job post.
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SendInvite));