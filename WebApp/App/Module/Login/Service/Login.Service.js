(function(){

    "use strict";

    angular.module('Login.Service', []);

    angular.module('Login.Service').factory('LoginService', ['$http', 'ngServicesCtrl',"$rootScope", function ($http, ngServicesCtrl,$rootScope) {

        var Service = function () {
            var self = this;
            self.$http = $http;
        }        

        Service.prototype.login = function (params) {
            var self = this;
            var url = ngServicesCtrl.Login.token;
            var headers = {
				'Content-Type': 'application/x-www-form-urlencoded'
			};

            return $http({
			    url: url,
			    method: "POST",
			    headers: headers,
			    data:"username=webmaster&password=Alfa161_"

			});
        }

        Service.prototype.getUserContext = function () {
            var self = this;
            var url = ngServicesCtrl.User.GetUserContext;

            return $http({
			    url: url,
			    method: "GET"
			});
        }


        return Service;

    }]);


})();