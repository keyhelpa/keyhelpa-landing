import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors';
import VideoCard from 'modules/guides/videoCard'
import './agent.css'
class PauseContractAgent extends Component {
    constructor(props) {
        super(props)
    }

    renderContent(){
        return(
            <div>
                <p>You can view all your contracts on your “My Contracts” page. Here are the following guidelines for Agent to pause a contract:</p>
                <ol type='1'>
                    <li>On your “My Contracts”, you can opt to pause contracts whose status are:</li>
                    <ul>
                        <li><b className='b-agent'>Active</b> - these are contracts that are currently ongoing, which can be paused when you click the “View”  on the action column  of the candidate’s contract and you will be redirected to the “Contract Details” page where you can see three buttons at the upper right corner of the page. Click the “Pause” button, then a “Pause Contract” confirmation modal will pop up.</li>
                        <li><b className='b-agent'>Dispute</b> - these are contracts that are disputed, which can be paused when you click the “View”  on the action column  of the candidate’s contract and you will be redirected to the “Contract Details” page where you can see three buttons at the upper right corner of the page. Click the “Pause” button, then a “Pause Contract” confirmation modal will pop up.</li>
                        <p>Please  “Cancel Dispute”  before  you are going to pause this contract.</p>
                        <li><b className='b-agent'>End</b> - these are contracts that are terminated. You can only pause this contract if the Helpa is not yet confirmed to accept the termination of this contract. </li>
                        <p>This unconfirmed end contract status can be paused when you click the “View”  on the action column  of the candidate’s contract and you will be redirected to the “Contract Details” page where you can see three buttons at the upper right corner of the page. Click the “Pause” button, then a “Pause Contract” confirmation modal will pop up.</p>
                        <p>Please “Cancel” termination of contract before you are going to pause this contract.</p>
                    </ul>
                    <li>When the “Pause Contract” confirmation modal will pop up, you will then ask if you are sure to pause the contract and you will be prompted to provide the reason for pausing the job and give feedback. Please be reminded that by pausing the contract:</li>
                    <ul>
                        <li>Your funds held in the escrow account will be dealt with in accordance with the terms and conditions.</li>
                        <li>You can dispute the payment if you have a legitimate reason.</li>
                        <p>If you have understood the notice of this confirmation modal and authorize KeyHelpa, click the “Pause contract” button and the contract will be paused or put to on-hold.. </p>
                        <p>Once you pause the contract,, the Helpa will receive an email notification and a notification card on his/her  My Contracts' page.</p>
                    </ul>
                    <li>All paused contracts can be seen on your “My Contracts” page Pause section. </li>
                    <li>You can restart or put to active the status of the contract by clicking the “Resume”  on the action column  of the candidate’s contract and it will then be transferred back to the Active contracts section.</li>
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
                    color: theme == 'agent' ? Colors.agentTextTitle : Colors.helpaTextTitle,
                    marginBottom: '5%'
                }}>
                As an Agent, you can pause contracts any time you  want to put work on hold. You may need to do this for many reasons. This pause prevents Helpa from rendering the time and effort on the job until you are ready to let them start again. In this cases, you must message your Helpa and explain why you have paused the contract and when you are planning to restart it.    
                </p>


                <VideoCard />
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PauseContractAgent));