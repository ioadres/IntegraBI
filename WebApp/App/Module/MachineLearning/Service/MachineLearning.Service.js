(function() {

    "use strict";

    angular.module('MachineLearning.Service', []);

    angular.module('MachineLearning.Service').factory('MachineLearningService', ['$http', 'ngServicesCtrl', function($http, ngServicesCtrl) {

        var Service = function() {
            var self = this;
            self.$http = $http;
        }

        Service.prototype.addReport = function(params) {
            var self = this;
            var url = ngServicesCtrl.ReportController.Add;
            return $http.post(url, params);
        };

        return Service;

    }]);


})();