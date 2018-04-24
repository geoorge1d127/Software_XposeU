var mongoose = require('mongoose');
module.exports = mongoose.model('Appointment',{
	Date: Number,
	Time: Number,
	Vendorid: String,
	Userid: String
});