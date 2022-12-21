import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import Colors from 'common/Colors'
import Ratings from 'modules/generic/form/Rating'
import Button from 'components/increment/generic/form/Button'
import Helper from 'modules/generic/helper/Common'
import { SvgIcon } from '@mui/material';
import { Help, LocationOn, Place, Verified } from '@mui/icons-material';
import { BasicStyles } from 'common';
import { ProgressBar } from 'react-bootstrap';
import ReactTooltip from "react-tooltip";
import HelperConfig from 'common/Helper'
export default class Stack extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	contractStatus(status){
		if(status === 'pause_pending'){
			return 'Pause Contract'
		}else if(status === 'end_pending'){
			return 'End Contract'
		}else{
			return 'Dispute Contract'
		}
	}

	header(data) {
		const { contract } = this.props
		return (
			<div>
				<span style={{
					width: '100%',
					float: 'left'
				}}>
					<h3>{Helper.getFirstLetterCapitalize(data.title)} <i style={{
						color: 'red',
						fontSize: 15
						}}>{HelperConfig.ACCOUNT_TYPE == 'Agent' ? '( ' + (this.contractStatus(contract.status)) + ' )' : null}</i></h3>
				</span>

				<div style={{
					width: '100%',
					float: 'left',
					paddingTop: 20,
					display: 'flex',
					alignItems: 'center'
				}}
					className="unset-flex-mobile"
				>
					<div style={{
						float: 'left',
						paddingRight: 20
					}}
						className="full-width-mobile mb-mobile-15">
						<Ratings value={data.rating} />
					</div>

					<span style={{
						borderLeft: 'solid 1px ' + Colors.gray,
						paddingLeft: 20,
						paddingRight: 20
					}}
						className="hide-on-mobile"
					>
						<b>{data.merchant.name}</b>
					</span>
					<span style={{
						paddingRight: 20,
						float: 'left'
					}}
						className="hide-on-desktop"
					>
						<b>{data.merchant.name}</b>
					</span>
					{
						data.job_terms && (
							<span style={{
								borderLeft: 'solid 1px ' + Colors.gray,
								paddingLeft: 20,
								paddingRight: 20
							}}>
								<b>Hourly: {Helper.getAmountWithCurrency(data.job_terms.currency, data.job_terms.hourly_rate)}</b>
							</span>
						)
					}
				</div>
			</div>
		)
	}

	body(data) {
		return (
			<div style={{
				paddingTop: 20,
				paddingBottom: 20,
				float: 'left'
			}}>
				<p>
					{data.description}
				</p>
			</div>
		)
	}

	tags(data) {
		return (
			<div style={{
				paddingBottom: 20,
				float: 'left'
			}}>
				{
					data && data.map((item) => (
						<div style={{
							height: 30,
							borderRadius: 15,
							marginRight: 20,
							justifyContent: 'center',
							display: 'flex',
							alignItems: 'center',
							backgroundColor: Colors.lightGray,
							color: Colors.primary,
							fontWeight: 'bold',
							paddingLeft: 20,
							paddingRight: 20,
							fontSize: 11,
							float: 'left'
						}}
							className="tag-card-mobile"
						>
							{
								Helper.getFirstLetterCapitalize(item.name)
							}
						</div>
					))
				}
			</div>
		)
	}

	footer(data) {
		return (
			<div style={{
				width: '100%',
				float: 'left'
			}}>
				<div style={{
					width: '100%',
					float: 'left'
				}}
					className="full-width-mobile">
					{/* Tags */}
					{
						data.categories && (
							<div style={{
								width: '100%',
								float: 'left'
							}}>
								{
									this.tags(data.categories)
								}
							</div>
						)
					}
				</div>

				<div style={{
					width: '100%',
					float: 'left',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between'
				}}
					className="full-width-mobile unset-flex-mobile">
					<div style={{
						float: 'left'
					}}
						className="full-width-mobile">

						{/* Sections */}

						<div style={{
							width: '100%',
							float: 'left',
							display: 'flex',
							alignItems: 'center'
						}} className="full-width-mobile unset-flex-mobile">
							<span style={{
								float: 'left',
							}} className="full-width-mobile mt-mobile-15">
								<span style={{
								}}>
									<SvgIcon
										component={Verified}
										style={{
											fontSize: BasicStyles.largeIcon,
											color: data.merchant && data.merchant.payment_verified ? Colors.primary : Colors.gray,
											paddingRight: 5
										}} />
									Payment method
								</span>
							</span>

							{
								data.matching_score && (
									<span style={{
										float: 'left',
										paddingLeft: 20,
										paddingRight: 20,
										display: 'flex',
										alignContent: 'center',
										alignItems: 'center',
										marginBottom: 4
									}}
										className="padding-unset full-width-mobile mt-mobile-15"
									>

										<span
											style={{
												float: 'left'
											}}
											data-tip="The score shows<br />how popular the job<br />from this Agent. ">
											<ReactTooltip place="top" type="light" effect="solid" multiline={true} />
											<SvgIcon
												style={{
													fontSize: BasicStyles.largeIcon,
													color: Colors.primary,
													paddingRight: 5
												}}
												component={Help}
												className="href-link"
											/>
										</span>
										<span style={{
											float: 'left'
										}}><b>Matching score</b></span>


										<div style={{
											width: 150,
											marginLeft: 10,
											float: 'left'
										}}>
											<ProgressBar
												now={data.matching_score}
												label={`${data.matching_score}%`}
												variant="progress-bar-color"
											/>
										</div>
									</span>
								)
							}



							{
								data.region && (
									<span style={{
										float: 'left'
									}}

										className="full-width-mobile mt-mobile-15"
									>
										<span style={{
										}}>
											<SvgIcon
												component={Place}
												style={{
													marginRight: 5,
													fontSize: BasicStyles.largeIcon,
													color: Colors.primary
												}}
											/>
											<b>{data.region}</b>
										</span>
									</span>
								)
							}


						</div>
					</div>

					{/* Button  */}
					<span className="full-width-mobile">

						<Button
							title={'Accept'}
							onClick={() => {
								this.props.accept(this.props.contract)
							}}
							style={{
								float: 'left',
								backgroundColor: Colors.primary,
								color: Colors.white,
								marginRight: 10
							}}
							className="full-width-mobile mt-mobile-25"
						/>
						<Button
							title={'Decline'}
							onClick={() => {
								this.props.decline(this.props.contract)
							}}
							style={{
								float: 'left',
								backgroundColor: 'transparent',
								color: Colors.primary,
								border: 'solid 1px ' + Colors.primary
							}}
							className="invert-color full-width-mobile mt-mobile-25"
						/>
					</span>
				</div>
			</div>
		)

	}

	render() {
		const { data } = this.props;
		return (
			<div
				style={{
					width: '100%',
					borderRadius: 12,
					minHeight: 200,
					overflowY: 'hidden',
					backgroundColor: Colors.activeGray,
					padding: 20,
					marginBottom: 25
				}}
				onClick={() => {
				}}
			>
				{
					this.header(data)
				}
				{
					this.body(data)
				}
				{
					this.footer(data)
				}
			</div>
		)
	}
}