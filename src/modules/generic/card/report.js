import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Color } from 'common';

class Stack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          title: 'Total',
          title1: 'earned',
          value: 0,
          percentage: 0
        },
        {
          title: 'Current',
          title1: 'week Earned',
          value: 0,
          percentage: 0
        },
        {
          title: 'Current',
          title1: 'month Earned',
          value: 0,
          percentage: 0
        }
      ]
    }
  }

  manageNumbers(value) {
    var newValue = value;
    if (value >= 1000) {
      var suffixes = ["", "k", "m", "b", "t"];
      var suffixNum = Math.floor(("" + value).length / 3);
      var shortValue = '';
      for (var precision = 2; precision >= 1; precision--) {
        shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(precision));
        var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
        if (dotLessShortValue.length <= 2) { break; }
      }
      newValue = shortValue + suffixes[suffixNum];
    }
    return newValue;
  }

  componentDidMount() {
    if (this.props.data) {
      const { data } = this.props;
      let temp = [
        {
          title: 'Total',
          title1: 'earned',
          value: data.total,
          percentage: parseFloat(data.total_percent).toFixed(0),
          currency: data.currency
        }
      ]
      if(data.current_month  >= 0){
        temp.push({
          title: 'Current',
          title1: 'month Earned',
          value: data.current_month,
          percentage: parseFloat(data.month_percent).toFixed(2),
          currency: data.currency
        })
      }
      if(data.current_week >= 0){
        temp.push({
          title: 'Current',
          title1: 'week Earned',
          value: data.current_week,
          percentage: parseFloat(data.week_percent).toFixed(0),
          currency: data.currency
        })
      }
      this.setState({ data: temp })
    }
  }

  renderCards(item) {
    const { user } = this.props.state;
    return (
      <div className='container-25-full-mobile' style={{
        border: '0.5px solid #D4D4D4',
        borderRadius: 10,
        margin: '0% 3% 3% 0%',
        float: 'left',
        height: '164px',
        flexDirection: 'row',
        display: 'flex'
      }}>
        <div style={{
          width: '120px',
          margin: 20
        }}>
          <CircularProgressbar
            value={item.percentage}
            text={`${item.currency} ${this.manageNumbers(item.value)}`}
            styles={buildStyles({
              rotation: 1,
              strokeLinecap: 'round',
              textSize: '15px',
              pathTransitionDuration: 0.5,
              pathColor: Colors.primary, //user.account_type === 'Freelancer' ? '#E62D7E' : '#35475D', // value
              textColor: Colors.primary, //user.account_type === 'Freelancer' ? '#E62D7E' : '#35475D',
              trailColor: user.account_type === 'Freelancer' ? '#FEF2f7' : '#8e9cad', // all circle
              backgroundColor: '#3e98c7'
            })}
          />
        </div>
        <div style={{
          width: '55%',
          padding: '20px 20px 20px 0px',
          marginTop: 10
        }}>
          <h3>{item.title}</h3>
          <h3>{item.title1}</h3>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 20
          }}>
            <p style={{
              margin: '10px 10px 0px 0px',
              color: Colors.rgbaGray,
            }}>{item.percentage}%</p>
            <svg width="63" height="26" viewBox="0 0 63 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0 26V10.3755L5.60289 18.645L11.8586 14.0553L17.1566 8.95548L22.5442 6.43643L27.8222 8.95548L33.8206 14.6354L39.481 8.95548L45.2619 14.0553L50.9223 3.80797C50.9223 3.80797 52.9538 5.69498 53.7891 7.26675C53.9586 7.58562 62.0776 -1.1916 62.7162 0.137052C63.3548 1.4657 62.7162 26 62.7162 26H0Z" fill="url(#paint0_linear_882_9254)" />
              <defs>
                <linearGradient id="paint0_linear_882_9254" x1="-25.6449" y1="-18.7048" x2="-25.6449" y2="28.4624" gradientUnits="userSpaceOnUse">
                  <stop stop-color={user.account_type === 'Freelancer' ? "#E62D7E" : '#34475D'} />
                  <stop offset="1" stop-color={user.account_type === 'Freelancer' ? "white" : '#F1F5FB'} />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { data } = this.state;
    return (
      <div style={{
        flexDirection: 'row'
      }}>
        {data.map((item) => (
          this.renderCards(item)
        ))}
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
