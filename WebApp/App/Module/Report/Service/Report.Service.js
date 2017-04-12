(function(){

    "use strict";

    angular.module('Report.Service', []);

    angular.module('Report.Service').factory('ReportService', ['$http', 'ngServicesCtrl','$rootScope', function ($http, ngServicesCtrl) {

        var Service = function () {
            var self = this;
            self.$http = $http;
        }        

        Service.prototype.addReport = function (params) {
            var self = this;
            var url = ngServicesCtrl.ReportController.Add;
            return $http.post(url, params);
        };



        return Service;

    }]);


})();