(function() {

    "use strict";

    angular.module('Report.Service', []);

    angular.module('Report.Service').factory('ReportService', ['$http', 'ngServicesCtrl', '$rootScope', function($http, ngServicesCtrl) {

        var Service = function() {
            var self = this;
            self.$http = $http;
        }

        Service.prototype.addReport = function(params) {
            var self = this;
            var url = ngServicesCtrl.ReportController.Add;
            return $http.post(url, params);
        };

        Service.prototype.updateReport = function(params) {
            var self = this;
            var url = ngServicesCtrl.ReportController.Update;
            return $http.post(url, params);
        };

        Service.prototype.getReports = function() {
            var self = this;
            var url = ngServicesCtrl.ReportController.GetReports;
            return $http.post(url);
        };

        Service.prototype.getCharts = function() {
            var self = this;
            var url = ngServicesCtrl.ChartController.GetCharts;
            return $http.post(url);
        };

        Service.prototype.get = function(params) {
            var self = this;
            var url = ngServicesCtrl.ReportController.Get;
            return $http.post(url, params);
        };

        Service.prototype.getVisor = function(params) {
            var self = this;
            var url = ngServicesCtrl.ReportController.GetVisor;
            return $http.post(url, { id: params });
        };

        Service.prototype.removeReport = function(params) {
            var self = this;
            var url = ngServicesCtrl.ReportController.Remove;
            return $http.post(url, params);
        };

        Service.prototype.sendReport = function(reportId, emails, dateStart, dateEnd) {
            var self = this;
            debugger;
            var url = ngServicesCtrl.ReportController.SendReport;
            return $http.post(url, { reportId: reportId, emails: emails, dateStart: dateStart, dateEnd: dateEnd });
        }

        return Service;

    }]);


})();