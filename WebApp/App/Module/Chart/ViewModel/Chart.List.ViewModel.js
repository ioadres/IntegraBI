(function() {

    "use strict";

    angular.module('Chart.List.ViewModel', ['Chart.Service'])

    angular.module('Chart.List.ViewModel').factory('ChartListViewModel', ['ngLoadRequest', 'ChartService', function(ngLoadRequest, ChartService) {

        var viewmodel = function($scope) {
            var self = this;
            //### Config
            self.service = new ChartService();
            self.charts = [];
        }

        viewmodel.prototype.init = function() {
            var self = this;
            self.load();
        }

        viewmodel.prototype.load = function() {
            var self = this;
            ngLoadRequest.startBlock();
            self.service.getAll().then(function(result) {
                if (result.data == "") {} else {
                    self.users = result.data;
                }
            }).finally(function() {
                ngLoadRequest.stopBlock();
            });
        }

        viewmodel.prototype.remove = function(item) {
            var self = this;
            ngLoadRequest.startBlock();
            self.service.remove(item.chartId).then(function(result) {
                if (result.data == "" || result.data == false) {
                    ngLoadRequest.showToastError("No se ha podido eliminar el gráfico : " + item.name);
                } else {
                    ngLoadRequest.showToastSuccess("Se ha eliminado correctamente el gráfico : " + item.name);
                    var idx = self.users.indexOf(item);
                    self.charts.splice(idx, 1);
                }
            }).finally(function() {
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