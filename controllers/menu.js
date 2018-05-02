
  var app = angular.module('pos-app');


  app.controller('MenuController', ['$scope','$http', '$location','ModalService', 'NavParam', '$rootScope', function($scope, $http, $location,ModalService, NavParam, $rootScope){
      
        // $controller('RegisterController', {$scope: $scope})

            this.selectedStore = JSON.parse(localStorage.getItem("storeInfo"));
    this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
    this.register = JSON.parse(localStorage.getItem("registerInfo"));

        mController = this;

        this.initializeOrderDetails = function(){
          $scope.$broadcast ('initializeOrder'); 
        }

         this.reloadActiveTab = function(){
          $scope.$broadcast ('reloadActiveTab'); 
        }

        this.loadCustomers = function(){
          $scope.$broadcast ('loadCustomers'); 
        }

        this.getExpectedCash = function(){
          $scope.$broadcast ('getExpectedCash'); 
        }


        this.redirect = function(url) {
          $location.path(url);
          NavParam.setState('');
        };

        this.switchTab =function(urlNew,urlOld){
          this.curtab = urlNew;
          // console.log(this.curtab);
          if(urlNew == 'pos'){
          $('#'+urlNew).addClass('active');
          $('#'+urlOld).removeClass('active');
         }
           else if(urlNew == 'orders'){
          $('#'+urlNew).addClass('active');
          $('#'+urlOld).removeClass('active');
          mController.reloadActiveTab();
         }

          else if(urlNew == 'customers'){
          mController.loadCustomers();
         }
        };

        this.openMenu = function(){

          $('.nav').toggleClass('expanded');
          $('.foot-hamburger-container').toggleClass('no-border');
  
          };


        this.openCloseRegister = function(){
          mController.getExpectedCash();
          $('.nav').toggleClass('expanded');
          $('.foot-hamburger-container').toggleClass('no-border');
          ModalService.Open('closeRegister');

        };



jQuery(document).ready(function() {

    $(document).click(function (e) {
     var target = $(e.target);
             if (!target.closest('.menu-bar').length) {

            $('#side-bar-nav').removeClass('expanded');
            $('.foot-hamburger-container').removeClass('no-border');
       }
    });
});


	}]);
	


