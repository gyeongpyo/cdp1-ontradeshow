import React from 'react'
import { Button } from 'antd'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_actions';
import { Descriptions } from 'antd';

function ProductInfo(props) {
	const dispatch = useDispatch();

	const clickHandler = () => {
		/* redux를 사용 */
		dispatch(addToCart(props.detail._id));
		alert("This event is added to your cart");
	}
	return (
		<div>
			 <div>
				<Descriptions
					title="Details"
					bordered
					column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
				>
					<Descriptions.Item label="Tittle">{props.detail.title}</Descriptions.Item>
					<Descriptions.Item label="Address">{props.detail.address}</Descriptions.Item>
					<Descriptions.Item label="Price">${props.detail.price}</Descriptions.Item>
					<Descriptions.Item label="Description">
					
					{props.detail.full_description}
					</Descriptions.Item>
				</Descriptions>
				</div>

			<div style={{ display: 'flex', justifyContent:'center', marginTop: '20px'}}>
				<Button size="large" shape="round" type="primary" onClick={clickHandler}>
					Add to Cart
				</Button>
			</div>
		</div>
	)
}

export default ProductInfo
