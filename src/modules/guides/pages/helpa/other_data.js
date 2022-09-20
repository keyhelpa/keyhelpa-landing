import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors';
import VideoCard from 'modules/guides/videoCard'
import './helpa.css'
import Data from 'modules/guides/data'

class OtherData extends Component {
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
                <p>To update your other data, read the following instructions below:</p>
                <ol type='1'>
                    <li>On Helpa’s web application, click your profile icon or photo then a dropdown menu will appear.Choose “Settings” and you will be taken to a new sidebar menu. Click the “Other data” on your sidebar menu and you will be redirected to the “I have” page.</li>
                    <li>On your “I have” page, all of the information is automatically filled with data you have already entered during your profile setup. These are the datas you can update and edit on your additional other data:</li>
                    <ul>
                        <li>Job categories experience -  set your level of experiences for each job category you have selected on your Work preferences</li>
                        <li>Motor vehicle - select from the 2 choices:</li>
                            <ul>
                                <li>I have my own</li>
                                <li>I do not drive.</li>
                            </ul>
                        <li>Insurance policies - select from the 3 choices:</li>
                            <ul>
                                <li>I have a current Public Liability policy</li>
                                <li>I have current Professional Indemnity insurance</li>
                                <li>I have no insurance</li>
                            </ul>
                        <li>Vaccinations status - select from the 2 choices:</li>
                            <ul>
                                <li>Fully vaccinated</li>
                                <li>Not vaccinated </li>
                            </ul>
                    </ul>
                    <li>Once you have made changes or updates on your other data, just click the “Save” button to save your changes.</li>
                </ol>
                <p>If you have any concerns or inquiries, please don’t hesitate to <a href={Config.LANDING+"helpa/contact_us"}>contact us</a>. </p>
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
Your profile is one of your most important tools as a freelancer on KeyHelpa. Additional data is vital information that needs to be up-to-date within KeyHelpa platform, as it is important to agents who are looking for Helpas with good credibility to be fit for the job they are hiring. Your additional or other data plays  an important factor to attract hiring Agents.                </p>


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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OtherData));