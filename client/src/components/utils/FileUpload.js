import React, { useState }from 'react'
import {createRef} from 'react'
import Dropzone from 'react-dropzone'
import { Button } from 'antd';
import { UploadOutlined,  } from '@ant-design/icons';
import axios from 'axios';

function FileUpload(props) {
	const [Images, setImages] = useState([]);

	const dropzoneRef = createRef();
	const dropHandler = (files) => {
		let formData = new FormData();
		const config = {
			header: { 'content-type': 'multipart/form-data' }
		}
		formData.append("file", files[0]);

		axios.post('/api/product/image', formData, config)
			.then(response => {
				if (response.data.success) {
					setImages([...Images, response.data.filePath]);
					props.refreshFunction([...Images, response.data.filePath]);
				} else {
					alert('Fail to save a file');
				}
			});


	}
	
	const deleteHandler = (image) => {
		const currentIndex = Images.indexOf(image);

		let newImages =  [...Images];
		newImages.splice(currentIndex, 1);

		setImages(newImages);
		props.refreshFunction(newImages);
	}
	return (
		<div>
				<Dropzone ref={dropzoneRef} onDrop={dropHandler}>
					{({getRootProps, getInputProps}) => (
						<div {...getRootProps()}>
							<input {...getInputProps()} />
							<Button icon={<UploadOutlined />}>
								Click to upload
							</Button>
						</div>
					)}
				</Dropzone>
				<div style={{ display: 'flex', width: '600px', height: '240px', overflowX: 'scroll' }}>
					{Images.map((image, index) => (
						<div onClick={() => deleteHandler(image)} key={index}>
							
							<img style={{ minWidth: '300px', width: '300px', height: '220px' }}
								src={`http://localhost:5000/${image}`}
							/>
						</div>
					))}
				</div>
		</div>
	)
}


export default FileUpload