import React from 'react';
import { Modal} from 'react-bootstrap'
import ModalHeader from './header'
import ModalFooter from './footer'
import Style from './style'
import Colors from 'common/Colors'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null
    };
  }
  body(){
    return(
      <Modal.Body style={{
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: 'center'
      }}>
        <p style={{
          color: Colors.iconText,
          fontWeight: 600
        }}>{this.props.message}</p>
        <p style={{
          width: '100%'
        }}>
          I acknowledge that the work I, or any entity I control, undertake is done so as a Personal Services Business. More specifically, no more than 80% of the annual revenue derives from less than 20% of the clients/customers for whom the work is performed. To the extent I have any doubt about this position I have confirmed it via appropriate, independent, advice.
        </p>
        <p style={{
          textDecorationLine: 'underline',
          cursor: 'pointer'
        }}
        onClick={() => this.props.history.push('/terms_and_conditions')}>View Terms and Conditions</p>
      </Modal.Body>
      
    )
  }
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={() => this.props.onCancel()} 
        style={Style.modal}
      >
        <ModalHeader
          title={'Confirmation'}
          subTitle={null}
          onCancel={() => this.props.onCancel()}
          />
          
          {
            this.body()
          }

          <ModalFooter
            actions={[{
              title: 'Close',
              isLoading: false,
              style: {
                backgroundColor: Colors.danger,
                marginRight: 20
              }
            }, {
              title: 'Accept',
              isLoading: this.props.isLoading,
              style: {
                backgroundColor: Colors.primary
              }
            }]}
            onClick={(params) => {
              if(params.title == 'Close'){
                this.props.onCancel()
              }else{
                this.props.onContinue()
              }
            }}
          />
      </Modal>
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
