import React, { createRef, Component } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input'
import { BasicStyles } from 'common'
import { Col, Row } from 'react-bootstrap';
import TextInput from './TextInput';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import validator from 'services/validator'
class ContactNumber extends Component {
	constructor(props) {
		super(props)
		this.menu = createRef()
		this.state = {
			countryCode: '63'
		}
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		console.log('>>>>>>>', event.target.value);
		this.setState({ countryCode: event.target.value })
	}

	validateNumber(number, error){
		const {countryCode} = this.state
		if(countryCode == null){
			error = 'Invalid Phone Number'
			this.props.handleMobileNumber(countryCode, number, error)
			return
		}
		if(!validator.checkPhoneNumber('+'+ countryCode + number)){
			error = 'Invalid Phone Number'
			this.props.handleMobileNumber(countryCode, number, error)
			return
		}
		error = null
		this.props.handleMobileNumber(countryCode, number, error)

	}

	render() {
		return (
			<div style={{display: 'flex', flexDirection: 'column'}}>
			<div style={{display: 'flex', flexDirection: 'row'}}>
				<div style={{maxWidth: 100, minWidth: 95, height:53, ...this.props.style}}>
					<Select
						style={{
							...BasicStyles.formControl,
							float: 'left',
							borderTop: 'none',
							borderLeft: 'none',
							...this.props.textColor
						}}
						className="full-width-mobile"
						value={this.state.countryCode}
						ref={(input) => this.menu = input}
						onChange={this.handleChange}
					>
						{this.props.hasFlag === true && getCountries().map((country) => {
							let flag = `https://flag.pk/flags/4x3/${country.toLowerCase()}.svg`;
							return (
								<MenuItem value={getCountryCallingCode(country)} key={country}> <img src={flag}/> {country} (+{getCountryCallingCode(country)})</MenuItem>
							)
						})}
						{this.props.hasFlag === false && getCountries().map((country) => {
							return (
								<MenuItem value={getCountryCallingCode(country)}> {country} (+{getCountryCallingCode(country)})</MenuItem>
							)
						})}
					</Select>
				</div>
				<div  style={{width: '70%'}}>
					<TextInput
						placeholder={'Phone number'}
						type={"tel"}
						style={{
							...this.props.textColor,
							...this.props.style,
							background: 'transparent'
						}}
						inputStyle={{
							...this.props.textColor
						}}
						value={this.props.contactNumber}
						onChange={(mobile, errorMobile, errorPoneNumber) => this.validateNumber(mobile, errorMobile,errorPoneNumber)}
						validation={{
							type: 'text_without_space',
							size: 0,
							column: 'mobile',
							error: this.props.errorMobile
						}}
					/>
				</div>
			</div>
				<div style={{
					width: '100%',
					float: 'left'
				}}>
				{
					this.props.errorMobile && this.props.errorMobile !== 'Please fill up the required fields.' &&	<label style={{
						...this.props.errorStyle

					}}>
						<b>Oops! </b>{this.props.errorMobile}
					</label>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactNumber));
