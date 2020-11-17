const categories = [
	{"_id": 1, "name": "Business"},
	{"_id": 2, "name": "IT development"},
	{"_id": 3, "name": "Automobile" },
	{"_id": 4, "name": "Media"}
]

const price = [
	{
		"_id": 0,
		"name": "free/charge",
		"array": []
	},
	{
		"_id": 1,
		"name": "free",
		"array": [0, 0]
	},
	{
		"_id": 2,
		"name": "charge",
		"array": [0, 100000000]
	}
]
export {
	categories,
	price
}