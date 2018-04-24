var mongoose = require('mongoose');
module.exports = mongoose.model('Review',{
	Title: String,
	Text: String,
	Userid: String,
	Vendorid: String
});