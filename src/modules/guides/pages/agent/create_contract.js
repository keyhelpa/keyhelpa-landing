import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors';
import VideoCard from 'modules/guides/videoCard'
import './agent.css'
import Data from 'modules/guides/data'
class CreateContract extends Component {
    constructor(props) {
        super(props)
        this.state={
            data: Data.agent,
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
                <p>Final job offer or contract is very important to both Agent and Helpa as it will provide protection and security for both parties. The terms and conditions of employment and the capacity in which a Helpa is being hired, along with the corresponding job responsibilities must be conveyed in the contract. Most of the content of the contract is just the same with the job description you posted, but the contract is now more specific and  will entail the Helpa when to actually start the  job and other more important agreements.</p>
                <p>The following information are the guidelines when creating a contract between Agent and Helpa through KeyHelpa:</p>
                <ol type='1'>
                    <li><b className='b-agent'>Basic information</b> - this is where you set the final job title or name of the position of the Helpa</li>
                    <li><b className='b-agent'>Description</b> - you will describe the final job description of Helpa - i.e., brief explanation of the type of work that the Helpa will perform. You may also attach files like images or documents to support the job description.</li>
                    <li><b className='b-agent'>Tasks & responsibilities</b> - you will list the final tasks and responsibilities a Helpa will actually perform in this job.</li>
                    <li><b className='b-agent'>Schedule & locations</b> -  you will set the final designation of Helpa as to when and what time is his/her schedules including the instructions and the list of properties the Helpa need to visit or market.</li>
                    <li><b className='b-agent'>Budget</b> - set the final deal of payment rate ,you , the Agent, and the Helpa have agreed.</li>
                    <li><b className='b-agent'>Preview</b> - this is where you can preview how this contract will look like in the Helpa’s view or how this contract will appear to Helpa.</li>
                    <p>On the Preview page, this is where you can finally send your job offer to Helpa by clicking on the “Send Contract” button which can be found at the bottom part  of the page and it will automatically appear at the top of Helpa’s “My contract” page. </p>     
                    <p><b className='b-agent'>Note</b>: Before sending the final job offer, make sure to review and check if all the information or content of the contract is all good and correct. If something is missed or wrong, you may click the “Back to Edit” button and correct the changes before sending your job offer to Helpa.</p>
                </ol>
                <p>All the contracts that you have sent to Helpas will be found in your “My contracts” page which has the following status: active, pending, pause, dispute, end, and rejected.</p>
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
                In this guide you will see what are the guidelines for creating a job contract that you will be sending to Helpa upon hiring. Check how to hire helpa <a href='#'>here</a>.
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateContract));