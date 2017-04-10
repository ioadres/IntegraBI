(function () {

    "use strict";

    angular.module('Report.List.ViewModel', ['Report.Service'])

    angular.module('Report.List.ViewModel').factory('ReportListViewModel',
        ['ngLoadRequest', 'ngRoutesCtrl', 'ReportService', 'ngAuth', 'ngCommon', 'ngEnumerados', '$rootScope', '$sce', function (ngLoadRequest, ngRoutesCtrl, ReportService, ngAuth, ngCommon, ngEnumerados, $rootScope, $sce) {

            var viewmodel = function ($scope) {
                var self = this;
                //### Config
                self.service = new ReportService();
            }

            viewmodel.prototype.init = function () {
                var self = this;
            }           

            return viewmodel;
        }]);


})();