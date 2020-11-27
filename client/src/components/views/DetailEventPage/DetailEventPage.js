import React, { useState, useEffect }from 'react'
import axios from 'axios'
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
import { Row, Col } from 'antd';

function DetailEventPage(props) {

	const eventId = props.match.params.eventId;
	const [Product, setProduct] = useState({});

	//console.log('id', eventId);
	useEffect(() => {
		axios.get(`/api/product/products_by_id?id=${eventId}&type=single`)
			.then(res => {
				setProduct(res.data[0]);					
			})
			.catch(err => alert(err))
	}, [])
	return (
		<div style={{ width: '100%', padding: '3rem 4rem'}}>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<h1>{Product.title}</h1>
			</div>
			
			<Row gutter={[16, 16]} >
				<Col lg={12} sm={24}>
					<ProductImage detail={Product}/>
				</Col>
				<Col lg={12} sm={24}>
					<ProductInfo detail={Product}/>
				</Col>
			</Row>
			<br />
		</div>
	)
}

export default DetailEventPage
