import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors';
import VideoCard from 'modules/guides/videoCard'
import './helpa.css'
import Data from 'modules/guides/data'
import Config from 'common/Config';
class UpdateCert extends Component {
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
    rend
    renderContent(){
        return(
            <div style={{
                marginTop: 30
            }}>
                <p>To update your certificates, read the following instructions below:</p>
                <ol type='1'>
                    <li>On Helpa’s web application, click your profile icon or photo then a dropdown menu will appear.Choose “Settings” and you will be taken to a new sidebar menu. Click the “Certificates” on your sidebar menu and you will be redirected to the “My certificates” page.</li>
                    <li>On your “My certificates” page, you will see all the certificates you uploaded during your profile setup including its status. KeyHelpa may reject or accept the certificates you uploaded if they find it to be invalid or valid.</li>
                    <li>To add updates or to add new certificates, just click the “browse” action or just drag & drop the files to upload the certificates.</li>
                </ol>
                <p>If you have any concerns or inquiries, please don’t hesitate to <a href="../contact_us">contact us</a>. </p>
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
Your profile is one of your most important tools as a freelancer on KeyHelpa. Compiling license certificates is vital information that needs to be up-to-date within KeyHelpa platform, as it is important to agents who are looking for Helpas with good credibility to be fit for the job they are hiring. Your certificates plays  an important factor to attract hiring Agents.                </p>
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpdateCert));