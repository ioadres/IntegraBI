(function() {

    "use strict";

    angular.module('Report.List.ViewModel', ['Report.Service'])

    angular.module('Report.List.ViewModel').factory('ReportListViewModel', ['ngLoadRequest', 'ReportService', function(ngLoadRequest, ReportService) {

        var viewmodel = function($scope) {
            var self = this;
            //### Config
            self.service = new ReportService();
            self.reports = [];
        }

        viewmodel.prototype.init = function() {
            var self = this;
            self.loadReports();
        }

        viewmodel.prototype.loadReports = function() {
            var self = this;
            ngLoadRequest.startBlock();
            self.service.getReports().then(function(result) {
                if (result.data == "") {} else {
                    self.reports = result.data;
                }
            }).finally(function() {
                ngLoadRequest.stopBlock();
            });
        }

        viewmodel.prototype.removeReport = function(item) {
            var self = this;
            ngLoadRequest.startBlock();
            self.service.removeReport(item.reportId).then(function(result) {
                if (result.data == "" || result.data == false) {
                    ngLoadRequest.showToastError("No se ha podido eliminar el reporte : " + item.name);
                } else {
                    ngLoadRequest.showToastSuccess("Se ha eliminado correctamente el reporte : " + item.name);
                    var idx = self.reports.indexOf(item);
                    self.reports.splice(idx, 1);
                }
            }).finally(function() {
                ngLoadRequest.stopBlock();
            });
        }

        viewmodel.prototype.sendReport = function() {
            var self = this;
            ngLoadRequest.startBlock();
            self.service.sendReport(self.currentReport, self.emails, self.dateStart, self.dateEnd).then(function(result) {
                if (result.data == "" || result.data == false) {
                    ngLoadRequest.showToastError("No se ha podido enviar el reporte. Contacte con el administrador.");
                } else {
                    ngLoadRequest.showToastSuccess("Se ha enviado correctamente el reporte");
                    $("#closeModalMail").click();
                    self.emails = "";
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