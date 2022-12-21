import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors'
import Ratings from 'modules/generic/form/Rating'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import Button from 'components/increment/generic/form/Button'
import ProfilePicture from 'modules/generic/card/profilePicture'
import IconModal from 'modules/generic/modal/iconText'
import TextModal from 'modules/generic/modal/contract'
import Image from 'assets/img/successful_hired.png'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disputeModal: false,
      endModal: false,
      pauseModal: false
    }
  }
  // Helpers
  renderDetails(data){
    return(
      <div>
        <span style={{...style.full,
          padding: 0
        }}>
            <h2>{data.job.title}</h2>
          </span>

          <span style={{
            ...style.full,
            fontWeight: 'bold',
            padding: 0
          }}
          >
            {data.account.information.first_name + ' ' + data.account.information.last_name}
          </span>
          
          <span style={{...style.full,
            color: Colors.gray,
            padding: 0
          }}>
            <span style={{
            }}>
              <FontAwesomeIcon 
                icon={faMapMarkerAlt}
                color={Colors.primary}
                style={{
                  marginRight: 5
                }}
                />
              {data.account.address}
            </span>
          </span>

          <div style={style.full}>
            <Ratings value={data.account.rating.value} />
          </div>
      </div>
    )
  }
  renderText(data, border){
    return(
      <div style={{
        padding: 50,
        borderBottom: border ? '1px solid ' + Colors.borderGray: 'none',
        color: Colors.gray
      }}>
        <h3 style={{
          marginBottom: 20,
          fontWeight: 'bold'
        }}>{data.title}</h3>
        {
          data.content()
        }
      </div>
    )
  }
  renderRow(data){
    return (
      <span style={style.full}>
        <h4 style={{
          fontWeight: 'bolder'
        }}>{data.value}</h4>
        <p style={{
          fontWeight: 'bold',
          color: Colors.gray
        }}>
          {data.label}
        </p>
      </span>
    )
  }
  // Header
  contractHeader(data){
    return(
      <div style={{
        borderBottom: 'solid 1px ' + Colors.lightGray,
        ...style.full,
      }}>

        <div style={{
          width: '60%',
          float: 'left',
          paddingBottom: 20,
          padding: 20,
        }}>

          <div style={{
            float: 'left',
            marginRight: 20
          }}>
            <ProfilePicture
              size={150}
            />
          </div>

          <div style={{
            float: 'left'
          }}>
            {
              this.renderDetails(data)
            }
          </div>
          
        </div>
        <div style={{
          width: '40%',
          float: 'left',
          paddingRight: 20
        }}>
          <span style={{
            float: 'right',
            width: '100%',
            textAlign: 'right',
            marginTop: 25
          }}>
            <Button
              title={'Pause'}
              onClick={() => {
                this.setState({
                  pauseModal: true
                })
              }}
              style={{
                backgroundColor: 'transparent',
                color: Colors.primary,
                border: 'solid 1px ' + Colors.primary,
                marginRight: 20
              }}/>

            <Button
              title={'End'}
              onClick={() => {
              }}
              style={{
                backgroundColor: 'transparent',
                color: Colors.primary,
                border: 'solid 1px ' + Colors.primary,
                marginRight: 20
              }}/>

            <Button
              title={'Dispute'}
              onClick={() => {
                this.setState({
                  disputeModal: true
                })
              }}
              style={{
                backgroundColor: 'transparent',
                color: Colors.primary,
                border: 'solid 1px ' + Colors.primary
              }}/>
          </span>

          <span style={{
            color: Colors.primary,
            width: '100%',
            textAlign: 'right',
            float: 'left',
            marginTop: 25
          }}
          className="href-link"
          >
            <p style={{
              fontWeight: 'bold',
              textDecoration: 'underline',
            }}>
            View KeyHelpa's Terms And Conditions
            </p>
          </span>
        </div>
              
      </div>
    )
  }
  // previewHeader(data){
  //   return(
  //     <div style={{
  //       borderBottom: 'solid 1px ' + Colors.lightGray,
  //       ...style.full,
  //     }}>

  //       <div style={{
  //         width: '60%',
  //         float: 'left',
  //         paddingBottom: 20,
  //         padding: 20,
  //       }}>

  //         <div style={{
  //           float: 'left',
  //           marginRight: 20
  //         }}>
  //           <ProfilePicture
  //             size={150}
  //           />
  //         </div>

  //         <div style={{
  //           float: 'left'
  //         }}>
  //           {
  //             this.renderDetails(data)
  //           }
  //         </div>
          
  //       </div>
  //       <div style={{
  //         width: '40%',
  //         float: 'left',
  //         paddingRight: 20
  //       }}>
  //         <span style={{
  //           float: 'right',
  //           width: '100%',
  //           textAlign: 'right',
  //           marginTop: 25
  //         }}>
  //           <Button
  //             title={'Pause'}
  //             onClick={() => {
  //               this.setState({
  //                 pauseModal: true
  //               })
  //             }}
  //             style={{
  //               backgroundColor: 'transparent',
  //               color: Colors.primary,
  //               border: 'solid 1px ' + Colors.primary,
  //               marginRight: 20
  //             }}/>

  //           <Button
  //             title={'End'}
  //             onClick={() => {
  //             }}
  //             style={{
  //               backgroundColor: 'transparent',
  //               color: Colors.primary,
  //               border: 'solid 1px ' + Colors.primary,
  //               marginRight: 20
  //             }}/>

  //           <Button
  //             title={'Dispute'}
  //             onClick={() => {
  //               this.setState({
  //                 disputeModal: true
  //               })
  //             }}
  //             style={{
  //               backgroundColor: 'transparent',
  //               color: Colors.primary,
  //               border: 'solid 1px ' + Colors.primary
  //             }}/>
  //         </span>

  //         <span style={{
  //           color: Colors.primary,
  //           width: '100%',
  //           textAlign: 'right',
  //           float: 'left',
  //           marginTop: 25
  //         }}
  //         className="href-link"
  //         >
  //           <p style={{
  //             fontWeight: 'bold',
  //             textDecoration: 'underline',
  //           }}>
  //           View KeyHelpa's Terms And Conditions
  //           </p>
  //         </span>
  //       </div>
              
  //     </div>
  //   )
  // }
  // candidateHeader(data){
  //   return(
  //     <div style={{
  //       borderBottom: 'solid 1px ' + Colors.lightGray,
  //       ...style.full,
  //     }}>

  //       <div style={{
  //         width: '60%',
  //         float: 'left',
  //         paddingBottom: 20,
  //         padding: 20,
  //       }}>

  //         <div style={{
  //           float: 'left',
  //           marginRight: 20
  //         }}>
  //           <ProfilePicture
  //             size={150}
  //           />
  //         </div>

  //         <div style={{
  //           float: 'left'
  //         }}>
  //           {
  //             this.renderDetails(data)
  //           }
  //         </div>
          
  //       </div>
  //       <div style={{
  //         width: '40%',
  //         float: 'left',
  //         paddingRight: 20
  //       }}>
  //         <span style={{
  //           float: 'right',
  //           width: '100%',
  //           textAlign: 'right',
  //           marginTop: 25
  //         }}>
  //           <Button
  //             title={'Pause'}
  //             onClick={() => {
  //               this.setState({
  //                 pauseModal: true
  //               })
  //             }}
  //             style={{
  //               backgroundColor: 'transparent',
  //               color: Colors.primary,
  //               border: 'solid 1px ' + Colors.primary,
  //               marginRight: 20
  //             }}/>

  //           <Button
  //             title={'End'}
  //             onClick={() => {
  //             }}
  //             style={{
  //               backgroundColor: 'transparent',
  //               color: Colors.primary,
  //               border: 'solid 1px ' + Colors.primary,
  //               marginRight: 20
  //             }}/>

  //           <Button
  //             title={'Dispute'}
  //             onClick={() => {
  //               this.setState({
  //                 disputeModal: true
  //               })
  //             }}
  //             style={{
  //               backgroundColor: 'transparent',
  //               color: Colors.primary,
  //               border: 'solid 1px ' + Colors.primary
  //             }}/>
  //         </span>

  //         <span style={{
  //           color: Colors.primary,
  //           width: '100%',
  //           textAlign: 'right',
  //           float: 'left',
  //           marginTop: 25
  //         }}
  //         className="href-link"
  //         >
  //           <p style={{
  //             fontWeight: 'bold',
  //             textDecoration: 'underline',
  //           }}>
  //           View KeyHelpa's Terms And Conditions
  //           </p>
  //         </span>
  //       </div>
              
  //     </div>
  //   )
  // }
  // Subheader
  contractSubheader(data){
    return(
      <div style={{
        borderBottom: 'solid 1px ' + Colors.lightGray,
        ...style.full,
        border: "1px solid" + Colors.borderGray
      }}>
        <Row>
          
          <Col style={{
            display: 'flex',
            flexFlow: 'column wrap',
            alignItems: 'center'
          }}>
            <Col>
              <p style={{
                fontWeight: 'bold',
                color: Colors.gray,
              }}>
                {data.job.id}
              </p>
            </Col>
            <Col>
              <p style={{
                fontWeight: 'bold',
                color: Colors.gray
              }}>Contract Number</p>
            </Col>
          </Col>

          <Col style={{
            display: 'flex',
            flexFlow: 'column wrap',
            alignItems: 'center'
          }}>
            <Row>
              <p style={{
                fontWeight: 'bold',
                color: Colors.gray
              }}>
                {data.account.merchant.name}
              </p>
            </Row>
            <Row>
              <p style={{
                fontWeight: 'bold',
                color: Colors.gray
              }}>Hired By</p>
            </Row>
          </Col>

          <Col style={{
            display: 'flex',
            flexFlow: 'column wrap',
            alignItems: 'center'
          }}>
            <Row>
              <p style={{
                fontWeight: 'bold',
                color: Colors.gray
              }}>
                {data.job.created_at}
              </p>
            </Row>
            <Row>
              <p style={{
                fontWeight: 'bold',
                color: Colors.gray
              }}>Contract Date</p>
            </Row>
          </Col>

          <Col style={{
            display: 'flex',
            flexFlow: 'column wrap',
            alignItems: 'center'
          }}>
            <Row>
              <p style={{
                fontWeight: 'bold',
                color: Colors.gray
              }}>
                { // Still unclear
                data.account.merchant.name} 
              </p>
            </Row>
            <Row>
              <p style={{
                fontWeight: 'bold',
                color: Colors.gray
              }}>Parties</p>
            </Row>
          </Col>
          
        </Row>
      </div>
    )
  }
  // Modals
  renderDisputeModal(){
    const {disputeModal} = this.state;
    return (
      <TextModal
        show={disputeModal}
        title={'Open Dispute'}
        withInput={true}
        actions={[{
          title: 'Ok'
        }]}
        onClick={()=>{
          this.setState({
            disputeModal: false
          })

        }}
        onCancel={()=>{
          this.setState({
            disputeModal: false
          })
        }}
      />
    );
  }
  renderPause(){
    const {pauseModal} = this.state;
    return (
      <TextModal
        show={pauseModal}
        title={'Pause Contract'}
        withInput={true}
        actions={[{
          title: 'Ok'
        }]}
        onClick={()=>{
          this.setState({
            pauseModal: false
          })

        }}
        onCancel={()=>{
          this.setState({
            pauseModal: false
          })
        }}
      />
    );
  }

  
  // Left
  contractLeft(data){
    return(
      <div style={{...style.full,
        paddingLeft: 20,
        paddingRight: 20,
        color: Colors.gray
      }}>

        {
          this.renderRow({
            value: '$' + data.job.job_terms.hourly_rate + '/hr',
            label: 'Hourly Rate'
          })
        }

        {
          this.renderRow({
            value: data.job.job_terms.hourly_rate * data.job.job_terms.hours_per_day,
            label: 'Weekly Payment'
          })
        }
        {
          this.renderRow({
            value: data.job.accept_weekly_payment,
            label: 'Total Value'
          })
        }
        {
          this.renderRow({
            // still working on the calculations
            // value: Math.ceil(((Math.abs(data.job.updated_at.getTime() - data.jobs.created_at.getTime())) / 1000 * 3600 * 24) / 5),
            label: 'Total Number of Weeks'
          })
        }
        {
          this.renderRow({
            // value: Math.ceil((Math.abs(data.job.updated_at.getTime() - data.jobs.created_at.getTime())) / 1000 * 3600 * 24),
            label: 'Total Number of Hours'
          })
        }

        {
          this.renderRow({
            // value: data.jobs.job_terms.daily_schedule,
            label: 'Time Slot'
          })
        }
        {
          this.renderRow({
            value: data.job.job_terms.date,
            label: 'Job Dates'
          })
        }
        {
          this.renderRow({
            // value: data.popularity,
            value: '70%',
            label: 'Job Popularity'
          })
        }
      </div>
    )
  }

  
  // Right
  contractRight(data){
    let tasks = data.job.requirements ? JSON.parse(JSON.stringify(data.job.requirements)).task : null;
    return(
      <div style={{...style.full,
        borderLeft: "1px solid" + Colors.borderGray
      }
      }>
          {
            this.renderText({
              title: 'About the Job',
              content: () => {
                  return(
                    <span>
                      {data.job.description}
                    </span>
                  )
                }
              },
              true
            )
          }
          {
            this.renderText({
              title: 'Task & Responsibilities',
              content: () => {
                return(
                  <ul>
                    {tasks.map(item => (
                      <li>{item}</li>
                    ))}
                  </ul>
                )
                }
              },
              true
            )
          }
          {
            this.renderText({
              title: 'Job Requirements',
              content: () => {
                  return(
                    <div style={{
                      width: '100%',
                      float: 'left'
                    }}>
                      <span>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}>
                          <div style={{
                            width: '100%',
                            float: 'left'
                          }}>
                          <span>
                            <p style={{fontWeight: 'bold'}}>{data.job.requirements.experience.title}</p>
                            <p>Experience in Real Estate Industry</p>
                          </span>
                          <span>
                            <p style={{fontWeight: 'bold'}}>{data.job.requirements.cert.certifications.title}</p>
                            <p>License</p>
                          </span>
                          </div>
                        </div>

                        <div style={{
                          width: '100%'
                        }}>
                          <div style={{
                            width: '100%',
                            float: 'left'
                          }}>
                            
                          <span>
                            <p style={{fontWeight: 'bold'}}>{data.job.requirements.cert.certifications.title}</p>
                            <p>Experience as Sales Assistant</p>
                          </span>
                          <span>
                            <p style={{fontWeight: 'bold'}}>{data.job.requirements.insurance.vaccine.vaccine.title}</p>
                            <p>Vaccination Status</p>
                          </span>
                          </div>
                        </div>
                          
                      </span>
                    </div>
                  )
                }
              },
              true
            )
          }
          {
            this.renderText({
              title: 'About the Agency',
              content: () => {
                return(
                  <span>
                    {data.job.summary}
                  </span>
                )
                }
              }
            )
          }
      </div>
    )
  }
  
  render() {
    const { data } = this.props;
    const { disputeModal, endModal, pauseModal } = this.state;
    return (
      (this.props.asContract) && (<div style={{
        width: '101%',
        borderRadius: 12,
        minHeight: 200,
        overflowY: 'hidden',
        overflowX: 'hidden',
        backgroundColor: Colors.activeGray,
        marginBottom: 25
      }}>
          {
            (this.props.asContract) && (this.contractHeader(data))
          }
          {
            (this.props.asContract) && (this.contractSubheader(data))
          }
          {
            // (this.props.asPreview) && (this.previewHeader(data))
          }
          {
            // (this.props.asCandidate) && (this.candidateHeader(data))
          }
          <div style={{
            width: '100%',
            float: 'left'
          }}>
            <div style={{
              width: '20%',
              float: 'left'
            }}>
              {
                (this.props.asPreview || this.props.asContract) && (this.contractLeft(data))
              }
              {
                // (this.props.asCandidate) && (this.candidateLeft)
              }
            </div>

            <div style={{
              width: '80%',
              float: 'left',
              borderLeft: 'solid 1px ' + Colors.lightGray
            }}>
              {
                (this.props.asPreview || this.props.asContract) && (this.contractRight(data))
              }
              {
                // (this.props.asCandidate) && (this.candidateRight)
              }
            </div>
          </div>
          {
            disputeModal && (this.renderDisputeModal())
          }
          {
            endModal && (this.renderEnd())
          }
          {
            pauseModal && (this.renderPause())
          }
      </div>)
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

