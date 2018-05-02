(function () {
    'use strict';

    angular
        .module('pos-app')
        .factory('ToastService', Service);

    function Service() {

        var service = {};

        service.success = success;
        service.error = error;


        return service;

        function success(message) {
            var x = document.getElementById("snackbar");
            x.style.backgroundColor = "#69BC7C";
            x.innerHTML = "<span><img src='web/img/tick.svg'></span>"+ message;
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        }

        function error(message) {
            var x = document.getElementById("snackbar");
            x.style.backgroundColor = "#BF6359";
            x.innerHTML = "<span><img src='web/img/error_white.svg'></span>" + message;
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        }
        
    }

})();
