import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors';
import AgentVideoThumbnail from 'assets/agent-video-thumbnail.png'
import HelpaVideoThumbnail from 'assets/helpa-video-thumbnail.png'
import { PlayArrow, PlayCircleFilled } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
class DisputeContractAgent extends Component {
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
                <p>You can view all your contracts on your “My Contracts” page. Here are the following guidelines for Agent to dispute  a contract:</p>
                <ol type='1'>
                    <li>On your “My Contracts”, you can opt to dispute contracts whose status are:</li>
                    <ul>
                        <li><b>Active</b> - these are contracts that are currently ongoing, which can be disputed when you click the “View”  on the action column  of the candidate’s contract and you will be redirected to the “Contract Details” page where you can see three buttons at the upper right corner of the page. Click the “Dispute” button, then an  “Open dispute” confirmation modal will pop up.</li>
                        <li><b>Pause</b> - these are contracts that are temporarily on-hold, which can be disputed when you click the “View”  on the action column  of the candidate’s contract and you will be redirected to the “Contract Details” page where you can see three buttons at the upper right corner of the page. Click the “Dispute” button, then an  “Open dispute” confirmation modal will pop up.</li>
                        <p>You may not or may  “Resume” the contract before  you are going to open a dispute.</p>
                        <li><b>End</b> - these are contracts that are terminated. You can only open a dispute in this contract if the Helpa is not yet confirmed to accept the termination of this contract. </li>
                        <p>This unconfirmed end contract status can be disputed  when you click the “View”  on the action column  of the candidate’s contract and you will be redirected to the “Contract Details” page where you can see three buttons at the upper right corner of the page. Click the “Dispute” button, then an  “Open dispute” confirmation modal will pop up.</p>
                        <p>You may not or may  “Cancel” termination of contract before you are going to open a dispute.</p>
                    </ul>
                    <li>When the “Open dispute” confirmation modal will pop up, you will then ask if you are sure to open a dispute with the contract and you will be prompted to provide the reason for disputing the job and give feedback. If you have understood the notice of this confirmation modal and authorize KeyHelpa, click the “Open dispute” button and the contract will be disputed. </li>
                    <p>Once you open a dispute to the contract,, the Helpa will receive an email notification and a notification card on his/her  My Contracts' page.</p>
                    <li>All dispute contracts can be seen on your “My Contracts” page Dispute section. </li>
                    <li>
You can still “Cancel Dispute” the contract you just have disputed, if the Helpa does not yet take action of the dispute contract notification he or she has received, where Helpa can either Accept or Decline to open a dispute to the job contract. If Helpa confirms the dispute of contract (by Accept button) , it means the Agent and Helpa can  still settle their issues within KeyHelpa’s platform inline with the terms and conditions set by KeyHelpa. Unless, if Helpa declines to open  disputes with the contract, that is another process where the Agent can ask for consultation with KeyHelpa by sending them a message through the contact us form..</li>
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
                    Contract dispute may happen if there is a disagreement between Agent and Helpa concerning the job terms, payments or anything with the contract. Dispute contracts can be costly and time-consuming and may end up in court and damage to agencies connections and reputation if handled poorly.                </p>


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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DisputeContractAgent));