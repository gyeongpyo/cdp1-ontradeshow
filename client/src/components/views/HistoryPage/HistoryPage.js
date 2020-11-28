import React from 'react'

function HistoryPage(props) {
	return (
		<div sytle={{ width: '80%', margin: '3rem auto'}}>
			<div style={{ textAlign: 'center' }}>
				<h1> History </h1>
			</div>
			<br />

			<table>
				<thread>
					<tr>
						<th>Payment Id</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Date of Purchase</th>
					</tr>
				</thread>
				<tbody>
					{props.user.userData &&
						props.user.userData.history.map(item => (
							<tr key={item.id}>
								<td>{item.id}</td>
								<td>{item.price}</td>
								<td>{item.quantity}</td>
								<td>{item.dateOfPurchase}</td>
							</tr>
						))
					}
				</tbody>
			</table>
			
		</div>
	)
}

export default HistoryPage
