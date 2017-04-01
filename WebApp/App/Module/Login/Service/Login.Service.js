(function(){

    "use strict";

    angular.module('Login.Service', []);

    angular.module('Login.Service').factory('LoginService', ['$http', 'ngServicesCtrl', function ($http, ngServicesCtrl) {

        var Service = function () {
            var self = this;
            self.$http = $http;
        }        

        Service.prototype.login = function (params) {
            var self = this;
            var url = ngServicesCtrl.Login.token;
            return $http.post(url, params);
        }

        return Service;

    }]);


})();