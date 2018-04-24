var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User');
var Post = require('./models/Post');
var Review = require('./models/Review');
var Appointment = require('./models/Appointment');
var auth = require('./controllers/auth');
var cors = require('./services/cors');

var fs = require('fs');
var checkAuthenticated = require('./services/checkAuthenticated');
var multer = require('multer');

app.use(bodyParser.json());
app.use(cors);

app.get('/api/getuser', checkAuthenticated, function(req, res)
{
	User.findById(req.user, function(err, user)
	{
		res.send(user);
	})
})
app.post('/api/getother', checkAuthenticated, function(req, res)
{
	User.findById(req.body.id, function(err, user)
	{
		res.send(user.userName);
	})
})
app.get('/api/schedule', checkAuthenticated, function(req, res)
{
	var time = JSON.parse(fs.readFileSync('time.json', 'utf8'));
	res.send(time["Schedule"]);
})
app.get('/api/days', checkAuthenticated, function(req, res)
{
	var time = JSON.parse(fs.readFileSync('time.json', 'utf8'));
	res.send(time["Days"]);
})

app.post('/api/appointment', checkAuthenticated, function(req, res)
{
	req.body.appointment.Userid = req.user;

	var appointment = new Appointment(req.body.appointment);

	console.log(appointment);

	appointment.save(function(err,result)	{
		if(err)	{
			res.status(500).send({
				message: err.message
			});
		}
	})
	var newaval = [[], []];
	User.findOne({_id: req.body.appointment.Vendorid}, function(err, user)
	{
		newaval = user.availabilty;

		newaval[req.body.appointment.Date][req.body.appointment.Time] = false;
		User.updateOne({_id: req.body.appointment.Vendorid}, {availabilty : newaval}, function(err, res)
		{
			if(err)
				throw err;
		})
	})
	res.send("Success")
})
app.post('/api/review', checkAuthenticated, function(req, res)
{
	req.body.review.Userid = req.user;

	var review = new Review(req.body.review);

	console.log(review);

	review.save(function(err,result)	{
		if(err)	{
			res.status(500).send({
				message: err.message
			});
		}
	})
	res.send("Success")
})
app.post('/api/reviews', checkAuthenticated, function(req, res)
{
	Review.find({Vendorid: req.body.id}, function(err, reviews)
	{
		res.send(reviews);
		console.log(reviews);
	})
})
app.get('/api/Vappointments', checkAuthenticated, function(req, res)
{
	Appointment.find({Vendorid: req.user}, function(err, appointments)
	{
		res.send(appointments);
	})
})

app.get('/api/Uappointments', checkAuthenticated, function(req, res)
{
	Appointment.find({Userid: req.user}, function(err, appointments)
	{
		res.send(appointments);
	})
})
app.post('/api/updateuser', checkAuthenticated, function(req, res)
{
	console.log(req.user);
	console.log(req.body.data);
	User.updateOne({_id: req.user}, req.body.data, function(err, res)
		{
			if(err)
				throw err;
		});
})
app.post('/auth/register', auth.register);
app.post('/auth/login', auth.login);

app.post('/api/vendors', checkAuthenticated, function(req, res)
{
	User.find({serviceType: req.body.type}, function(err, users)
	{
		res.send(users);
	});
})
app.get('/api/types', function(req, res) {
	var types = JSON.parse(fs.readFileSync('types.json', 'utf8'));
	res.send(types["types"]);
	// body...
})
//app.get('/api/message', GetMessage);
mongoose.connect("mongodb://localhost:27017/test", function(err, db)
{
	 if(!err){
        console.log("we are connected to mongo");
        
        //db.collection('messages').insertOne({'msg':'test'});
    }
    else
    {
    	console.log(err);
    }
})
var server = app.listen(5000, function()
{
	console.log('listening on port', server.address().port)
})
