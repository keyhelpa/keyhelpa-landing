import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors';
import VideoCard from 'modules/guides/videoCard'
import './helpa.css'
import Data from 'modules/guides/data'
class WorkHistory extends Component {
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
                <p>To update your work experience, read the following instructions below:</p>
                <ol type='1'>
                    <li>On Helpa’s web application, click your profile icon or photo then a dropdown menu will appear.Choose “Settings” and you will be taken to a new sidebar menu. Click the “Experience” on your sidebar menu and you will be redirected to the “Experience” page.</li>
                    <li>On your “Experience” page, all of the information is automatically filled with data you have already entered during your profile setup. These are the datas you can update and edit on your work  experience info:</li>
                    <ul>
                        <li>Professional title/job role</li>
                        <li>Real estate experience (your personal summary about yourself and your experience with real estate)</li>
                    </ul>
                    <li>Once you have made changes or updates on your experience, just click the “Save” button to save your changes.</li>
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
                    Your profile is one of your most important tools as a freelancer on KeyHelpa. Your work experience is vital information that needs to be up-to-date within KeyHelpa platform, as it is important to agents who are looking for Helpas with good credibility to be fit for the job they are hiring. Your work experience plays an important factor to attract hiring Agents.
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WorkHistory));