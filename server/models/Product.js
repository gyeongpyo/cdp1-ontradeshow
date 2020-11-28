const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
	writer: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	title : {
		type: String,
		maxlength: 50
	},
	category: {
		type: Number,
		default: 1
	},
	startTime: {
		type: Date,
		default: null
	},
	endTime: {
		type: Date,
		default: null
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
		default: 1
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
	sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },
	views: {
		type:Number,
		default: 0
	}
}, { timestamps: true })

// 어떤 attribute를 중점적으로 검색할 것인지 결정한다.
productSchema.index({
	title: 'text',
	simple_description: 'text',
}, {
	// title을 simple_description의 5배 정도 중요하다 가정하고 검색한다.
	weights: {
		title: 5,
		simple_description: 1
	}
})

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }