export class AuthController {
	constructor($auth, $state, $http, API_URL) {
		'ngInject';
		this.API_URL = API_URL;
		this.$http = $http;
		this.$auth = $auth;
		this.$state = $state;
    	this.isAuthenticated = $auth.isAuthenticated;
    	this.usertype = ["Vendor", "User"];
    	this.servicetypes = ""
    	this.getTypes();
    	this.files = "";
	}
	change()
	{
		console.log(this.user);
	}
	register() {
		//vm == view model
		console.log(this.user);
		var vm = this;
		this.$auth.signup(this.user).then(function(token){
			//vm.$auth.setToken(token);
		});
		this.user = null;
	}
	login() {
		//vm == view model
		var vm = this;
		this.$auth.login(this.login.user).then(function(token){
			vm.$auth.setToken(token);
		});
		this.login.user = null;
		this.$state.go('home');
	}
	getTypes()
	{
		var rr = this;
        this.$http.get(this.API_URL + '/api/types').then(function(result)
        {
            rr.servicetypes = result.data;
        });
	}
}