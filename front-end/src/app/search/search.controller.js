export class SearchController {
	constructor($auth, $state, $http, API_URL) {
		'ngInject';
		this.$state = $state;
		this.API_URL = API_URL;
		this.$auth = $auth;
		this.$http = $http;
		this.types = "";
		this.getTypes();
		this.vendortype;
		this.results = [];
		this.error = "";
		this.pictures = false;
		this.avail = false;
		this.revi = false;
		this.hours = "";
		this.gethours();
		this.days = "";
		this.getdays();
		this.appointday = null;
		this.appointhour = null;

		this.appointment = 
		{
			Date : null,
			Time : null,
			Vendorid : null,
			Userid : null
		};
	}
	gethours()
	{
		var rr = this;
		this.$http.get(this.API_URL + '/api/schedule').then(function(result) 
		{
			console.log(result.data);
			rr.hours = result.data;
		})
	}

	getdays()
	{
		var rr = this;
		this.$http.get(this.API_URL + '/api/days').then(function(result) 
		{
			rr.days = result.data;
		})
	}
	getTypes()
	{
		var rr = this;
        this.$http.get(this.API_URL + '/api/types').then(function(result)
        {
            rr.types = result.data;
        });
	}
	search()
	{
		var rr = this;
		this.$http.post(this.API_URL + '/api/vendors', {type: this.vendortype}).then(function(result)
		{
			rr.results = result.data;
			if(result.data.length == 0)
				rr.error = "No Vendors Found";
			else
				rr.error = "";
			console.log(rr.error);
			for(var i = 0; i < rr.results.length; i++)
			{
				rr.results[i].avail = false;
				rr.results[i].pictures = false;
				rr.results[i].revi = false;
			}

			console.log(rr.results);
		});
	}
	pics(user)
	{
		user.revi = false;
		user.avail = false;
		if(user.pictures == false)
			user.pictures = true;
		else
			user.pictures = false;
	}
	aval(user)
	{
		if(user.avail == false)
			user.avail = true;
		else
			user.avail = false;
		user.pictures = false;
		user.revi = false;
	}
	revs(user)
	{
		if(user.revi == false)
			user.revi = true;
		else
			user.revi = false;
		user.pictures = false;
		user.avail = false;

		user.reviews = null;
		var rr = this;
		this.$http.post(this.API_URL + '/api/reviews', {id: user._id}).then(function(result)
		{
			user.reviews = result.data;
		})
	}
	createAppoint(user)
	{
		this.appointment.Date = this.appointday;
		this.appointment.Time = this.appointhour;
		this.appointment.Vendorid = user._id;
		var rr = this;
		console.log(rr.appointment);
		this.$http.post(this.API_URL + '/api/appointment', {appointment : rr.appointment}).then(function(result)
		{
			console.log(result.data);

			rr.$state.go('home');
		})
	}
}