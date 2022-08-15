import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors';
import VideoCard from 'modules/guides/videoCard'
class HireHelpa extends Component {
    constructor(props) {
        super(props)
    }

    renderContent() {
        return (
            <div>
                <p>Go to your “Successful” Interviews section which can be found on your “My proposals” page. Click on the “View” action of the candidate you want to hire, and you will be redirected to a page where you can view the candidate details including the job terms and proposal. On this page you can see the “Reject” and “Hire” button.</p>
                <p>To hire the candidate, you just need to click on the “Hire” button and you will be redirected to creating a contract or the final job offer and sending the job offer. Click here to know more about creating a contract.</p>
                <p>Once you have sent the job offer or contract, it means you have hired the candidate for the job but please take note that it needs to be accepted by the Helpa to actually start the job or else the Helpa may reject it.</p>
                <p>Every time you send a job offer contract to the Helpa, they will receive an email notification that they are hired for the job and that you have sent them a job offer contract. In return, you will also receive an email notification if the Helpa accepts or rejects the job offer.</p>
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
                    Are you done with interviewing a Helpa? Have they met your expectations? Are you thinking of letting Helpa do the work on your project? If your answer to these questions is yes, then you have to hire Helpa now!
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HireHelpa));