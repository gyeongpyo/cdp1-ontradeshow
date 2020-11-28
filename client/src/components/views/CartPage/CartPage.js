import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getCartItems, removeCartItem, onSuccessBuy } from '../../../_actions/user_actions'
import UserCardBlock from './Sections/UserCardBlock'
import { Result, Empty } from 'antd';
import Paypal from '../../utils/Paypal'
function CartPage(props) {
	const dispatch = useDispatch();

	const [Total, setTotal] = useState(0);
	const [ShowTotal, setShowTotal] = useState(false); //true이면 total을 보여준다.
	const [ShowSuccess, setShowSuccess] = useState(false);

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
		setShowSuccess(false);
	}

	let removeFromCart = (productId) => {
		dispatch(removeCartItem(productId))
			.then(res => {
				if (res.payload.productInfo.length <= 0) {
					setShowTotal(false);
				}
			})
	}

	const transactionSuccess = (data) => {
		dispatch(onSuccessBuy({
			paymentData: data,
			cartDetail: props.user.cartDetail
		}))
			.then(res => {
				if (res.payload.success) {
					setShowTotal(false);
					setShowSuccess(true);		
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
				: ShowSuccess?
					<Result
						status="success"
						title="Successfully Purchased Items"
		  			/>
					:
				<div>
				<br/>
				<Empty description={false}/>
				</div>
			}

			<div style={{alignItems: 'flex-end'}}>
			{ShowTotal && 
				<Paypal total={Total} onSuccess={transactionSuccess}/>
			}
			</div>
		</div>
	)
}

export default CartPage
