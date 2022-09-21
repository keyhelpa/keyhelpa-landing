import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors';
import VideoCard from 'modules/guides/videoCard'
import './helpa.css'
import Data from 'modules/guides/data'
import Config from 'common/Config';
class ManageSocials extends Component {
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
                <p>To manage your socials, read the following instructions below:</p>
                <ol type='1'>
                    <li>On Helpa’s web application, click your profile icon or photo then a dropdown menu will appear.Choose “Settings” and you will be taken to a new sidebar menu. Click the “Social” on your sidebar menu and you will be redirected to the “Social media” page.</li>
                    <li>On your “Social media” page, most of the information is automatically filled with data you have already entered during your registration and profile setup. These are the datas you can update and edit on your social info:</li>
                    <ul>
                        <li>Linkedin (url)</li>
                        <li>Facebook (url)</li>
                        <li>YouTube Channel (url)</li>
                        <li>Profile photo</li>
                    </ul>
                    <li>Once you have made changes or updates on your social media, just click the “Save” button to save your changes.</li>
                </ol>
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

Your profile is one of your most important tools as a freelancer on KeyHelpa. Adding your social media profile or information can be used to your full advantage as it may help you stand out to potential Agents and boost your chances of winning jobs. Agents may check on your social media profiles, and from there you can show off your skills and accomplishments.
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ManageSocials));