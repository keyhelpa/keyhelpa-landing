import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors';
import VideoCard from 'modules/guides/videoCard'
import './agent.css'
import Data from 'modules/guides/data'
import Config from "common/Config";
class UpdateBankAgent extends Component {
    constructor(props) {
        super(props)
        this.state={
            data: Data.agent,
            url: null
        }
    }
    componentDidMount() {
        this.handleLoad()
    }
    handleLoad(){
        const {data} = this.state;
        return(
            <div>
                {
                    data.map((item)=> {
                        if(this.props.history.location.pathname ===  item.route){
                            this.setState({
                                url: item.url
                            })
                        }
                    })
                }
            </div>
        )
    }
    renderContent() {
        return (
            <div style={{
                marginTop: 30
            }}>
                <p>To update  your bank details, read the following instructions below:</p>
                <ol type='1'>
                    <li>On Agent’s web application, click your profile icon or photo then a dropdown menu will appear. Choose “Settings” and you will be taken to a new sidebar menu. Click the “Billing” on your sidebar menu and you will be redirected to the “Banking details” page.</li>
                    <li>On your “Banking details” page, you will need to remove your current authorized payment method if you want to replace it with a new one. To do this, just click the red trash icon on the card containing your current bank details.</li>
                    <p>Once you have clicked the red trash icon, it will then be removed and you can now input a new payment method, by filling in the following field:</p>
                    <ul>
                        <li>Card Number</li>
                        <li>Expiry Date (MM/YY)</li>
                        <li>CVC (Card Verification Code)</li>
                    </ul>
                    <p>After completing the details of payment, just click the “Authorize” button to save the new payment method. New payment method will automatically be added and saved once it’s verified to be existing and active.</p>
                </ol>
                <p><b className='b-agent'>Reminders</b>:</p>
                <ul>
                    <li>Payment logic: Your credit card will be deducted for the amount equal to a one week payment, until the job contract is completed or cancelled.</li>
                    <li>Payments day: On Monday of each week for the duration of the term of the contract the freelancer submits a payment request. The payment is equal to "weekly payment''. Payer receives a notification email of payment due. The payer is not required to take any action unless he/she declines the payment by clicking the decline link.</li>
                    <li>Decline payment: Payer is required to provide reasons for the cancellation of the contract and for declining payment. - A notification is sent to the freelancer for their reply. The payment held in Stripe is held in Keyhelpa's disputed account until the dispute is settled within the terms and conditions.</li>
                </ul>
                <p>If you have any concerns or inquiries, please don’t hesitate to <a href="../contact_us">contact us</a>. </p>
            </div>
        )
    }

    render() {
        const {url} = this.state;
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
                    Your choice of payment method will be used on payments when making transactions with KeyHelpa. It is important that you keep your account funded enough especially when paying Helpas.                </p>


                    <VideoCard 
                url={url}/>
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UpdateBankAgent));