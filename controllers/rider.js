
  var app = angular.module('pos-app');


  app.controller('RidersController', ['$scope','$http', '$location','ModalService', 'NavParam', '$rootScope', function($scope, $http, $location,ModalService, NavParam, $rootScope){
            var thisController = this;
        this.selectedStore = JSON.parse(localStorage.getItem("storeInfo"));


        this.loadRiders = function(){

                var req = {
                method: 'GET',
                url: $rootScope.apiUrl +'/get_riders/' + thisController.selectedStore.id , 
                headers: {
                'appkey' : $rootScope.JAPPKEY
                }
                };
        
        $http(req).then(function(response){
            if ((response.status)=="200"){
                thisController.riders = response['data'];
                // console.log(thisController.riders);
            }
            else{
                console.log("no");
            }
        });
      };

      this.loadRiders();





	}]);
	