(function () {

    "use strict";

    angular.module('Report.View.ViewModel', ['Report.Service'])

    angular.module('Report.View.ViewModel').factory('ReportViewViewModel',
        ['ngLoadRequest', 'ReportService','$rootScope', '$sce','$state', function (ngLoadRequest, ReportService, $rootScope, $sce, $state) {

            var viewmodel = function ($scope, reportId) {
                var self = this;
                //### Config
                self.service = new ReportService();               
                $rootScope.headerVisible = false;
                self.reportId = reportId;
                self.widgets = [];
                self.options = { showGrid: true }                
            }

            viewmodel.prototype.init = function (id) {
                var self = this;
                self.reportId = id;
            }     

            viewmodel.prototype.getUrlIframe = function(item) {
                var self = this;
                return $sce.trustAsResourceUrl(item.url);
            }

            viewmodel.prototype.get = function() {
                var self = this;
                ngLoadRequest.startBlock();
                self.service.get(self.reportId).then(function(result) {
                    if (result.data == "") {
                    } else {
                        self.name = result.data.name;
                        if(result.data.json != "") {
                            self.widgets = JSON.parse(result.data.json);                           
                        }   
                    }
                }).finally(function () {
                    ngLoadRequest.stopBlock();
                });
            }               
            
            return viewmodel;
        }]);


})();