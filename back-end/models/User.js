var mongoose = require('mongoose');
module.exports = mongoose.model('User',{
	postLiked: Object,
	firstName: String,
	lastName: String,
	email: String,
	pwd: String,
	type: String,
	serviceType: String,
	description: String,
	phoneNumber: Number,
	userName: String,
	socialMedia: String,
	availabilty: Object,
	pic: Object,
	pics: Object
});
