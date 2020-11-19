import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getCartItems } from '../../../_actions/user_actions'
import UserCardBlock from './Sections/UserCardBlock'
function CartPage(props) {
	const dispatch = useDispatch();
	useEffect(() => {
		let cartItems = [];
		/* 리덕스 user stae에 cart에 정보가 있는지 확인 */
		if (props.user.userData && props.user.userData.cart) {
			if (props.user.userData.cart.length > 0) {
				props.user.userData.cart.forEach(item => {
					/* item.id를 찾아 정보를 가져와야한다. */
					cartItems.push(item.id);
				})
				dispatch(getCartItems(cartItems, props.user.userData.cart));			
			}
		}
	}, [props.user.userData])
	
	return (
		<div style={{ width: '85%', margin: '3rem auto' }}>
			<h1>My Cart</h1>
			<div>
				{/* cartDetail이 없을 때 읽어들여서 오류가 발생한다. */}
				<UserCardBlock products={props.user.cartDetail && props.user.cartDetail.product}/>
			</div>
		</div>
	)
}

export default CartPage