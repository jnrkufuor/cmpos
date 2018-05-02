
  var app = angular.module('pos-app');

  JAPPKEY = "yQQS8xtuWOCovG0qZhs6I/uLXsMmYh5tjMcGtXqhvtc";

  app.controller('LoginController', ['$scope','$http', 'ToastService', '$location', '$rootScope', function($scope, $http, ToastService, $location, $rootScope){
		
		var thisController = this;


		this.user_credentials = {
			email: '',
			password: ''
		};
		var req = {
		 method: 'POST',
		 url: $rootScope.apiUrl +'/login',
		 headers: {
		   'appkey' : JAPPKEY
		 },
		 data: this.user_credentials
		};

		thisController.loggingin = true;
		
		
		this.login = function(){
			$http(req).then(function(response){
				if ((response.status) == "200") {
					$rootScope.user_info = response.data;
					localStorage.setItem("userinfo",  JSON.stringify(response.data));
					ToastService.success('Successfully logged in');
					
					$location.path( "/stores" );
				}
				else if((response.status) == "401"){
					thisController.loggingin = false;

					ToastService.error('Wrong email or password!');
				}
				
			});
		};


		


		
	}]);
	
   	app.controller('LogoutController', ['$scope','$http',  function($scope, $http){
		var userinfo = JSON.parse(localStorage.getItem("userinfo" ));
		console.log(userinfo.id[0].email);
		this.user_email = userinfo.email;
		var req = {
		 method: 'GET',
		 url: 'http://luigi-api.bycavemen.com/api/logout',
		 headers: {
		   'appkey' : JAPPKEY
		 },
		 data: this.user_email
		};
		this.logout = function(){
			$http(req).then(function(response){
				if ((response.status) == "200") {
					localStorage.removeItem("userinfo");
				}
				else{
					console.log("no");
				}
				
			});
		};
	}]);

		app.config(['$httpProvider', function ($httpProvider) {
	    $httpProvider.interceptors.push(function ($q) {
	        return {
	            'response': function (response) {
	                //Will only be called for HTTP up to 300
	                // console.log(response);
	                return response;
	            },
	            'responseError': function (rejection) {
	                if(rejection.status === 401) {
	                	var message = "Invalid email or password";
				         var x = document.getElementById("snackbar");
			            x.style.backgroundColor = "#BF6359";
			            x.innerHTML = "<span><img src='web/img/error_white.svg'></span>" + message;
			            x.className = "show";
			            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
	                }
	                return $q.reject(rejection);
	            }
	        };
	    });
	}]);



    