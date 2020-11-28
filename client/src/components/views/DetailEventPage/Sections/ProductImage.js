import React, { useState, useEffect } from 'react'
import ImageGallery from 'react-image-gallery';

function ProductImage(props) {
	const [Images, setImages] = useState([])
	useEffect(() => {
		if (props.detail.images && props.detail.images.length > 0) {
			let images = [];
			props.detail.images.map(item => {
				images.push({
					original: `http://localhost:5000/${item}`,
					thumbnail: `http://localhost:5000/${item}`
				})
			})
			setImages(images);
		}
	}, [props.detail])

	// image는 포스터 한 개만 있다고 가정
	return (
		<div>
			{Images.length > 0 &&
				<div >
				<img src={Images[0].original} style={{width: '100%', maxHeight:'400px'}} />
			</div>
			}
		</div>
		
	)
}

export default ProductImage
