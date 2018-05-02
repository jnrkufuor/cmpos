(function () {
    'use strict';

    angular
        .module('pos-app')
        .factory('ExpectedCash', Service);

    function Service() {
        var savedData = {};
        var pageState = '';
        var service ={};

        service.get = get;
        service.set = set;
        service.setState = setState;
        service.getState = getState;


        return service;

        function set(data) {
            savedData = data;
        }
        
        function getTotalSales() {
            return savedData;
        }

        function setState(data){
            pageState = data;
        }
        function getState(data){
            return pageState;
        }
    }

})();
