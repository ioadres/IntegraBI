(function () {

    "use strict";

    angular.module('Report.ViewModel', ['Report.Service'])

    angular.module('Report.ViewModel').factory('ReportViewModel',
        ['ngLoadRequest', 'ngRoutesCtrl', 'ReportService', 'ngAuth', 'ngCommon', 'ngEnumerados', '$rootScope', '$sce', function (ngLoadRequest, ngRoutesCtrl, ReportService, ngAuth, ngCommon, ngEnumerados, $rootScope, $sce) {

            var viewmodel = function ($scope) {
                var self = this;
                //### Config
                self.service = new ReportService();

                $rootScope.headerVisible = false;
                self.widgets = [];
                self.preview = false;
                self.editable = true;
                self.options = { showGrid: true }
                self.columns = 30;
                self.rows = 30;
                self.matriz = new Array(self.rows);

                $scope.$on('wg-update-position', function (event, widgetInfo) {
                    var old = self.widgets[widgetInfo.index].position;
                    self.widgets[widgetInfo.index].position = widgetInfo.newPosition;
                    
                    for (var i = 0; i < old.height; i++) {
                        for (var j = 0; j < old.width; j++) {
                            self.matriz[old.top - 1 + i][old.left - 1 + j] = 0;
                        }
                    }

                    for (var i = 0; i < widgetInfo.newPosition.height; i++) {
                        for (var j = 0; j < widgetInfo.newPosition.width; j++) {
                            self.matriz[widgetInfo.newPosition.top - 1 + i][widgetInfo.newPosition.left - 1 + j] = 1;
                        }
                    }
                    

                });
            }

            viewmodel.prototype.init = function () {
                var self = this;
                self.initArray();
            }

            viewmodel.prototype.edit = function (item) {
                var self = this;
                self.editable = !self.editable;
            };

            viewmodel.prototype.addWidget = function (item) {
                var self = this;
                var position = self.getPosition();
                var newWidget = { position: position, body: $sce.trustAsHtml('<div style="background-color: #282d32;height: 100%;">Test1</div>') };
                self.widgets.push(newWidget);
            };

            viewmodel.prototype.initArray = function () {
                var self = this;
                for (var i = 0; i < self.rows; i++) {
                    self.matriz[i] = new Array(self.columns);
                    for (var j = 0; j < self.columns; j++) {
                        self.matriz[i][j] = 0;
                    }
                }
            }

            viewmodel.prototype.getPosition = function () {
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

            viewmodel.prototype.removeWidget = function (widget) {
                var self = this;
                var idx = self.widgets.indexOf(widget);
                if (idx > -1) {
                    self.widgets.splice(idx, 1);
                    for (var i = 0; i < widget.position.height; i++) {
                        for (var j = 0; j < widget.position.width; j++) {
                            self.matriz[widget.position.top - 1 + i][widget.position.left - 1 + j] = 0;
                        }
                    }
                }
            }

            viewmodel.prototype.onChange = function (event, items) {
                var self = this;
                console.log("onChange event: " + event + " items:" + items);
            };

            viewmodel.prototype.onDragStart = function (event, ui) {
                var self = this;
                console.log("onDragStart event: " + event + " ui:" + ui);
            };
            viewmodel.prototype.onDragStop = function (event, ui) {
                var self = this;
                console.log("onDragStop event: " + event + " ui:" + ui);
            };
            viewmodel.prototype.onResizeStart = function (event, ui) {
                var self = this;
                console.log("onResizeStart event: " + event + " ui:" + ui);
            };
            viewmodel.prototype.onResizeStop = function (event, ui) {
                var self = this;
                console.log("onResizeStop event: " + event + " ui:" + ui);
            };
            viewmodel.prototype.onItemAdded = function (item) {
                var self = this;
                console.log("onItemAdded item: " + item);
            };
            viewmodel.prototype.onItemRemoved = function (item) {
                var self = this;
                console.log("onItemRemoved item: " + item);
            };

            return viewmodel;
        }]);


})();