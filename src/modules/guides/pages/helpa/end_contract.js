import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors';
import VideoCard from 'modules/guides/videoCard'
import './helpa.css'
import Data from 'modules/guides/data'
class Stack extends Component {
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
                <p>You can view all your contracts on your “My Contracts'' page. Here are the following guidelines for Helpa to end a contract:</p>
                <ol type='1'>
                    <li>On your “My Contracts”, you can opt to end contracts whose status are:</li>
                    <ul>
                        <li><b className='b-helpa'>Active</b> - these are contracts that are currently ongoing, which can be ended in two possible ways. </li>
                        <p>One is to click the “View”  on the action column  of the job contract and you will be redirected to the “Contract Details” page where you can see three buttons at the upper right corner of the page. Click the “End” button, then an “End Contract” confirmation modal will pop up.</p>
                        <p>Meanwhile, the other way to end the contract with an active status  is to click the “End” on the action column  of the job contract and automatically an “End Contract” confirmation modal will pop up.</p>
                        <li><b className='b-helpa'>Pause</b> - these are contracts that are temporarily on-hold, which can be ended when you click the “View”  on the action column  of the job contract and you will be redirected to the “Contract Details” page where you can see three buttons at the upper right corner of the page. Click the “End” button, then an “End Contract” confirmation modal will pop up.</li>
                        <li><b className='b-helpa'>Dispute</b> - these are contracts that need to be disputed, which can be ended when you click the “View”  on the action column  of the job contract and you will be redirected to the “Contract Details” page where you can see three buttons at the upper right corner of the page. Click the “End” button, then an “End Contract” confirmation modal will pop up.</li>
                    </ul>
                    <li>When the “End Contract” confirmation modal will pop up, you will then ask if you are sure to end the contract. If you are sure and have read the general tips to terminate a contract, click the “I understand” button. You will then be prompted to provide the reason for ending the job and give feedback. Please be reminded that by ending the contract:</li>
                    <ul>
                        <li>Your funds held in the escrow account will be dealt with in accordance with the terms and conditions.</li>
                        <li>You can dispute the payment if you have a legitimate reason.</li>
                        <p>If you have understood the notice of this confirmation modal and authorize KeyHelpa, click the “End contract” button and the contract will be terminated. </p>
                        <p>Once you end the contract, the Agent will receive an email notification and a notification card on his/her  My Contracts' page.</p>
                    </ul>
                    <li>All terminated contracts can be seen on your “My Contracts” page End section. </li>
                    <li>You can still “Cancel” the contract you just have ended, if the Agent does not yet take action of the end contract notification he or she has received, where Agent can either Accept or Dispute the job contract. If the Agent confirms the termination of contract (by Accept button) , it means the contract and work has officially terminated and can no longer be resumed. Unless, if the Agent disputes the contract, that is another process.</li>
                    <p><b className='b-helpa'>Note</b>: If you cancel a job 3 times within a month, your profile will be blocked automatically.</p>
                </ol>
                <p>If you have any concerns or inquiries, please don’t hesitate to <a href='../contact_us'>contact us</a>. </p>
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
                    End of contract occurs when one of the parties of the contract ends the written agreement for various reasons. You, Helpa, also have the ability to end a contract on KeyHelpa any time. Though, it is important to confirm that all parties are aware and in agreement before a contract is terminated.
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stack));