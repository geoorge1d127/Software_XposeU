export class AppointmentsController {
	constructor($auth, $state, $http, API_URL) {
		'ngInject';
		this.$auth = $auth;
		this.$state = $state;
		this.$http = $http;
		this.API_URL = API_URL;
		this.user = null;
		this.apps = null;
		this.getuser();
		this.hours = "";
		this.gethours();
		this.days = "";
		this.getdays();
		this.rev = false;
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
	getuser()
	{
		var rr = this;
		this.$http.get(this.API_URL + '/api/getuser').then(function(result)
		{
			rr.user = result.data;
			rr.searchapp();
		})
	}
	searchapp()
	{
		var rr = this;
		if(rr.user.type == "Vendor")
		{
			this.$http.get(this.API_URL + '/api/Vappointments').then(function(result)
			{
				rr.apps = result.data;
				console.log(rr.apps);
				for(var i = 0; i < rr.apps.length; i++)
				{
					rr.apps.other = "";
					rr.getother(rr.apps[i].Userid, rr.apps[i]);
				}
			})
		}
		else
		{
			this.$http.get(this.API_URL + '/api/Uappointments').then(function(result)
			{
				rr.apps = result.data;
				console.log(rr.apps);
				for(var i = 0; i < rr.apps.length; i++)
				{
					rr.apps.other = "";
					rr.getother(rr.apps[i].Vendorid, rr.apps[i]);
				}
			})
		}
	}
	getother(id, app)
	{
		var rr = this;
		this.$http.post(this.API_URL + '/api/getother', {id: id}).then(function(result)
		{
			app.other = result.data;
		})
	}
	toggle()
	{
		if(this.rev == false)
			this.rev = true;
		else
			this.rev = false;
	}
	createReview(id)
	{
		this.review.Vendorid = id;
		var rr = this;
		console.log(rr.review);
		this.$http.post(this.API_URL + '/api/review', {review : rr.review}).then(function(result)
		{
			console.log(result.data);

			rr.$state.go('home');
		})
	}
}