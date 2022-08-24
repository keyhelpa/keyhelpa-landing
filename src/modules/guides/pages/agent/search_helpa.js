import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors';
import VideoCard from 'modules/guides/videoCard'
import './agent.css'
import Data from 'modules/guides/data'
class SearchHelpa extends Component {
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
    renderContent() {
        return (
            <div style={{
                marginTop: 30
            }}>
                <p>Use KeyHelpa’s filter search to filter candidates based on your preferences.</p>
                <ul>
                    <li>Once your account is done with profile setup and has been validated, your web app header will have a search field where you can filter your search on the Helpas or Freelancer Candidates you are interested in.</li>
                    <li>On your Candidate page is where you will see all the results of your search or where you could view your matched candidates.</li>
                </ul>
                <p>Follow the instructions below to know how filter works:</p>
                <ol type='1'>
                    <li>On your web app header, click the “<i class='fas fa-sliders-h'></i>” icon on the search field.  Then you will be prompted to “Filter candidates” modal or pop-up.</li>
                    <li>On the “Filter candidates” modal, you may set the following filters:</li>
                    <ul>
                        <li><b className='b-agent'>Region</b> - you may select from what regions you want your Helpa is/are from.</li>
                        <li><b className='b-agent'>Categories</b> - you can select as many categories you want a Helpa is inclined to such as residentials sales, sales marketing, accounts management, and many more.</li>
                        <li><b className='b-agent'>Hourly Rate </b>- you can select the hourly range of Helpa to match them with the cost of the job you are offering.</li>
                        <li><b className='b-agent'>Vaccination</b> - you can set the vaccination status of Helpa you are looking for such as fully vaccinated, not vaccinated or not negotiable.</li>
                        <li><b className='b-agent'>Experience</b>  - you can set the experience level you are looking for a Helpa.</li>
                        <li><b className='b-agent'>Payment</b> - you can select those Helpa with Payment Verified status or Not Verified.</li>
                        <li><b className='b-agent'>Certification</b> - you can set your certification requirements that a Helpa must have to be qualified to the job you are hiring.</li>
                        <li><b className='b-agent'>Popularity</b> - you can set the percentage of job success of Helpa</li>
                    </ul>
                    <p>Once done with setting all the parameters you want to be filtered, just click the “Set Filter” button to save your filter settings. Otherwise, click the “Clear All” if you want to reset your filter settings. </p>
                    <li>After you click the “Set Filter” button, the “Filter candidates” modal will automatically close and on the candidates page will give you the matched candidates results of your filter. Otherwise, if the filter is reset, the matched candidates will be back into the default random results.</li>
                </ol>
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
                    Are you looking for someone who could work on your real estate projects at your preferred location, experience, or availability? Start searching among our freelancers or shall we say “Helpa”!
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchHelpa));