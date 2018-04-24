export class EditController {
	constructor($auth, $state, $http, API_URL) {
		'ngInject';
		this.$auth = $auth;
		this.user = null;
		this.$http = $http;
		this.API_URL = API_URL;
		this.getuser();
		this.tempPic = "";
		this.hours = "";
		this.serviceTypes = ""
		this.getTypes();
		this.days = "";
		this.getdays();
		this.gethours();
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
	change()
	{
		console.log(this.user);
	}
	getuser()
	{
		var rr = this;
		this.$http.get(this.API_URL + '/api/getuser').then(function(result)
		{
			rr.user = result.data;
			if(!rr.user.pics)
			{

				rr.user.pics = [];
			}
			if(!rr.user.availabilty)
			{
				rr.user.availabilty = [[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]];
			
			console.log(rr.user.availabilty);
			}
		})
	}
	updateuser()
	{
		var rr = this;
		this.$http.post(this.API_URL + '/api/updateuser', {data: rr.user}).then(function(result)
		{
			
			console.log(result.data);
		})
	}
	addpic()
	{
		console.log(this.user);
		this.user.pics.push(this.tempPic);
	}
	deletepic(index)
	{
		this.user.pics.splice(index, 1);
	}
	getTypes()
	{
		var rr = this;
        this.$http.get(this.API_URL + '/api/types').then(function(result)
        {
            rr.servicetypes = result.data;
        });
	}
	set(i, j)
	{
		if(this.user.availabilty[i][j] == false)
			this.user.availabilty[i][j] = true;
		else
			this.user.availabilty[i][j] = false;

		console.log(this.user.availabilty[i][j]);
	}

}