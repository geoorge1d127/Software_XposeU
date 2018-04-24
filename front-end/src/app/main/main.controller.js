export class MainController {
  constructor ($http, $sce) {
    'ngInject';

    this.$http = $http;
    this.$sce = $sce;

    this.url = this.$sce.trustAsResourceUrl("http://127.0.0.1:8887/index.html");
  }
  
  
}
