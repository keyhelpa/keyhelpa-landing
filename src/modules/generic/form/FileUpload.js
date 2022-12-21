import React from 'react';
import { BasicStyles } from 'common'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faImage } from '@fortawesome/free-solid-svg-icons'
import Colors from 'common/Colors'
import API from 'services/api'
import Routes from 'common/Routes'
import ProfilePicture from 'modules/generic/card/profilePicture'
import { SvgIcon } from '@mui/material';
import { CloudUploadOutlined } from '@mui/icons-material';
import DropZone from './DropZone';
class Stack extends React.Component {
	constructor(props) {
		super(props);
		this.file = null;
		this.state = {
			selected: []
		};
	}

	updateProfile(url) {
		const { user } = this.props.state;
		if (user == null) return
		let parameter = user.profile ? {
			id: user.profile.id,
			account_id: user.id,
			url: url
		} : {
			account_id: user.id,
			url: url
		}
		this.setState({
			isLoading: true
		})
		API.request(user.profile ? Routes.accountProfileUpdate : Routes.accountProfileCreate, parameter, response => {
			this.setState({
				isLoading: false
			})
			if (response) {
				const { login } = this.props;
				const { token } = this.props.state;
				login({
					...user,
					profile: {
						...user.profile,
						url: url
					}
				}, token)
			}
		}, error => {
			this.setState({
				isLoading: false
			})
		});
	}

	uploadFile(url) {
		const { user } = this.props.state;
		if (user == null) {
			return
		}
		let parameter = {
			account_id: user.id,
			file_url: url,
			category: this.props.category
		}
		API.request(Routes.fileUpload, parameter, response => {
			this.setState({
				isLoading: false
			})
			if (response.data && response.data.data !== null) {
				this.props.onSuccess()
			}
		}, error => {
			this.setState({
				isLoading: false
			})
		})
	}

	fileChangeHandler = (e) => {
		if (e && e.target !== undefined) {
			let files = e.target.files || e.dataTransfer.files
			if (!files.length) {
				return false
			} else {
				this.upload(files[0])
			}
		}
		if(e && e.target == undefined){
			this.upload(e[0])
		}
	}

	upload(file) {
		const { user } = this.props.state;
		if (user == null) return false
		if (file == null) return false
		let formData = new FormData()
		formData.append('file', file)
		formData.append('file_url', file.name)
		formData.append('account_id', user.id)
		formData.append('category', this.props.category ? this.props.category : 'profile')
		this.setState({
			isLoading: true
		})
		API.upload(Routes.imageUpload, formData, response => {
			this.setState({
				isLoading: false
			})
			if (response && response.data && this.props.route == 'account_profiles') {
				this.updateProfile(response.data.data)
			}
			if (response && response.data && this.props.route == 'certificate') {
				this.uploadFile(response.data.data)
			}
			if (response && response.data && this.props.route == 'proposal') {
				this.props.image_url(response.data.data)
			}
		}, error => {
			this.setState({
				isLoading: false
			})
		})
	}

	renderEmpty() {
		return (
			<DropZone {...this.props} handleFiles={(file) => this.fileChangeHandler(file)} />
			// <div style={{
			// 	width: '100%',
			// 	textAlign: 'center'
			// }}
			// 	className="primary-hover"
			// 	onClick={() => {
			// 	}}
			// >
			// 	<span style={{
			// 		width: '100%',
			// 		float: 'left'
			// 	}}>
			// 		<SvgIcon
			// 			component={CloudUploadOutlined}
			// 			style={{
			// 				fontSize: 75,
			// 				color: Colors.gray
			// 			}}
			// 		/>
			// 	</span>
			// 	{
			// 		this.props.layout ? (
			// 			<span style={{
			// 				width: '100%',
			// 				float: 'left',
			// 				marginTop: 10
			// 			}}>
			// 				<p style={{
			// 					fontWeight: 'bold'
			// 				}}>Drag & upload your CV or Resume</p>
			// 			</span>
			// 		) : (
			// 			<span style={{
			// 				width: '100%',
			// 				float: 'left',
			// 				marginTop: 10
			// 			}}>
			// 				<p style={{
			// 					fontWeight: 'bold'
			// 				}}>Drag & drop to upload</p>
			// 				<p style={{
			// 					color: Colors.primary,
			// 					fontWeight: 'bold'
			// 				}}>or browse</p>
			// 			</span>
			// 		)
			// 	}
			// </div>
		)
	}

	render() {
		const { data } = this.props;
		const { active } = this.state;
		return (
			<div style={{
				width: '100%',
				float: 'left'
			}}
				className="cursor-hover">
				<div style={{
					padding: 20,
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					height: 200,
					border: 'dashed 3px ' + Colors.primary,
					borderRadius: 12,
					background: Colors.fileUploadColor
				}}
					onClick={() => {
						this.newFile.click()
					}}
					className="href-link"
				>
					<input
						ref={ref => this.newFile = ref}
						type="file"
						name="file"
						className="file-upload"
						id="newFile"
						accept={this.props.accepted ? this.props.accepted.format : "image/*"}
						onChange={this.fileChangeHandler}
					/>
					{
						data && (
							<div style={{
								width: '100%',
							}}>
								<div style={{
									width: '100%',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center'
								}}>
									<ProfilePicture
										size={this.props.style.width}
										iconSize={'lg'}
										data={data}
									/>
								</div>
								<div style={{
									width: '100%',
									float: 'left',
									textAlign: 'center',
									paddingTop: 10
								}}>
									<p>
										Change image
									</p>
								</div>
							</div>
						)
					}
					{
						data == null && (
							this.renderEmpty()
						)
					}

				</div>
				<span style={{
					width: '100%',
					float: 'left',
					marginTop: 25
				}}>
					{
						this.props.layout ? (
							<span style={{
								float: 'left',
								paddingLeft: 20,
								color: Colors.gray
							}}>
								<p>
									<b style={{
										color: Colors.lightGray
									}}>{'You may attach up to 10 files under the size of 25MB each. Include work samples or other documents to support your application.'}
									</b>
								</p>
							</span>
						) : this.props.noContent ?
							(<div></div>)
							: (
								<div>
									<span style={{
										width: 50,
										height: 50,
										borderRadius: '50%',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										backgroundColor: Colors.primary,
										float: 'left'
									}}>
										<FontAwesomeIcon icon={faImage} color={Colors.white} size="2x" />
									</span>
									<span style={{
										float: 'left',
										paddingLeft: 20,
										color: Colors.gray
									}}>
										<p>
											<b>{this.props.accepted ? this.props.accepted.title : 'Images'}</b>
											<br />

											<b style={{
												color: Colors.lightGray
											}}>{this.props.accepted ? this.props.accepted.label : 'PNG, JPG, in-app cropping'}
											</b>
										</p>
									</span>
								</div>
							)
					}


				</span>
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

