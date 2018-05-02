
  var app = angular.module('pos-app');


  app.controller('CustomerController', ['$scope','$http', '$location','ModalService', 'NavParam', '$rootScope', function($scope, $http, $location,ModalService, NavParam, $rootScope){
            var thisController = this;
        this.selectedStore = JSON.parse(localStorage.getItem("storeInfo"));


        this.loadCustomers = function(){

    var req1 = {
                method: 'GET',
                url: $rootScope.apiUrl +'/get_customers/' + thisController.selectedStore.id,
                // url: '../../web/js/dummydata.json',
                headers: {
                'appkey' : $rootScope.JAPPKEY
                },
                    // data: this.user_root_id
                };

        $http(req1).then(function(response){
            if ((response.status)=="200"){
                thisController.customers = response['data'];

            }
            else{
                console.log("no");
            }
        });
    };

      // this.loadCustomers();

         $scope.$on('loadCustomers', function(e) {  
         thisController.loadCustomers();    
        });


	}]);
	