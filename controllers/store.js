    var app = angular.module('pos-app');

    var array =[];

    
    // var globalSelectedStore = JSON.parse(localStorage.getItem ("storeInfo"));
    // var user = JSON.parse(localStorage.getItem ("userinfo"));

    app.controller ('StoreController', ['$scope','$http','ModalService','$location', '$rootScope', function($scope, $http, ModalService, $location, $rootScope){
            var thisController = this;
            var openBalance = 0;
            this.userinfo = JSON.parse(localStorage.getItem("userinfo"));
            // console.log(this.userinfo);

            var req = {
                method: 'GET',
                url: $rootScope.apiUrl +'/get_user_store_list/'+ thisController.userinfo.id,
                
                headers: {
                'appkey' : $rootScope.JAPPKEY
                },
                };

        $http(req).then(function(response){
            if ((response.status)=="200"){
                thisController.stores = response['data'];

            }
            else{
                console.log("no");
            }
        });




        this.enterStore = function(index){
            // $rootScope.globalSelectedStore  = array[index];

            // $rootScope.selectedStore  = thisController.stores[index];
             localStorage.setItem("storeInfo",  JSON.stringify(thisController.stores[index]));
             thisController.selectedStore = thisController.stores[index];
                var request = {
                method: 'GET',
                url: $rootScope.apiUrl + '/check_register_status/' + thisController.selectedStore.id + '/' + thisController.userinfo.id,
                headers: {
                'appkey' : $rootScope.JAPPKEY
                },
                };

    
                $http(request).then(function(response){
                    
                    if((response.status)=="200"){
                        localStorage.setItem("registerInfo", JSON.stringify(response.data));
                        $location.path( "/pos");

                        // localStorage.setItem("registerId",  JSON.stringify(response['data'].id));
                    }
                    else{
                        console.log("closed");
                        thisController.openModal('openRegisterModal');
                    }
                    });    
         };

        this.createRegister = function (){

                var req = {
                method: 'GET',
                url: $rootScope.apiUrl + '/open_register/'+ thisController.selectedStore.id + '/' + thisController.userinfo.id + '/' +  thisController.openBalance,   //Caution!!! figure out how to solve the global variable store id issue 
                
                headers: {
                'appkey' : $rootScope.JAPPKEY
                }
                };
       
        $http(req).then(function(response){
            if ((response.status)=="200"){
                // thisController.store = response['data'];
                // $rootScope.register  = response['data'];
                localStorage.setItem("registerInfo", JSON.stringify(response.data));
                $location.path( "/pos");
            }
            else{
                console.log("no");
            }
        });

        };



        this.openModal = function(id){
            ModalService.Open(id);
        };

        this.closeModal = function(id){
            ModalService.Close(id);
        };

    }]);