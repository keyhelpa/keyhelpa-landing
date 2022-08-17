import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors';
import VideoCard from 'modules/guides/videoCard'
import './helpa.css'
class WorkPreference extends Component {
    constructor(props) {
        super(props)
    }
    renderContent(){
        return(
            <div>
                <p>To update your work preferences, read the following instructions below:</p>
                <ol type='1'>
                    <li>On Helpa’s web application, click your profile icon or photo then a dropdown menu
                    will appear.Choose “Settings” and you will be taken to a new sidebar menu. Click the
                    “Work preferences"
                    " on your sidebar menu and you will be redirected to the “Work
                    preferences” page.
                    </li>
                    <li>On your “Work preferences” page, all of the information is automatically filled with
                    data you have already entered during your profile setup. These are the datas you
                    can update and edit on your work preferences info:
                    </li>
                    <ul>
                        <li><b className='b-helpa'>Region</b> - Select the regions that you wish to work in</li>
                        <li><b className='b-helpa'>Job category</b> - Select all applicable categories that suit you.</li>
                        <li><b className='b-helpa'>Hourly rate</b> - Set your hourly rate (In some jobs you may be required to use
                            a car and travel between jobs - please factor this into your hourly rate. You
                            can also change your hourly rate when making an offer on a job.)
                        </li>
                        <p>Please note that when setting your hourly rate, you will not receive the actual
                        rate because KeyHelpa will take 11% from your hourly rate as service fee.
                        Therefore, you will only receive an estimated 89% of the amount of your
                        hourly rate (which basically has been subtracted from service fees).
                        </p>
                    </ul>
                    <li>Once you have made changes or updates on your work preferences, just click the
                        “Save” button to save your changes.
                        </li>
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
                    Your profile is one of your most important tools as a freelancer on KeyHelpa. Your work
preferences is vital information that needs to be up-to-date within KeyHelpa platform, as it
is important to agents who are looking for Helpas with good credibility to be fit for the job
they are hiring. Your work preferences play an important factor to attract hiring Agents.
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WorkPreference));