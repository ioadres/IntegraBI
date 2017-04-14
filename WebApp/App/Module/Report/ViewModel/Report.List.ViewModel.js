(function () {

    "use strict";

    angular.module('Report.List.ViewModel', ['Report.Service'])

    angular.module('Report.List.ViewModel').factory('ReportListViewModel',
        ['ngLoadRequest', 'ReportService', function (ngLoadRequest, ReportService) {

            var viewmodel = function ($scope) {
                var self = this;
                //### Config
                self.service = new ReportService();
                self.reports = [];
            }

            viewmodel.prototype.init = function () {
                var self = this;
                self.loadReports();
            }   

            viewmodel.prototype.loadReports = function() {
                var self = this;
                ngLoadRequest.startBlock();
                self.service.getReports().then(function(result) {
                    if (result.data == "") {
                    } else {
                        self.reports = result.data;
                    }
                }).finally(function () {
                    ngLoadRequest.stopBlock();
                });
            }   

            viewmodel.prototype.formatDate = function(date) {
                var self = this;
                return moment(date).format("DD/MM/YYYY");
            }     

            return viewmodel;
        }]);


})();