import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors';
import { SvgIcon } from '@mui/material';

class Guide extends Component {
    constructor(props) {
        super(props)
        this.state = {
            theme: 'agent',
            accountType: null
        }
    }

    componentDidMount() {
        const { history } = this.props;
        let user = history.location.pathname.includes('agent') ? 'agent' : 'helpa'
        this.setState({
            accountType: user,
            theme: user
        })
    }

    render() {
        const { theme } = this.state;
        return (
            <div style={{
                width: '100%',
                float: 'left',
                backgroundColor: theme == 'agent' ? Colors.agentBackgroundColor : Colors.helpaBackgroundColor,
            }}>
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