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
                <p>To apply for a job that matches you skills, experience and interest,  read the following instructions below:</p>
                <ol type='1'>
                    <li>Go to your “Find work” page, where you can see all the job hiring that all Agents from KeyHelpa has posted. </li>
                    <li>On your “Find work” page, you can check the details of the job by clicking on the “View job” button on the card of the job that catches your interest and you will be redirected to the “Job details” page of the job post you selected.  </li>
                    <li>On the “Job details” page, read the full details of the job and if you think that you are fit for the job then click on the “Submit proposal” button on the upper right corner of the page and then  a “Submit proposal” modal will pop up.</li>
                    <li>On the “Submit proposal'' modal, you will need to provide your proposed hourly rate and a message which is in less than 150 words to tell the hiring agent why you’re the perfect fit for the job. Before you submit the proposal, please read to understand and acknowledge the following:</li>
                    <ul>
                        <li>You understand and agree to KeyHelpa's Terms of Conditions, including the Privacy Policy.</li>
                        <li>You understand that you will be charged by KeyHelpa Pty Ltd an 11% service fee on all earned money for the lifetime of this job.</li>
                        <li>You acknowledge that the work you, Helpa, or any entity you control, undertake is done so as a Personal Services Business. More specifically, no more than 80% of the annual revenue derives from less than 20% of the clients/customers for whom the work is performed. To the extent you have any doubt about this position you have confirmed it via appropriate, independent, advice.</li>
                        <p>If you have read, understood and acknowledged the foregoing, click the “Submit proposal” button to successfully send your proposal to the Agent. </p>
                    </ul>
                </ol>
                <p>Meanwhile,  there are opportunities when you  don’t have to hunt for a freelance job because the Agent will hunt you by inviting you to send a job proposal via job invitation. You will receive a job invitation via email notification which will eventually lead you to view the job invitation details or you may check on your “My proposals” page under <b className='b-helpa'>Pending</b> Invite Section, just click the “View” on the action column to view the job invitation details page. On the “Job details'' page, read the full details of the job and if you think that you are fit for the job and want to accept job invitation,  then click on the “Accept Invite” button on the upper right corner of the page and then  a “Submit proposal” modal will pop up. Then, follow step 4 from the instructions above.</p>
                <p>All submitted job proposals can be seen on your “My proposals” page. Job proposals sent via job invitation can be found in the <b className='b-helpa'>Accepted</b> Invites Section while those proposals that have been sent not via job invitation can found in the <b className='b-helpa'>Pending</b> Proposals Section.</p>
                <p>Every time you send a job proposal to an Agent, either via job invitation or not, the agent will receive an email notification. But it does not give you, Helpa, the assurance that your job proposal will be accepted. If your job proposal will be accepted by an Agent, you will receive an email notification for a job interview invitation. When the job interview is successful, that is the time when the Agent decides to hire or offer you the position or not. </p>
                <p>If you have any concerns or inquiries, please don’t hesitate to <a href='#'>contact us</a>. </p>
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
                    How is your job hunting going on? Do you find interest in applying among the jobs you have searched? Let the Agent know your interest by sending them a job proposal.
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