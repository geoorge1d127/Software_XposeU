export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('appointments', {
      url: '/',
      templateUrl: 'app/appointments/appointments.html',
      controller: 'AppointmentsController',
      controllerAs: 'appointments'
    })
    .state('search', {
      url: '/',
      templateUrl: 'app/search/search.html',
      controller: 'SearchController',
      controllerAs: 'search'
    })
    .state('edit', {
      url: '/',
      templateUrl: 'app/edit/edit.html',
      controller: 'EditController',
      controllerAs: 'edit'
    })
    .state('auth', {
      url: '/auth',
      templateUrl: 'app/auth/auth.html',
      controller: 'AuthController',
      controllerAs: 'auth'
    });
  $urlRouterProvider.otherwise('/');
}
