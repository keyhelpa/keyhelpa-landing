import { useDropzone } from 'react-dropzone';
import { CloudUploadOutlined } from '@mui/icons-material';
import { SvgIcon } from '@mui/material';
import Colors from 'common/Colors'
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class FileDropZone extends Component {
	constructor(props) {
		super(props);
		this.onDrop = (files) => {
			this.setState({ files })
			this.props.handleFiles(files)
		};
		this.state = {
			files: []
		};
	}

	render() {
		const files = this.state.files.map(file => (
			<li key={file.name}>
				{file.name} - {file.size} bytes
			</li>
		));

		return (
			<Dropzone onDrop={this.onDrop} noClick={true} maxFiles={1}>
				{({ getRootProps, getInputProps }) => (
					<section className="container" style={{
						display: 'flex',
						justifyContent: 'center',
						textAlign: 'center'
					}}>
						<div {...getRootProps({ className: 'dropzone' })}>
							<input {...getInputProps()} />
							<span style={{
								width: '100%',
								float: 'left'
							}}>
								<SvgIcon
									component={CloudUploadOutlined}
									style={{
										fontSize: 75,
										color: Colors.gray
									}}
								/>
							</span>
							{
								this.props.layout ? (
									<span style={{
										width: '100%',
										float: 'left',
										marginTop: 10
									}}>
										<p style={{
											fontWeight: 'bold'
										}}>Drag & upload your CV or Resume</p>
									</span>
								) : (
									<span style={{
										width: '100%',
										float: 'left',
										marginTop: 10
									}}>
										<p style={{
											fontWeight: 'bold'
										}}>Drag & drop to upload</p>
										<p style={{
											color: Colors.primary,
											fontWeight: 'bold'
										}}>or browse</p>
									</span>
								)
							}
						</div>
					</section>
				)}
			</Dropzone>
		);
	}
}

export default FileDropZone;