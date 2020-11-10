import React, { useEffect }from 'react'
import axios from 'axios'

function DetailEventPage(props) {

	const eventId = props.match.params.eventId;
	console.log('id', eventId);
	useEffect(() => {
		axios.get(`/api/product/products_by_id?id=${eventId}&type=single`)
			.then(res => {
				if (res.data.success) {
					console.log('res.data: ', res.data);
				} else {
					alert('Fail to load the detail information of the event')
				}
			})
	}, [])
	return (
		<div>
			DetailEventPage
		</div>
	)
}

export default DetailEventPage
