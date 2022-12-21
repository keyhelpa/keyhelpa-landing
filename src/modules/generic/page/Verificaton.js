import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Colors from 'common/Colors'
import Button from 'components/increment/generic/form/Button'
import API from 'services/api'
import Routes from 'common/Routes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Spinner } from 'react-bootstrap';
import PassBase from 'modules/generic/card/Passbase'

class Stack extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false
		}
	}

	submit() {
		const { user } = this.props.state;
		if (user == null) return null
		this.setState({
			isLoading: true
		})
		this.props.clickedApply()	
	}

	body() {
		const { user } = this.props.state;
		return (
			<div style={{
				width: '100%',
				float: 'left',
				textAlign: 'justify'
			}}>
				<p>
					The Digital iD Badge from Australia Post verifies your identity. Give members a greater level of
					comfort and trust in choosing you for jobs and verify your identity with Australia Post’s Digital iD.
				</p>
				<br />
				<p>
					To get verified simply complete the application process and if successful the Digital iD Badge
					will be added to your profile.
				</p>
				<br />
				<p>
					Keep your valid passport or driver’s licence close by during the application - you’ll need it!
					Make sure it shows the same first name, last name and DOB as your KeyHelpa profile.
				</p>
				<br />
				<p>
					Things you'll need:
					<ul>
						<li>Valid passport or driver's license</li>
						{
							user?.account_type === 'Agent' ? (
								<li style={{ marginTop: '1%' }}>A matching iD and profile name.</li>
							) : (
								<li style={{ marginTop: '1%' }}>DOB that match your profile</li>
							)
						}
					</ul>
				</p>
				<br />
				<br />
				{
					user && user.status != '/ongoing_verification' && (
						<div style={{
							width: '100%',
							float: 'left',
						}}>

							<span style={{
								width: '100%',
								height: 60,
								marginBottom: 25,
								display: 'flex',
								alignContent: 'center',
								alignItems: 'center',
								borderRadius: 25,
								padding: 20,
								color: Colors.gray,
								backgroundColor: Colors.activeGray,
								fontStyle: 'italic'
							}}>
								<h5
									style={{ fontWeight: 600, fontSize: '12px' }}>
									Digital iD uses advanced encryption technology to safely guard your personal data.
								</h5>
							</span>
						</div>
					)
				}
				<br />

			</div>
		)
	}

	footer() {
		const { isLoading } = this.state;
		const { user } = this.props.state;
		return (
			<div style={{
				width: '100%',
				float: 'left'
			}}>
				<br />
				{
					!isLoading && user && user.status != '/ongoing_verification' && (
						// <Button
						// 	title={'Apply'}
						// 	onClick={() => {
						// 		this.submit()
						// 	}}
						// 	style={{
						// 		float: 'left',
						// 		backgroundColor: Colors.primary,
						// 		color: Colors.white
						// 	}} />
						<PassBase />
					)
				}
				{
					!isLoading && user && user.status == '/ongoing_verification' && (
						<div style={{
							width: '100%',
							float: 'left',
							marginTop: 25
						}}>
							<p style={{
								color: Colors.danger
							}}>
								<b>Your profile is now under review.</b>
							</p>
						</div>
					)
				}
				{
					isLoading && (
						<Spinner animation="border" />
					)
				}
			</div>
		)

	}



	render() {
		return (
			<div style={{
				width: '100%',
				float: 'left',
			}}>
				<div style={{
					width: '60%',
					float: 'left'
				}}
					className="full-width-mobile">
					{
						this.body()
					}
				</div>

				<div style={{
					width: '100%',
					float: 'left'
				}}
					className="full-width-mobile">
					{
						this.footer()
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
		login: (user, token) => { dispatch(actions.login(user, token)) }
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Stack));

