const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
	writer: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	ex_name : {
		type: String,
		maxlength: 50
	},
	simple_description: {
		type: String,
	},
	price: {
		type: Number,
		default: 0
	},
	num_of_participants: {
		type: Number,
		default: 0
	},
	full_description: {
		type: String,
	},
	is_online: {
		type: String,
	},
	address: {
		type: String,
	},
	images: {
		type: Array,
		default: []
	},
	views: {
		type:Number,
		default: 0
	}
}, { timestamps: true })


const Product = mongoose.model('Product', productSchema);

module.exports = { Product }