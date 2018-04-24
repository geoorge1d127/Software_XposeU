var mongoose = require('mongoose');
module.exports = mongoose.model('Post',{
	Vendorid : String,
	Likes : Number,
	Text : String
});