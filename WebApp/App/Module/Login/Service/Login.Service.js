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

        return Service;

    }]);


})();