import React, { useState, useEffect }from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios';
import { Icon, Col, Card, Row, Button } from 'antd';
import Meta from 'antd/lib/card/Meta';
import Checkbox from './Sections/CheckBox';
import { categories } from './Sections/Datas';

function SearchPage() {

	const [Events, setEvents] = useState([]);
	const [Skip, setSkip] = useState(0);
	const [Limit, setLimit] = useState(8);
	const [PostSize, setPostSize] = useState();

    useEffect(() => {
		let body = {
			skip: Skip,
			limit: Limit
		}
		getEvents(body);
        
	}, []);
	
	const getEvents = (body) => {
		axios.post('/api/product/products', body)
            .then(response => {
                if (response.data.success) {
					if (body.loadMore) {
						setEvents([...Events, ...response.data.info]);
					} else {
						setEvents(response.data.info);
					}
					setPostSize(response.data.postSize);
                } else {
                    alert('fail to load events');
                }
            })
	}

	const loadMoreHandler = () => {
		let skip = Skip + Limit;
		let body = {
			skip: Skip,
			limit: Limit,
			loadMore: true
		}
		getEvents(body);
		setSkip(skip);
	};


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

			<Checkbox list={categories}></Checkbox>


			<Row gutter={[16, 16]}>
				{renderCards}
			</Row>
		

			<br />
			{PostSize >= Limit && 
				<div style={{ display: 'flex', justifyContent: 'center'}}>
					<Button onClick={loadMoreHandler}> More </Button>
				</div>	
			}	
		</div>
    );
}

export default SearchPage