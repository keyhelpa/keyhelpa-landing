import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors';
import VideoCard from 'modules/guides/videoCard'
import './helpa.css'
import Data from 'modules/guides/data'
class EditBasicHelpa extends Component {
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
                <p>To edit your basic information, read the following instructions below:</p>
                <ol type='1'>
                    <li>On Helpa’s web application, click your profile icon or photo then a dropdown menu will appear. Choose “Settings” and you will be taken to a new sidebar menu with a default dashboard of the “Basic information” page.</li>
                    <li>On your “Basic information” page, most of the information is automatically filled with data you have already entered during your registration and profile setup. These are the datas you can update and edit on your basic info:</li>
                    <ul>
                        <li>Trading name</li>
                        <li>Postcode</li>
                        <li>Suburb</li>
                        <li>Address (specific address - i.e., building name, street,etc.)</li>
                        <li>ACN/ABN (Australian Company Number/Australian Business Number)</li>
                        <li>Postcode</li>
                        <li>Region</li>
                        <li>Area</li>
                    </ul>
                    <li>Once you have made changes or updates on your basic information, just click the “Save” button to save your changes.</li>
                </ol>
                <p>If you have any concerns or inquiries, please don’t hesitate to <a href='../contact_us'>contact us</a>. </p>
            </div>
        )
    }

    render() {
        const { theme } = this.props;
        const {url} = this.state;
        return (
            <div style={{
                width: '100%',
                float: 'left'
            }}>
                <p style={{
                    color: theme == 'agent' ? Colors.agentTextTitle : Colors.helpaTextTitle,
                    marginBottom: '5%'
                }}>
Basic information is vital data that needs to be up-to-date within KeyHelpa platform, not just for the system's identity verification but also important to agents who are looking for Helpas with good credibility to be fit for the job they are hiring.                </p>


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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditBasicHelpa));