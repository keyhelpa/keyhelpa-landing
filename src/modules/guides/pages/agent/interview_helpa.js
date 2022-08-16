import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors';
import VideoCard from 'modules/guides/videoCard'
class InterviewHelpa extends Component {
    constructor(props) {
        super(props)
    }

    renderContent() {
        return (
            <div>
                <p>After you have clicked on the “Interview” button in  the View Proposal page, an Interview modal will pop-up where you need to fill up the following field:</p>
                <ul >
                    <li><b className='b-agent'>Job</b> - this is not editable since it is retrieved from the job the Helpa has sent a proposal.</li>
                    <li><b className='b-agent'>Message to candidate</b> - send the Helpa a message of the full instructions of this job interview including the link of the medium you will use for discussion either audio call or video call.</li>
                    <li><b className='b-agent'>Interview Date</b> - set the date when you will conduct the interview.</li>
                    <li><b className='b-agent'>Interview Time</b> - set the time when you will conduct the interview.</li>
                </ul>
                <p>Once you have filled out all the interview details, click the “Send” button to successfully invite the Helpa to an interview.</p>
                <p>Every time you send an invitation to an interview, the Helpa will receive an email notification and the schedule of the interview will be added to the calendar of Helpa and you, the Agent.</p>
                <p><b>NOTE</b>: Please take note that when conducting an interview with candidates or Helpas don’t forget to update the status of the interview.</p>
                <p>On your “My proposals” page, you can see the “Interviews” section which is found at the bottom of the page. There are 3 types of interview which are the following:</p>
                <ol type='1'>
                    <li><b className='b-agent'>Upcoming</b> - these are literally the upcoming interviews, the actions you can make with the candidates in this section are:</li>
                    <ol type='a'>
                        <li>View - to view the interview details of the candidates such as time and date (by viewing the interview details, you may also resend or update the details such as interview date and time if you want to reschedule the Helpa’s interview).</li>
                        <li>Done - when the interview is actually done, you need to make sure that you click it “Done” to mark the interview is successful but does not assure that the candidate will be hired.</li>
                        <li>Archive - you must click the “Archive” action if the interview is not successful ( e.g., the candidate does not attend the interview or other reason)</li>
                    </ol>
                    <li><b className='b-agent'>Successful</b> - these are successful interviews or shall we say those candidates who have actually attended and finished the interview but are not assured to be hired, the actions you make here as an Agent is very important such as:</li>
                    <ol type='a'>
                        <li>View - to view the candidate details including the job terms and proposal, this is where the Agent can take action such as to reject the candidate or to hire the candidate. Click here to hire helpa.</li>
                        <li>Remove - this action will delete the candidate details or row from the table of successful interviews.</li>
                    </ol>
                    <li><b className='b-agent'>Unsuccessful</b> - these are candidates who did not show off during the schedule of the interview, the actions you can make in this section are:</li>
                    <ol type='a'>
                        <li>View - to view the interview details and can no longer update or resend as it is already marked as unsuccessful.</li>
                        <li>Remove - this action will delete the candidate details or row from the table of unsuccessful interviews.</li>
                    </ol>
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
                    Did you just accept a Helpa’s job proposal? It means you are inviting them over to an interview by sending them a message and schedule.                </p>

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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(InterviewHelpa));