import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors';
import { SvgIcon } from '@mui/material';
import Banner from '../guides/banner'
import Data from './data'
import { ArrowDropDown, ArrowUpward, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

class Stack extends Component {
    constructor(props) {
        super(props)
        this.state = {
            theme: 'agent',
            accountType: null,
            data: []
        }
    }

    componentDidMount() {
        const { history } = this.props;
        let user = history.location.pathname.includes('agent') ? 'agent' : 'helpa'
        this.setState({
            accountType: user,
            theme: user,
            data: Data.data
        })
    }
    manageSelected(selectedItem, selectedIndex) {
        const { data } = this.state;
        let newData = data.map((item, index) => {
            if (selectedIndex == index) {
                return {
                    ...item,
                    open: !selectedItem.open
                }
            }
            return item
        })
        this.setState({
            data: newData
        })
    }

    renderData() {
        const { data } = this.state;
        const { accountType } = this.props.state;
        return (
            <div style={{
                float: 'left',
                width: '100%'
            }}>
                <ul style={{
                    width: '100%',
                    margin: 0,
                    padding: 0,
                    listStyle: 'none'
                }}>
                    {
                        data.map((item, index) => (
                            <li key={index}

                                style={{
                                    paddingLeft: 20,
                                    paddingTop: 10,
                                    paddingBottoM: 10,
                                    paddingRight: 20,
                                    width: '100%',
                                    float: 'left',
                                    borderBottom: 'solid 1px ' + Colors.lightGray,
                                    borderBottomLeftRadius: 5,
                                    borderBottomRightRadius: 5
                                }}
                                onClick={() => {
                                    this.manageSelected(item, index)
                                }}
                                className="cursor-hover"
                            >
                                <span style={{
                                    width: '100%',
                                    float: 'left',
                                    marginBottom: 20,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginTop: 20
                                }}>
                                    <b style={{
                                        color: accountType == 'agent' ? Colors.agentTextTitle : Colors.helpaTextTitle
                                    }}>
                                        {
                                            item.title
                                        }
                                    </b>
                                    <SvgIcon
                                        component={item.open ? KeyboardArrowUp : KeyboardArrowDown}
                                    />
                                </span>
                                <span style={{
                                    color: Colors.agentTextTitle
                                }}>
                                    {
                                        item.open && (
                                            item.description()
                                        )
                                    }
                                </span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }

    render() {
        const { theme } = this.state;
        const { accountType } = this.props.state;
        return (
            <div style={{
                width: '100%',
                float: 'left',
                backgroundColor: accountType == 'agent' ? Colors.agentBackgroundColor : Colors.helpaBackgroundColor,
            }}>
                <Banner
                    title={'FAQs'}
                    theme={accountType}
                />

                <div style={{
                    backgroundColor: accountType == 'agent' ? Colors.agentBackgroundColor : Colors.helpaBackgroundColor,
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
                            this.renderData()
                        }
                        <div style={{
                            float: 'left',
                            width: '100%',
                            marginTop: 25,
                            color: Colors.agentTextTitle
                        }}>
                            <p>
                                If you have any concerns or inquiries, please don’t hesitate to contact us at
                                <b>
                                     <a href="#">  support@keyhelpa.com</a>
                                </b>
                            </p>
                        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stack));
