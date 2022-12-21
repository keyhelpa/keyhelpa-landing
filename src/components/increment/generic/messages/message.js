import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors'
import API from 'services/api'
import Routes from 'common/Routes'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import _ from 'lodash'
import Config from 'common/Config';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      limit: 100,
      offset: 0,
      data: []
    }
  }

  convertLineToBreak(text) {
    if (text) {
      return text.replace(/\n/g, '<br />')
    }
  }

  componentDidUpdate() {
    const { updatedMessage, clearUpdate } = this.props;
    if (updatedMessage.length > 0) {
      this.setState({ data: updatedMessage }, () => {
        clearUpdate()
      })
    }
  }

  componentDidMount() {
    const { activeMessage } = this.props;
    this.retrieveMessages(activeMessage, false)
    document.getElementsByClassName('message-container')[0].addEventListener('scroll', (event) => {
      var element = event.target
      if (parseInt(element.scrollHeight + element.scrollTop) === element.clientHeight) {
        this.retrieve()
      }
    })
  }

  retrieveMessages = (item, flag) => {
    const { limit, offset, data } = this.state;
    let parameter = {
      condition: [{
        value: item.id,
        column: 'messenger_group_id',
        clause: '='
      }],
      limit: limit,
      offset: flag === true && offset > 0 ? offset * limit : offset
    }
    this.setState({ isLoading: true })
    API.request(Routes.messagesRetrieve, parameter, response => {
      this.setState({ isLoading: false })
      if (response.data.length > 0) {
        let temp = response.data.reverse().map(item => {
          return {
            ...item,
            title: item.account.information ? item.account.information.first_name + ' ' + item.account.information.last_name : item.account.username,
            position: 'Sales manager, realtor',
            read: false
          }
        })
        this.setState({
          data: flag === false ? temp : _.uniqBy([...data, ...temp], 'id'),
          offset: flag === false ? 0 : offset + 1
        }, () => {
          this.props.setMessages(flag === false ? temp : _.uniqBy([...data, ...temp], 'id'))
        })
      } else {
        this.setState({
          data: flag === false ? [] : data,
          offset: flag === false ? 0 : offset
        })
      }
    }, error => {
      this.setState({ isLoading1: false })
    })
  }

  retrieve = () => {
    this.retrieveMessages(true)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', () => {
      return
    });
  }

  componentDidUpdate() {
    const { activeMessage } = this.props;
    console.log(activeMessage, '-------')
  }

  render() {
    const { data, isLoading } = this.state
    const { user } = this.props.state
    return (
      <div>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column-reverse',
          padding: '0px 25px 0px 25px',
          overflowY: 'scroll',
          height: '46vh',
          borderTopLeftRadius: 24,
          borderBottomLeftRadius: 25
        }}
          className={'message-container'}>
          {isLoading && [1, 2, 3].map((item) => (
            <Skeleton
              height={75}
              style={{
                borderRadius: 10,
                marginTop: 25
              }} />
            ))
          }
          {
            !isLoading && data.length > 0 && data.map((el, ndx) => {
              return (
                <div
                  key={'msg' + ndx}
                  style={{
                    width: '100%',
                    marginTop: '10px',
                    marginBottom: '10px',
                    float: 'left'
                  }}
                >
                  <div style={{
                    float: 'left',
                    width: 60
                  }}>
                    {el.account.profile ? <img
                      src={Config.BACKEND_URL + el.account.profile.url}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        marginRight: 20,
                        border: '1px solid ' + Colors.primary
                      }} /> : <AccountCircleIcon
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        marginRight: 20,
                        border: '1px solid ' + Colors.primary
                      }}
                    />}
                  </div>
                  <div style={{
                    width: 'calc(100% - 60px)',
                    float: 'left'
                  }}>
                    <div style={{
                      width: '100%',
                      float: 'left',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}>
                      <span style={{
                        color: Colors.gray,
                        fontWeight: 'bold',
                      }}>{el.title}</span>
                      <span style={{
                        color: Colors.rgbaGray,
                      }}>{el.created_at}</span>
                    </div>
                    <div style={{
                      width: '100%',
                      float: 'left',
                      marginTop: 15
                    }}>
                      {el.payload === 'text' && <h3 dangerouslySetInnerHTML={{ __html: this.convertLineToBreak(el.message) }}></h3>}
                      {el.payload === 'image' &&
                        (el.files?.length > 0 && el.files.map((item, index) => (<img
                          src={Config.BACKEND_URL + item.url}
                          style={{
                            height: 200
                          }}
                          className='container-70-full-mobile'
                          key={index}
                        />)))
                      }
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
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
