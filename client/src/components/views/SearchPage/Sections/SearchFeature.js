import React, { useState } from 'react'
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

function SearchFeature(props) {
	const [SearchTerm, setSearchTerm] = useState("")
	const searchHandler = (event) => {
		setSearchTerm(event.currentTarget.value)
		props.refreshFunction(event.currentTarget.value)
	}

	return (
		<div>
			<Search
				placeholder="input search text"
				allowClear
				onChange={searchHandler}
				style={{ width: 200, margin: '0 10px' }}
				value={SearchTerm}
			/>
		</div>
	)
}

export default SearchFeature
