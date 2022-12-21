import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors'
class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  renderText(label, value){
    return(
      <span
      className="container-25-full-mobile"
      >
        <p style={{
          fontWeight: 'bold',
          color: Colors.gray,
        }}>{value}</p>
        <p style={{
          color: Colors.lighterText
        }}>{label}</p>
      </span>
    )
  }
  render() {
    const { data } = this.props;
    console.log('[dataaaa]', data)
    return (
      <div style={{
        width: '100%',
        float: 'left',
        padding: 25,
        justifyContent: 'center',
        borderTop: 'solid 1px ' + Colors.lightGray,
        borderBottom: 'solid 1px ' + Colors.lightGray
      }}>
        <div style={{
          justifyContent: 'center',
          flexDirection: 'row',
          width: '100%'
        }}>
          {
            this.renderText('Contract number', "No. " + data.id)
          }

          {
            data.job && data.job.merchant && this.renderText('Hired by', data.job.merchant.name)
          }
            
          {
            this.renderText('Contract date', data.created_at)
          }

          {
            data.job && data.job.merchant && this.renderText('Parties', data.freelancer_account.username + ' & ' + data.job.merchant.name)
          }
        </div>
      </div>
    )
  }
}

const style = {
  full: {
    float: 'left',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10
  }
}
const mapStateToProps = (state) => ({ state: state });

const mapDispatchToProps = (dispatch) => {
  const { actions } = require('reduxhandler');
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stack));