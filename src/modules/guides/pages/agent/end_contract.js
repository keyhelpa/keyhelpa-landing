import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors';
import AgentVideoThumbnail from 'assets/agent-video-thumbnail.png'
import HelpaVideoThumbnail from 'assets/helpa-video-thumbnail.png'
import { PlayArrow, PlayCircleFilled } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
class EndContractAgent extends Component {
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
                <p>You can view all your contracts on your “My Contracts” page. Here are the following guidelines for Agent to end a contract:</p>
                <ol type='1'>
                    <li>On your “My Contracts”, you can opt to end contracts whose status are:</li>
                    <ul>
                        <li><b>Active</b> - these are contracts that are currently ongoing, which can be ended in two possible ways. </li>
                        <p>One is to click the “View”  on the action column  of the candidate’s contract and you will be redirected to the “Contract Details” page where you can see three buttons at the upper right corner of the page. Click the “End” button, then an “End Contract” confirmation modal will pop up.</p>
                        <p>Meanwhile, the other way to end the contract with an active status  is to click the “End” on the action column  of the candidate’s contract and automatically an “End Contract” confirmation modal will pop up.</p>
                        <li><b>Pause</b> - these are contracts that are temporarily on-hold, which can be ended when you click the “View”  on the action column  of the candidate’s contract and you will be redirected to the “Contract Details” page where you can see three buttons at the upper right corner of the page. Click the “End” button, then an “End Contract” confirmation modal will pop up.</li>
                        <li><b>Dispute</b> - these are contracts that need to be disputed, which can be ended when you click the “View”  on the action column  of the candidate’s contract and you will be redirected to the “Contract Details” page where you can see three buttons at the upper right corner of the page. Click the “End” button, then an “End Contract” confirmation modal will pop up.</li>
                    </ul>
                    <li>When the “End Contract” confirmation modal will pop up, you will then ask if you are sure to end the contract. If you are sure and have read the general tips to terminate a contract, click the “I understand” button. You will then be prompted to provide the reason for ending the job and give feedback. Please be reminded that by ending the contract:</li>
                        <ul>
                            <li>Your funds held in the escrow account will be dealt with in accordance with the terms and conditions.</li>
                            <li>You can dispute the payment if you have a legitimate reason.</li>
                        </ul>
                        <p>If you have understood the notice of this confirmation modal and authorize KeyHelpa, click the “End contract” button and the contract will be terminated. </p>
                        <p>Once you end the contract,, the Helpa will receive an email notification and a notification card on his/her  My Contracts' page.</p>                    
                    <li>All terminated contracts can be seen on your “My Contracts” page End section. </li>
                    <li>You can still “Cancel” the contract you just have ended, if the Helpa does not yet take action of the end contract notification he or she has received, where Helpa can either Accept or Dispute the job contract. If Helpa confirms the termination of contract (by Accept button) , it means the contract and work has officially terminated and can no longer be resumed. Unless, if Helpa disputes the contract, that is another process.</li>
                    <p><b>Note</b>: When you are cancelling the job less than 48 hours before it starts, the fine for this action is 1 weekly payment. </p>
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
                End of contract occurs when one of the parties of the contract ends the written agreement for various reasons. You, Agent, who creates the contract through KeyHelpa and has it accepted by the Helpa, can end the contract of the job he/she has with the Helpa.
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EndContractAgent));