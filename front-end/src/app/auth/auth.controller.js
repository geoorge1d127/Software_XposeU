export class AuthController {

	constructor($auth) {
		'ngInject';

		this.$auth = $auth;
	}

	register() {
		//vm == view model
		var vm = this;
		this.$auth.signup(this.user).then(function(token){
			vm.$auth.setToken(token);
		});

	}
	login() {
		//vm == view model
		var vm = this;
		this.$auth.login(this.login.user).then(function(token){
			vm.$auth.setToken(token);
		});

	}
}