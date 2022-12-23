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
const {REACT_APP_API_URL}=process.env
class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: [],
      offset: 0,
      limit: 10
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
      this.props.setMessages(updatedMessage)
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
        this.retrieve(activeMessage)
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
      offset: offset,
      sort: {
        created_at: 'desc'
      }
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
        temp = temp.reverse()
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
        this.props.setMessages(flag === false ? [] : data)
      }
    }, error => {
      this.setState({ isLoading1: false })
    })
  }

  retrieve = (item) => {
    this.retrieveMessages(item, true)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', () => {
      return
    });
  }

  componentDidUpdate() {
    const { activeMessage } = this.props;
  }

  renderProfile(item) {
    return (
      <div style={{
        float: 'left',
        width: 60
      }}>
        {item.account && item.account.profile ? <img
          src={item.account.profile.url.includes('storage') ? `${REACT_APP_API_URL}` + item.account.profile.url : item.account.profile.url}
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
    )
  }

  renderMessage(item) {
    return (
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
          }}>
            {item.title}
          </span>
          <span style={{
            color: Colors.lightGray,
          }}>
            {item.created_at}
          </span>
        </div>
        <div style={{
          width: '100%',
          float: 'left',
          marginTop: 5
        }}>
          {item.payload === 'text' && (
            <span
              style={{
                color: Colors.textGray
              }}
              dangerouslySetInnerHTML={{ __html: this.convertLineToBreak(item.message) }}></span>
          )
          }
          {item.payload === 'image' && (item.files?.length > 0 && item.files.map((iItem, index) => (
            <img
              src={iItem.url.includes('storage') ? `${REACT_APP_API_URL}` + iItem.url: iItem.url }
              style={{
                height: 200
              }}
              className='container-70-full-mobile'
              key={index}
            />
          )))
          }
        </div>
      </div>
    )
  }
  render() {
    const { data, isLoading } = this.state
    const { user, messages } = this.props.state
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
            !isLoading && messages && messages.length > 0 && messages.map((item, ndx) => {
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
                  {
                    this.renderProfile(item)
                  }
                  {
                    this.renderMessage(item)
                  }
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
