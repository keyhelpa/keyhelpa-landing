import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Banner from './banner'
import Colors from 'common/Colors';
import { SvgIcon } from '@mui/material';
import Data from './data'
import Introduction from './pages/introduction'

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
                    justifyContent: 'space-between',
                    flexWrap: 'wrap'
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
                                }}><b>{item.title}</b></p>
                                <p style={{
                                    color: theme == 'agent' ? Colors.agentTextTitle : Colors.helpaTextTitle
                                }}>
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