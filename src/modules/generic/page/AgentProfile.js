import React from 'react';
import { connect } from 'react-redux';
import Style from './Style'
import { withRouter } from 'react-router-dom';
import ViewAgent from 'modules/generic/page/ViewAgent'
import DetailsLoading from 'modules/generic/card/DetailsLoading'
import API from 'services/api'
import Routes from 'common/Routes'

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      submitProposal: false,
      isLoading: false
    }
  }
 
  componentDidMount(){
    if(this.props.match.params.code != null){
      this.retrieveAgent()
    }
  }

  retrieveAgent(){
    const { user } = this.props.state;
    if(user === null){
      return
    }
    let parameter = {
      condition: [{
        column: 'account_type',
        value: 'AGENT',
        clause: '='
      }, {
        column: 'code',
        value: this.props.match.params.code,
        clause: '='
      }]
    }
    API.request(Routes.agentRetrieve, parameter, response => {
      if(response.data && response.data.length > 0){
        this.setState({
          data: response.data[0]
        })
      }
    })
  }


  render() {
    const { data, isLoading} = this.state;
    return (
      <div style={{
        width: '94%',
        marginRight: '3%',
        marginLeft: '3%',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 40,
        paddingBottom: 100,
        marginTop: 50,
        marginBottom: 50
      }}>

          {
            (!isLoading && data) && (
              <ViewAgent
                data={data}

                navigate={(route) => {
                    this.props.history.push(route)
                }}
                submitProposal={(data) => {
                    this.setState({
                        submitProposal: true
                    })
                }}
              />
            )
          }

          {
            isLoading && (
              <DetailsLoading />
            )
          }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => {
  const { actions } = require('reduxhandler');
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stack));
