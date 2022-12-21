import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors'
import Grid from '@mui/material/Grid';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Config from 'config.js';
import Helper from 'modules/generic/helper/Common'

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  renderClose() {
    return (
      <div style={{
        float: 'left'
      }}
        className="cursor-hover"
      >
        <ArrowBackIosIcon
          style={{
            fontSize: '24px'
          }}
          onClick={() => {
            this.props.onClose()
          }}
        />
      </div>
    )
  }

  renderContent(item) {
    return (
      <div style={{
        width: '95%',
        float: 'left',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
        className="unset-flex-mobile"
      >
        <span style={{
          float: 'left'
        }}
          className="full-width-mobile"
        >
          {
            this.renderClose()
          }
          <span style={{
            float: 'left'
          }}>
            {
              item.account && item.account.information && (
                <h3 style={{
                  color: Colors.primary,
                  fontWeight: 'bold'
                }}>
                  {Helper.getCompleteName(item.account.information)}
                </h3>
              )
            }

            {
              item.account && item.account.experience && (
                <p style={{
                  color: Colors.lightGray,
                  margin: '5px 5px 0px 0px',
                }}>
                  {item.account.experience.title}
                </p>
              )
            }

          </span>
        </span>
        {
          item.contract && (
            <span style={{
              color: Colors.primary,
              fontWeight: 'bold',
              cursor: 'pointer',
              float: 'left'
            }}
              className="full-width-mobile mt-mobile-15"
              onClick={() => {
                window.location.href = Config.HOST + '/contract/view/' + item.contract.code
              }}>
              View Contract
            </span>
          )
        }
      </div>
    )
  }

  render() {
    const { activeMessage } = this.props;
    return (
      <div
        style={{
          padding: 20,
          borderBottom: 'solid 1px ' + Colors.activeGray,
          float: 'left',
          width: '100%'
        }}>
        {
          activeMessage && this.renderContent(activeMessage)
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

