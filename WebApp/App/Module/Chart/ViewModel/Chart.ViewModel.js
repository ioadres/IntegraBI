(function() {

    "use strict";

    angular.module('Chart.ViewModel', ['Chart.Service'])

    angular.module('Chart.ViewModel').factory('ChartViewModel', ['ngLoadRequest', 'ChartService', '$rootScope', '$sce', '$state', function(ngLoadRequest, ChartService, $rootScope, $sce, $state) {

        var viewmodel = function($scope, chartId) {
            var self = this;
            //### Config
            self.service = new ChartService();
            self.state = $state;
            self.chartId = chartId;
            self.scope = $scope;
        }

        viewmodel.prototype.init = function(id) {
            var self = this;
            self.chartId = id;
        }

        viewmodel.prototype.get = function() {
            var self = this;
            ngLoadRequest.startBlock();
            self.service.get(self.chartId).then(function(result) {
                if (result.data == "") {} else {
                    self.chart = result.data;
                    self.userIdSelected = self.chart.userId + '';
                    self.getUsers();
                }
            }).finally(function() {
                ngLoadRequest.stopBlock();
            });
        }

        viewmodel.prototype.getUsers = function() {
            var self = this;
            ngLoadRequest.startBlock();
            self.service.getUsers().then(function(result) {
                if (result.data == "") {} else {
                    self.users = result.data;
                }
            }).finally(function() {
                ngLoadRequest.stopBlock();
            });
        }

        viewmodel.prototype.save = function() {
            var self = this;

            ngLoadRequest.startBlock();
            self.service.save(self.getModel()).then(function(result) {
                if (result.data == "") {
                    ngLoadRequest.showToastError("Error inesperado al guardar el gráfico");
                } else {
                    self.state.go('ChartList');
                }
            }).finally(function() {
                ngLoadRequest.stopBlock();
            });
        };

        viewmodel.prototype.getModel = function() {
            var self = this;
            debugger;
            return {
                UserId: self.userIdSelected,
                ChartId: self.chart.chartId,
                Name: self.chart.name,
                Description: self.chart.description,
                Url: self.chart.url
            }
        }


        return viewmodel;
    }]);


})();