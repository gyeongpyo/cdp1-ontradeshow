import React, { useState, useEffect }from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios';
import { Icon, Col, Card, Row, Button } from 'antd';
import Meta from 'antd/lib/card/Meta';
import Checkbox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import SearchFeature from './Sections/SearchFeature'
import { price, categories } from './Sections/Datas';



function SearchPage(props) {
	//console.log(props.location.state.category);
	const [Events, setEvents] = useState([]);
	const [Skip, setSkip] = useState(0);
	const [Limit, setLimit] = useState(8);
	const [PostSize, setPostSize] = useState();
	const [Filters, setFilters] = useState({
		category: [],
		price: []
	});
	const [SearchTerm, setSearchTerm] = useState("")


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
					cover={<a href={`/event/${event._id}`}>
						<img style={{width: '100%', height: '200px', maxHeight: '200px'}} src={`http://localhost:5000/${event.images[0]}`}/>
						</a>}
					>
					<Meta 
						title={event.title}
						description={`$${event.price}`}
					/>
				</Card>
			</Col>
	})

	const showFilteredResults = (filters) => {
		let body = {
			skip: 0,
			limit: Limit,
			filters: filters
		}

		getEvents(body);
		setSkip(0);
	}

	const handlePrice = (value) => {
		const data = price;
		let array = [];

		for (let key in data) {
			if (data[key]._id === parseInt(value, 10)) {
				array = data[key].array;
			}
		}
		return array
	}

	const handleFilters = (filters, category) => {
		const newFilters = {...Filters};
		newFilters[category] = filters;
		console.log(newFilters);
		if (category === "price") {
			let priceValues = handlePrice(filters)
			newFilters[category] = priceValues;
		}
		showFilteredResults(newFilters);
		setFilters(newFilters);
	}

	const updateSearchTerm = (newSearchTerm) => {
		let body = {
			skip: 0,
			limit: Limit,
			filters: Filters,
			searchTerm: newSearchTerm
		}

		setSkip(0)
		setSearchTerm(newSearchTerm)
		getEvents(body)
	}

    return (
		<div style={{ width: '75%', margin: '3rem auto' }}>
			<div style={{ textAlign: 'center' }}>
				<h2> Event List </h2>
			</div>

		{/* Filter */}
		<Row gutter={[16, 16]}>
			<Col lg={12} xs={24}>
				<Checkbox list={categories} handleFilters={(filters) => handleFilters(filters, "category")}></Checkbox>
			</Col>
			<Col lg={12} xs={24}>
				<RadioBox list={price} handleFilters={(filters) => handleFilters(filters, "price")}></RadioBox>
			</Col>
		</Row>

		{/* Search */}
		<div style={{ display:'flex', justifyContent: 'flex-end', margin: '1rem auto'}}>
			<SearchFeature refreshFunction={updateSearchTerm}/>
		</div>
		

		{/* Card */}
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