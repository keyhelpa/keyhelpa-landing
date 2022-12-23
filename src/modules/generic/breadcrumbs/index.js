import React from 'react';
import { BasicStyles, Helper } from 'common'
import Colors from "common/Colors"
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SelectInput from "components/increment/generic/form/SelectInput"
import Button from 'components/increment/generic/form/Button'
import Config from 'config.js';
import MenuButton from 'components/increment/generic/pagination/menuButton';
const {REACT_APP_AGENT,REACT_APP_HELPA}=process.env;
class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.newFile = null;
    this.state = {
      matches: window.matchMedia("(min-width: 768px)").matches,
      selected: 'Agent',
    };
  }

  componentDidMount() {
    const handler = e => this.setState({ matches: e.matches });
    window.matchMedia("(min-width: 768px)").addEventListener('change', handler);
  }

  fileChangeHandler(e) {

  }

  sort() {
    return (
      <div style={{
        float: 'right'
      }}
        className="full-width-mobile"
      >
        <SelectInput
          items={this.props.sortData}
          style={{
            marginTop: 25,
          }}
          borderBottomStyle={{
            borderBottom: 'solid 3px ' + Colors.borderBottom
          }}
        />
      </div>
    )
  }
  pageLabel() {
    return (
      <div style={{
        height: 30,
        borderRadius: 15,
        width: 100,
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: Colors.activeGray,
        color: Colors.gray
      }}>
        <b style={{
          fontWeight: 600
        }}>
          {
            this.props.pageLabel
          }
        </b>
      </div>
    );
  }

  renderSelection() {
    const { data } = this.props;
    return (
      <div style={{
        float: 'right',
      }}>
        <SelectInput
          value={this.props.selected}
          items={this.props.data}
          onChange={(value) => {
            this.props.onSort(value)
          }}
        />
      </div>
    )
  }

  renderCreateJob() {
    const { data } = this.props;
    return (
      <div style={{
        float: 'right',
      }}
      className="full-width-mobile"
      >
        <Button
          title={'Post a job'}
          onClick={() => {
            this.props.onClickButton('Post a job')
          }}
          style={{
            float: 'center',
            backgroundColor: Colors.primary,
            color: Colors.white
          }}
          className="full-width-mobile"
        />
      </div>
    )
  }

  renderCalendar() {
    const { data } = this.props;
    return (
      <div style={{
        float: 'right',
      }}
      className="full-width-mobile"
      >
        <Button
          title={'Add event'}
          onClick={() => {
            this.props.onClickButton('Add event')
          }}
          style={{
            float: 'center',
            backgroundColor: Colors.primary,
            color: Colors.white
          }}
          className="full-width-mobile"
        />
      </div>
    )
  }

  renderMessages() {
    const { selected } = this.state;
    return (
      <MenuButton
        data={['Agent', 'Freelancer']}
        selected={selected}
        style={{
          color: Colors.gray,
          backgroundColor: Colors.activeGray,
          float: 'right',
          width: '80%'
        }}
        onChange={(param) => {
          if (param === 'Agent') {
            window.location.href = `${REACT_APP_AGENT}`
          } else {
            window.location.href = `${REACT_APP_HELPA}`
          }
        }}
      />
    )
  }

  render() {
    const { progress } = this.props;
    return (
      <div style={{
        width: '100%',
        float: 'left',
        paddingTop: 10,
        paddingBottom: 10,
        ...this.props.style
      }}
        className="full-width-mobile"
      >

        <div className='hide-on-mobile'>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>

            <div style={{
            }}>
              {
                this.state.matches && (
                  <h1 style={{
                    color: Colors.gray
                  }}>
                    {this.props.title}
                  </h1>
                )
              }
              {
                !this.state.matches && (
                  <h3 style={{
                    color: Colors.gray
                  }}>
                    {this.props.title}
                  </h3>
                )
              }

              <p style={{
                color: Colors.gray
              }}>{this.props.description}</p>
            </div>
            <div>
              {
                Helper.ACCOUNT_TYPE !== 'landing' && (
                  <input
                    ref={ref => this.newFile = ref}
                    type="file"
                    name="file"
                    accepts=".docx"
                    className="file-upload"
                    id="newFile"
                    onChange={this.fileChangeHandler}
                  />
                )
              }
            </div>
            {
              this.props.pageLabel && this.pageLabel()
            }
            {
              this.props.sort && this.sort()
            }
            {
              this.props.page === 'tasks' && this.renderSelection()
            }
            {
              this.props.page === 'job_works' && this.renderSelection()
            }
            {
              this.props.page === 'candidates' && this.renderSelection()
            }
            {
              this.props.page === 'agent_jobs' && this.renderCreateJob()
            }
            {
              this.props.page === 'calendar' && this.renderCalendar()
            }
            {/* {
              this.props.page == 'messages' && (
                <div style={{
                  float: 'right',
                  minWidth: '30%'
                }}>
                  {
                    this.renderMessages()
                  }
                </div>
              )
            } */}
          </div>
        </div>
        <div className='hide-on-desktop'>
          <div style={{
            width: '100%',
            float: 'left'
          }}>
            {
              this.state.matches && (
                <h1 style={{
                  color: Colors.gray
                }}>
                  {this.props.title}
                </h1>
              )
            }
            {
              !this.state.matches && (
                <h3 style={{
                  color: Colors.gray
                }}>
                  {this.props.title}
                </h3>
              )
            }

            <p style={{
              color: Colors.gray
            }}>{this.props.description}</p>
          </div>
          <div>
            {
              Helper.ACCOUNT_TYPE !== 'landing' && (
                <input
                  ref={ref => this.newFile = ref}
                  type="file"
                  name="file"
                  accepts=".docx"
                  className="file-upload"
                  id="newFile"
                  onChange={this.fileChangeHandler}
                />
              )
            }
          </div>
          <div style={{
            float: 'left',
            width: '100%'
          }}>
            {
              this.props.pageLabel && this.pageLabel()
            }
            {
              this.props.sort && this.sort()
            }
            {
              this.props.page === 'tasks' && this.renderSelection()
            }
            {
              this.props.page === 'job_works' && this.renderSelection()
            }
            {
              this.props.page === 'candidates' && this.renderSelection()
            }
            {
              this.props.page === 'agent_jobs' && this.renderCreateJob()
            }

            {/* {
              this.props.page == 'messages' && this.renderMessages()
            }
             */}
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
    setViewActivity: (flag) => dispatch(actions.setViewActivity(flag))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stack));

