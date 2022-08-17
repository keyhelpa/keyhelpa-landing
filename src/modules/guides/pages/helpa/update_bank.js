import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors';
import VideoCard from 'modules/guides/videoCard'
import './helpa.css'
class UpdateBankHelpa extends Component {
    constructor(props) {
        super(props)
    }
    renderContent(){
        return(
            <div>
                <p>To update  your bank details, read the following instructions below:</p>
                <ol type='1'>
                    <li>On Helpa’s web application, click your profile icon or photo then a dropdown menu will appear. Choose “Settings” and you will be taken to a new sidebar menu. Click the “Billing” on your sidebar menu and you will be redirected to the “Banking details” page.</li>
                    <li>On your “Banking details” page, you will need to remove your current authorized payment method if you want to replace it with a new one. To do this, just click the red trash icon on the card containing your current bank details.</li>
                    <p>Once you have clicked the red trash icon, it will then be removed and you can now input a new payment method, by filling in the following field:</p>
                    <ul>
                        <li>Card Number</li>
                        <li>Expiry Date (MM/YY)</li>
                        <li>CVC (Card Verification Code)</li>
                    </ul>
                    <p>After completing the details of payment, just click the “Authorize” button to save the new payment method. New payment method will automatically be added and saved once it’s verified to be existing and active.</p>
                </ol>
                <p><b className='b-helpa'>Reminders</b>:</p>
                <p>You will require usual online banking details. KeyHelpa uses Stripe for secure payments and financial services.</p>
                <p>If you have any concerns or inquiries, please don’t hesitate to <a href='#'>contact us</a>. </p>
            </div>
        )
    }
    render() {
        const { theme } = this.props;
        return (
            <div style={{
                width: '100%',
                float: 'left'
            }}>
                <p style={{
                    color: theme == 'agent' ? Colors.agentTextTitle : Colors.helpaTextTitle,
                    marginBottom: '5%'
                }}>
                    Your choice of payment method will be used on payments when making transactions with KeyHelpa. It is important that you keep your account active as this is where you will receive your payments from the job you work for from an Agent.
                </p>


                <VideoCard />
                {
                    this.renderContent()
                }
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpdateBankHelpa));