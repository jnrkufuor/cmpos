
var app = angular.module('pos-app',['ngRoute','datatables']);

app.run(function($rootScope, ToastService) {
    // $rootScope.apiUrl = "http://localhost/cmpos-api/api"; 
    // $rootScope.apiUrl = "http://cmpos-api.bycavemen.com/api";
    // $rootScope.apiUrl = "http://mw.pos-api.bycavemen.com/api"; 
    $rootScope.apiUrl = "http://mw.pos-api.bycavemen.com/api";  
    $rootScope.selectedStore = {};
    $rootScope.register ={};
    $rootScope.user_info = {};
    
    $rootScope.JAPPKEY = "yQQS8xtuWOCovG0qZhs6I/uLXsMmYh5tjMcGtXqhvtc";
})
 
app.config(function($routeProvider) {
  $routeProvider

  .when('/', {
    templateUrl : 'view/layout/login.html',
    controller  : 'LoginController'
  })

  .when('/stores', {
    templateUrl : 'view/layout/stores.html',
    controller  : 'StoreController'
  })

  .when('/pos', {
    templateUrl : 'view/layout/pos.html',
    // controller  : 'AboutController'
  })


  //   .when('/riders', {
  //   templateUrl : 'view/layout/riders.html',
  //   // controller  : 'AboutController'
  // })

  //     .when('/customers', {
  //   templateUrl : 'view/layout/customers.html',
  //   // controller  : 'AboutController'
  // })

  .otherwise({redirectTo: '/'});
});


