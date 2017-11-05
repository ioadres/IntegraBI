(function() {

    "use strict";

    angular.module('Report.ViewModel', ['Report.Service'])

    angular.module('Report.ViewModel').factory('ReportViewModel', ['ngLoadRequest', 'ReportService', '$rootScope', '$sce', '$state', function(ngLoadRequest, ReportService, $rootScope, $sce, $state) {

        var viewmodel = function($scope, reportId) {
            var self = this;
            //### Config
            self.service = new ReportService();
            self.state = $state;
            $rootScope.headerVisible = false;
            self.reportId = reportId;
            self.widgets = [];
            self.charts = [];
            self.preview = false;
            self.editable = true;
            self.options = { showGrid: true }
            self.columns = 30;
            self.rows = 30;
            self.scope = $scope;
            self.matriz = new Array(self.rows);

            $scope.$on('wg-update-position', function(event, widgetInfo) {
                var old = self.widgets[widgetInfo.index].position;
                self.widgets[widgetInfo.index].position = widgetInfo.newPosition;
                self.resetPositionWidget(old);
                self.registerPositionWidget(widgetInfo.newPosition);
            });
        }

        viewmodel.prototype.init = function(id) {
            var self = this;
            self.reportId = id;
            self.initArray();
            self.getCharts();
        }


        viewmodel.prototype.edit = function() {
            var self = this;
            self.editable = !self.editable;
        };

        viewmodel.prototype.getUrlIframe = function(item) {
            var self = this;
            return $sce.trustAsResourceUrl(item.url);
        }

        viewmodel.prototype.get = function() {
            var self = this;
            self.error = false;
            ngLoadRequest.startBlock();
            self.service.get(self.reportId).then(function(result) {
                if (result.data == "") {
                    self.error = true;
                } else {
                    self.name = result.data.name;
                    if (result.data.json != "") {
                        self.widgets = JSON.parse(result.data.json);
                        self.widgets.forEach(function(element) {
                            self.registerPositionWidget(element.position);
                        }, this);
                    }
                }
            }).finally(function() {
                ngLoadRequest.stopBlock();
            });
        }

        viewmodel.prototype.getCharts = function() {
            var self = this;
            ngLoadRequest.startBlock();
            self.service.getCharts().then(function(result) {
                if (result.data == "") {} else {
                    self.charts = result.data;
                }
            }).finally(function() {
                ngLoadRequest.stopBlock();
            });
        }

        viewmodel.prototype.save = function(exit) {
            var self = this;
            if (!document.getElementById('form').checkValidity()) {
                // If the form is invalid, submit it. The form won't actually submit;
                // this will just cause the browser to display the native HTML5 error messages.
                self.scope.form.$submitted = true;
                return;
            }

            if (self.scope.form.$valid) {
                ngLoadRequest.startBlock();
                self.getServiceAction()(self.getModel()).then(function(result) {
                    if (result.data == "") {
                        ngLoadRequest.showToastError("Error inesperado al guardar el reporte");
                    } else {
                        if (exit) self.state.go('ReportList');
                        else {
                            ngLoadRequest.showToastSuccess();
                            self.reportId = result.data.reportId;
                        }
                    }
                }).finally(function() {
                    ngLoadRequest.stopBlock();
                });
            }
        };

        viewmodel.prototype.getServiceAction = function() {
            var self = this;
            if (self.reportId != null) {
                return self.service.updateReport;
            }
            return self.service.addReport;
        }

        viewmodel.prototype.getModel = function() {
            var self = this;
            return {
                Name: self.name,
                ReportId: self.reportId,
                Json: self.getJson()
            }
        }

        viewmodel.prototype.getJson = function() {
            var self = this;
            return JSON.stringify(self.widgets);
        }

        //### Widget Managde
        viewmodel.prototype.addWidget = function(item) {
            var self = this;
            var position = self.getPosition();
            var newWidget = {
                position: position,
                url: item.url
            };
            self.widgets.push(newWidget);
        };

        viewmodel.prototype.initArray = function() {
            var self = this;
            for (var i = 0; i < self.rows; i++) {
                self.matriz[i] = new Array(self.columns);
                for (var j = 0; j < self.columns; j++) {
                    self.matriz[i][j] = 0;
                }
            }
        }

        viewmodel.prototype.removeWidget = function(widget) {
            var self = this;
            var idx = self.widgets.indexOf(widget);
            if (idx > -1) {
                self.widgets.splice(idx, 1);
                self.resetPositionWidget(widget.position);
            }
        }

        viewmodel.prototype.resetPositionWidget = function(position) {
            var self = this;
            self.setMatriz(position, 0);
        }

        viewmodel.prototype.registerPositionWidget = function(position) {
            var self = this;
            self.setMatriz(position, 1);
        }

        viewmodel.prototype.setMatriz = function(position, value) {
            var self = this;
            for (var i = 0; i < position.height; i++) {
                for (var j = 0; j < position.width; j++) {
                    self.matriz[position.top - 1 + i][position.left - 1 + j] = value;
                }
            }
        }

        viewmodel.prototype.getPosition = function() {
            var self = this;
            var end = false;
            var top = undefined;
            var left = undefined;
            for (var i = 0; i < self.rows && !end; i++) {
                for (var j = 0; j < self.columns && !end; j++) {
                    if (self.matriz[i][j] == 0) {
                        if (self.matriz[i][j + 1] == 0 &&
                            self.matriz[i + 1][j] == 0 &&
                            self.matriz[i + 1][j + 1] == 0) {
                            top = i;
                            left = j;
                            self.matriz[i][j] = 1;
                            self.matriz[i][j + 1] = 1;
                            self.matriz[i + 1][j] = 1;
                            self.matriz[i + 1][j + 1] = 1;
                            end = true;
                            break;
                        }
                    }
                }
            }
            return { top: top + 1, height: 2, left: left + 1, width: 2 };
        }


        return viewmodel;
    }]);


})();