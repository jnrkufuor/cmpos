
  var app = angular.module('pos-app');


  app.controller('RegisterController', ['$scope','$http','ModalService','ToastService','$location','NavParam', '$rootScope', function($scope, $http, ModalService,ToastService, $location, NavParam, $rootScope){
        var thisController = this;
        this.selectedStore = JSON.parse(localStorage.getItem("storeInfo"));
        this.register = JSON.parse(localStorage.getItem("registerInfo"));
        this.notes = null;


        this.getExpectedCash = function(){
         var req = {
                method: 'GET',
                url: $rootScope.apiUrl +'/get_expected_cash/' + thisController.selectedStore.id + '/' + thisController.register.id  , 
                headers: {
                'appkey' : $rootScope.JAPPKEY
                }
          };
        
        $http(req).then(function(response){
            if ((response.status)=="200"){
                // console.log(response['data']);
                // console.log($rootScope.selectedStore.id + '/' + $rootScope.register.id);
                thisController.expectedCash = response['data'][0].expected_cash;
            }
            else{
                thisController.expectedCash = 0.0;
            }
        });
      }


      $scope.$on('getExpectedCash', function(e) {  
         thisController.getExpectedCash();    
    });


        this.closeRegister = function(){


          var req = {
                method: 'PUT',
                url: $rootScope.apiUrl +'/close_register/'+ thisController.register.id +'/'+ thisController.closingBalance  + '/' + thisController.expectedCash +'/'+ thisController.notes , 
                headers: {
                'appkey' : $rootScope.JAPPKEY
                }
          };
        
        $http(req).then(function(response){
            if ((response.status)=="200"){

                 ModalService.Close('closeRegister');
                 ToastService.success('Register has been successfully closed');
                  $location.path('/stores')
            }
            else{
                 ToastService.success('Register failed to close');
            }
        });

        };


        this.closeModal = function(){
          ModalService.Close('closeRegister');
        }



	}]);