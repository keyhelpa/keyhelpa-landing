import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors';
import VideoCard from 'modules/guides/videoCard'
class JobPosting extends Component {
    constructor(props) {
        super(props)
    }

    renderContent() {
        return (
            <div>
                <p>To create you job posting, read the following instructions to know:</p>
                <ol type='1'>
                    <li>Go to your My Jobs page and click on the “Create Job”  button on the top right corner of the page. Then you will be redirected to the “Post a job” page.</li>
                    <li>On the “Post a job” page, this is where you will create the content of your job posting and you must fill up the following information:</li>
                    <ol type='a'>
                        <li><b>Basic information</b> - this is where you add the job post title and also select all the categories that best describe the job.</li>
                        <li><b>Description</b> - this is where you will add your job description which you describe and explain the type of work that the Helpa will perform and list the various duties in order of importance. You may also attach files like images or documents to support the job description.</li>
                        <li><b>Tasks & responsibilities</b> - you will list the required various tasks and responsibilities a Helpa will perform and experience in this job.</li>
                        <li><b>Requirements</b> - this is where you set the requirements needed for a Helpa to be qualified for this job such experience, certifications, vaccinations and others.</li>
                        <li><b>Schedule & locations</b> - you will set where the locations of this job will be and also provide the dates, hours, addresses of properties and instructions you want Helpa to know.</li>
                        <li><b>Budget</b> - this is where you add the amount that the Helpa will be paid if they get hired on this job. The rate can be hourly or fixed.</li>
                        <p>Once done with all the information needed, you can click the “Save as Draft” button to save this job post as draft. However, if you think you are ready to publish it just click the “Preview jobs” button and you will be redirected to the Preview page of this job.</p>
                        <li><b>Preview</b> - this is where you can preview how this job post will look like in the user view or how this job post will appear to Helpa.</li>
                        <p>On the Preview page, this is where you can finally publish your job posting by clicking on the “Post Job” button and it will automatically appear on the Helpa “Find work” page. </p>
                        <p><b>Note</b>: Before posting the job, make sure to review and check if all the information or content of the job post is all good and correct. If something is missed or wrong, you may click the “Edit” button and correct the changes before posting your job.</p>
                    </ol>
                    <li>All job postings will be added to your “My Job” page where you can edit, draft, and activate it. You can also check how many Helpa have messaged you about the job.</li>
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
                    Are you an Agent in KeyHelpa who is looking for freelancers to work on your project? Now is the time to create your job posting to attract, to invite and to hire Helpa.
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(JobPosting));