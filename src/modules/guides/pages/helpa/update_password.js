import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors';
import VideoCard from 'modules/guides/videoCard'
import './helpa.css'
import Data from 'modules/guides/data'
class UpdatePasswordHelpa extends Component {
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
            <div>
                <p>To update your password, read the following instructions below:</p>
                <ol type='1'>
                    <li>On Helpa’s web application, click your profile icon or photo then a dropdown menu will appear. Choose “Settings” and you will be taken to a new sidebar menu. Click the “Password” on your sidebar menu and you will be redirected to the “Password” page.</li>
                    <li>On your “Password” page, please provide the following credentials  to update your passwords:</li>
                    <ul>
                        <li>Old Password</li>
                        <li>New Password (*At least one symbol(?.,!_-~$%+=)</li>
                        <li>Confirm New Password (Must match with New Password)</li>
                    </ul>
                    <p>Once you have made changes or updates on your password, just click the “Save” button to save your changes.</p>
                </ol>
                <p><b className='b-helpa'>Tips</b>:</p>
                <p>When coming up with a new password, you want something that can be safe from guesswork and hacking attempts. You may be tempted to use a long password, but quality is much more important than quantity. Please avoid using any personal information such as dates, addresses or names. Also avoid using simple words and phrases; if you do, make them grammatically incorrect to avoid guessing. Use random combinations of numbers, letters and symbols that can still be easy to remember. </p>
                <p>If you have any concerns or inquiries, please don’t hesitate to <a href='#'>contact us</a>. </p>
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
                    If you lose or change computers, it is possible for someone else to gain access to your passwords. Regularly updating your passwords means that even if someone finds an old or saved password, it will no longer be useful, and your data will be secure.
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpdatePasswordHelpa));