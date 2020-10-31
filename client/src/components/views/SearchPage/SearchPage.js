import React, { useState, useEffect }from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios';
import { Icon, Col, Card, Row, Button } from 'antd';
import Meta from 'antd/lib/card/Meta';

function SearchPage() {

	const [Events, setEvents] = useState([]);
    useEffect(() => {
        axios.post('/api/product/products')
            .then(response => {
                if (response.data.success) {
					console.log(response.data);
					setEvents(response.data.info);
                } else {
                    alert('fail to load events');
                }
            })
	}, []);
	
	const renderCards = Events.map((event, index) => {
		console.log('Event', event);
		return <Col lg={6} md={8} xs={24} key={index}>
				<Card
					cover={<img style={{width: '100%', height: '200px', maxHeight: '200px'}} src={`http://localhost:5000/${event.images[0]}`} />}
					>
					<Meta 
						title={event.title}
						description={`$${event.price}`}
					/>
				</Card>
			</Col>
	})
    return (
		<div style={{ width: '75%', margin: '3rem auto' }}>
			<div style={{ textAlign: 'center' }}>
				<h2> Event List </h2>
			</div>
 
		<Row gutter={[16, 16]}>
			{renderCards}
		</Row>
		

 
		<div style={{ justifyContent: 'center' }}>
			<Button> More </Button>
		</div>
		</div>
    );
}

export default SearchPage