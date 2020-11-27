import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getCartItems, removeCartItem } from '../../../_actions/user_actions'
import UserCardBlock from './Sections/UserCardBlock'
import { Empty } from 'antd';
function CartPage(props) {
	const dispatch = useDispatch();

	const [Total, setTotal] = useState(0);
	const [ShowTotal, setShowTotal] = useState(false); //true이면 total을 보여준다.

	useEffect(() => {
		let cartItems = [];
		/* 리덕스 user stae에 cart에 정보가 있는지 확인 */
		if (props.user.userData && props.user.userData.cart) {
			if (props.user.userData.cart.length > 0) {
				props.user.userData.cart.forEach(item => {
					/* item.id를 찾아 정보를 가져와야한다. */
					cartItems.push(item.id);
				})
				dispatch(getCartItems(cartItems, props.user.userData.cart))			
					.then(res => {calculateTotal(res.payload)})
			}
		}
	}, [props.user.userData])
	
	let calculateTotal = (cartDetail) => {
		let total = 0;

		cartDetail.map(item => {
			total += parseInt(item.price, 10) * item.quantity;
		})
		setTotal(total);
		setShowTotal(true);
	}

	let removeFromCart = (productId) => {
		dispatch(removeCartItem(productId))
			.then(res => {
				if (res.payload.productInfo.length <= 0) {
					setShowTotal(false);
				}
			})
	}

	return (
		<div style={{ width: '85%', margin: '3rem auto' }}>
			<h1>My Cart</h1>
			<div>
				{/* cartDetail이 없을 때 읽어들여서 오류가 발생한다. */}
				<UserCardBlock products={props.user.cartDetail} removeItem={removeFromCart}/>
			</div>

			{ShowTotal ?
				<div style={{ marginTop: '3rem' }}>
					<h2> Total Amount: ${Total}</h2>
				</div>
				:
				<div>
				<br/>
				<Empty description={false}/>
				</div>
			}
		</div>
	)
}

export default CartPage
