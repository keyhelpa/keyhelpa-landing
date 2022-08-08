import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Banner from './banner'
import Colors from 'common/Colors';
import { SvgIcon } from '@mui/material';
import Data from './data'
import Introduction from './pages/introduction'
import './Style.css'
import EndContract from 'modules/generic/modal/EndContract';

class Guide extends Component {
    constructor(props) {
        super(props)
        this.state = {
            theme: 'agent',
            accountType: null,
            menu: [],
            item: null
        }
    }

    componentDidMount() {
        const { history } = this.props;
        let user = history.location.pathname.includes('agent') ? 'agent' : 'helpa'
        this.setState({
            accountType: user,
            theme: user,
            menu: user == 'agent' ? Data.agent : Data.helpa,
            item: Data.getMenu(user == 'agent' ? Data.agent : Data.helpa, history.location.pathname)
        })
    }

    managePage(item){
        const { theme } = this.state;
        switch(item.route){
            case '/agent/guides': return <Introduction theme={theme}/>
            case '/helpa/guides': return <Introduction theme={theme}/>
            // agent
            case '/agent/guides/create_account': return <CreateAccountAgent theme={theme}/>
            case '/agent/guides/setup_profile': return <SetupAgent theme={theme}/>
            case '/agent/guides/search_helpa': return <SearchHelpa theme={theme}/>
            case '/agent/guides/create_job_posting': return <JobPosting theme={theme}/>
            case '/agent/guides/send_invite': return <SendInvite theme={theme}/>
            case '/agent/guides/accept_proposal': return <AcceptProposal theme={theme}/>
            case '/agent/guides/interview_helpa': return <InterviewHelpa theme={theme}/>
            case '/agent/guides/hire_helpa': return <HireHelpa theme={theme}/>
            case '/agent/guides/end_contract': return <EndContractAgent theme={theme}/>
            case '/agent/guides/pause_contract': return <PauseContractAgent theme={theme}/>
            case '/agent/guides/dispute_contract': return <DisputeContractAgent theme={theme}/>
            case '/agent/guides/edit_basic_info': return <EditBasicAgent theme={theme}/>
            case '/agent/guides/edit_agency_info': return <EditAgency theme={theme}/>
            case '/agent/guides/update_bank_details': return <UpdateBankAgent theme={theme}/>
            case '/agent/guides/update_password': return <UpdatePasswordAgent theme={theme}/>
            case '/agent/guides/manage_security': return <ManageSecurityAgent theme={theme}/>
            case '/agent/guides/manage_notifications': return <ManageNotifAgent theme={theme}/>
            // helpa
            case '/helpa/guides/create_account': return <CreateAccountHelpa theme={theme}/>
            case '/helpa/guides/setup_profile': return <SetupHelpa theme={theme}/>
            case '/helpa/guides/search_job': return <SearchJob theme={theme}/>
            case '/helpa/guides/submit_proposal': return <SubmitProposal theme={theme}/>
            case '/helpa/guides/end_contract': return <EndContractHelpa theme={theme}/>
            case '/helpa/guides/pause_contract': return <PauseContractHelpa theme={theme}/>
            case '/helpa/guides/dispute_contract': return <DisputeContractHelpa theme={theme}/>
            case '/helpa/guides/edit_basic_info': return <EditBasicHelpa theme={theme}/>
            case '/helpa/guides/manage_socials': return <ManageSocials theme={theme}/>
            case '/helpa/guides/update_bank_details': return <UpdateBankHelpa theme={theme}/>
            case '/helpa/guides/update_passwords': return <UpdatePasswordHelpa theme={theme}/>
            case '/helpa/guides/manage_security': return <ManageSecurityAgent theme={theme}/>
            case '/helpa/guides/update_work_experience': return <WorkHistory theme={theme}/>
            case '/helpa/guides/update_work_preferences': return <WorkPreference theme={theme}/>
            case '/helpa/guides/update_work_availability': return <WorkAvailability theme={theme}/>
            case '/helpa/guides/update_other_data': return <OtherData theme={theme}/>
            case '/helpa/guides/manage_notifications': return <ManageNotifHelpa theme={theme}/>
        }
    }

    renderMenu() {
        const { theme, menu } = this.state;
        return (
            <div style={{
                float: 'left',
                width: '100%'
            }}>
                <h1 style={{
                    textAlign: 'center',
                    marginTop: 25,
                    marginBottom: 25,
                    color: theme == 'agent' ? Colors.agentDarkGray : Colors.helpaDarkPink
                }}>
                    {theme == 'agent' ? 'Agent Guides' : 'Helpa Guides'}
                </h1>
                <div style={{
                    float: 'left',
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '5%'
                }}>
                    {
                        menu.map((item) => (
                            <div style={{
                                width: '30%',
                                float: 'left',
                                backgroundColor: Colors.white,
                                borderRadius: 12,
                                textAlign: 'center',
                                paddingTop: 10,
                                paddingBottom: 10,
                                paddingLeft: 20,
                                paddingRight: 20,
                                marginBottom: 25
                            }}
                                onClick={() => {
                                    this.setState({
                                        item
                                    })
                                    this.props.history.push(item.route)
                                    
                                }}
                                className="cursor-hover full-width-mobile"
                            >
                                <SvgIcon
                                    component={item.icon}
                                    style={{
                                        fontSize: 60,
                                        color: theme == 'agent' ? Colors.agentDarkGray : Colors.helpaDarkPink
                                    }}
                                />
                                <p style={{
                                    color: theme == 'agent' ? Colors.agentDarkGray : Colors.helpaDarkPink
                                }} className="tile-title"><b>{item.title}</b></p>
                                <p style={{
                                    color: theme == 'agent' ? Colors.agentTextTitle : Colors.helpaTextTitle
                                }} className="tile-desc">
                                    {
                                        item.description
                                    }
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }

    render() {
        const { theme, item } = this.state;
        return (
            <div style={{
                width: '100%',
                float: 'left',
                backgroundColor: theme == 'agent' ? Colors.agentBackgroundColor : Colors.helpaBackgroundColor,
            }}>

                {
                    item && (
                        <Banner
                            title={item.title}
                            theme={theme}
                        />
                    )
                }

                <div style={{
                    backgroundColor: theme == 'agent' ? Colors.agentBackgroundColor : Colors.helpaBackgroundColor,
                    float: 'left',
                    width: '100%',
                    minHeight: '100vh',
                    marginBottom: 100
                }}>
                    <div style={{
                        width: '50%',
                        float: 'left',
                        marginLeft: '25%',
                        marginRight: '25%',
                        paddingTop: 50,
                        paddingBottom: 50
                    }}
                        className="full-width-mobile-with-margin"
                    >

                        {
                            item && this.managePage(item)
                        }
                        {
                            this.renderMenu()
                        }
                    </div>

                </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Guide));