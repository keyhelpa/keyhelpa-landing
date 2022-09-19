import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors';
import VideoCard from 'modules/guides/videoCard'
import './helpa.css'
import Data from 'modules/guides/data'
class SetupHelpa extends Component {
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
                <p>When you sign up to KeyHelpa, automatically, you will be redirected to the welcome page. If you have logged out right after you sign up, you can still login using your newly registered credentials and then proceed to the welcome page. </p>
                <p>Follow the steps  below to complete your profile setup with KeyHelpa as a Helpa:</p>
                <ol type='1'>
                    <li>Start your profile setup by clicking on the “Profile setup” button on the “Welcome to KeyHelpa” Page. Then you will be redirected to the Basic information page.</li>
                    <li>On the Basic information page, most of the information are automatically with data you entered during your registration (i.e., Trading name and Postcode). You need to fill in all the fields to continue.  Once all is filled and done , click the “Next” button at the bottom right corner of the page and you will be taken to the Social media page.</li>
                    <li>On the Social media page, you will need to fill in at least one of the following social media accounts - Linkedin, Facebook, and YouTube Channel. You can also upload your profile photo to continue. Once done , click the “Next” button at the bottom right corner of the page and you will be taken to the Experience  page.</li>
                    <li>On the Experience page, you will need to add your professional title or job role as well as your personal summary about yourself and your experience with real estate. Once all fields are completed, click the “Next” button at the bottom right corner of the page and you will be taken to the Work preferences page.</li>
                    <li>On the Work preferences page, you will need to select the regions that you wish to work in, select all applicable job categories that suit you,  and  set  your hourly rate. Once you're done selecting and setting,  click the “Next” button at the bottom right corner of the page and you will be taken to the Availability page.</li>
                    <p>Please note that when setting your hourly rate, you will not receive the actual rate because KeyHelpa will take 11%  from your hourly rate as service fee. Therefore, you will only receive an estimated 89% of the amount of your hourly rate (which basically has been subtracted from service fees).</p>
                    <li>On the Availability page, you will need to select the days on which it is convenient for you to work (minimum number of days is 1), the time slot, and the number of hours that you are available to work each day. Once you're done selecting and setting,  click the “Next” button at the bottom right corner of the page and you will be taken to the Other data page.</li>
                    <li>On the Other data page, you will need to set your level of experiences for each job category you have selected on your Work preferences page, license, motor vehicle, insurance policies, and vaccination status. Once all set and done, click the “Next button” to proceed to the Bank details page.</li>
                    <li>On the Banking details page, add your authorized  banking details to be used in payments when doing transactions with KeyHelpa. Once added, click the “Next” button to proceed to the Verification page.</li>
                    <li>On the Verification page, please read the instructions and  click the “Verify me” pink button to get your ID validated. Once validated, click the “Submit Profile” button at the bottom right corner of the page. </li>
                    <p>Before submitting your profile, you may opt to click the “Preview Profile” button at the bottom left corner of the page to overview how your profile can be seen by Agent.</p>
                    <li>Once all done with Step 1-9, you can now enjoy searching for jobs and apply by submitting  proposals!</li>
                </ol>
                <p>If you have any concerns or inquiries, please don’t hesitate to <a href='../contact_us'>contact us</a>. </p>
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
                Have you registered as a Freelancer or Helpa in KeyHelpa? If yes, it is time to complete your profile setup to access all features of KeyHelpa!
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SetupHelpa));