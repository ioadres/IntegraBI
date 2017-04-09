(function(){

    "use strict";

    angular.module('Report.ViewModel', ['Report.Service'])

    angular.module('Report.ViewModel').factory('ReportViewModel',
        ['ngLoadRequest', 'ngRoutesCtrl', 'ReportService', 'ngAuth', 'ngCommon', 'ngEnumerados','$rootScope','$sce', function (ngLoadRequest, ngRoutesCtrl, ReportService, ngAuth, ngCommon, ngEnumerados,$rootScope, $sce) {

            var viewmodel = function ($scope) {
                var self = this;
                //### Config
                self.service = new ReportService();
                
                $rootScope.headerVisible = false;
                self.widgets = [];
                self.preview = false;
                self.options = { showGrid: true }

                $scope.$on('wg-update-position', function (event, widgetInfo) {
                    console.log('A widget has changed its position!', widgetInfo);
                });
            }
            
            viewmodel.prototype.init = function () {
                var self = this;
            
            }

            viewmodel.prototype.edit = function(item) {
            	var self  =this;
                self.editable = !self.editable;
            };

            viewmodel.prototype.addWidget = function(item) {
            	var self  =this;
                var newWidget = {};
                if (item == 1) {
                    newWidget = { position: { top: 10, height: 7, left: 9, width: 7 }, body:$sce.trustAsHtml('<div style="background-color: #282d32;height: 100%;">Test1</div>') };
                }
                if (item == 2) {
                     newWidget = { position: { top: 10, height: 7, left: 9, width: 7 }, body:$sce.trustAsHtml('<div style="background-color: #282d32;height: 100%;">Test1</div>') };
                }
                if (item == 3) {
                    newWidget = { position: { top: 10, height: 7, left: 9, width: 7 }, body:$sce.trustAsHtml('<div style="background-color: #282d32;height: 100%;">Test1</div>') };
                }
                
                self.widgets.push(newWidget);
            };
            
            viewmodel.prototype.removeWidget = function(w) {
            	var self  =this;
                var index = self.widgets.indexOf(w);
                self.widgets.splice(index, 1);
            };

            viewmodel.prototype.onChange = function(event, items) {
            	var self  =this;
                console.log("onChange event: "+event+" items:"+items);
            };

            viewmodel.prototype.onDragStart = function(event, ui) {
            	var self  =this;
                console.log("onDragStart event: "+event+" ui:"+ui);
            };
            viewmodel.prototype.onDragStop = function(event, ui) {
            	var self  =this;
                console.log("onDragStop event: "+event+" ui:"+ui);
            };
            viewmodel.prototype.onResizeStart = function(event, ui) {
            	var self  =this;
                console.log("onResizeStart event: "+event+" ui:"+ui);
            };
            viewmodel.prototype.onResizeStop = function(event, ui) {
            	var self  =this;
                console.log("onResizeStop event: "+event+" ui:"+ui);
            };
            viewmodel.prototype.onItemAdded = function(item) {
            	var self  =this;
                console.log("onItemAdded item: "+item);
            };
            viewmodel.prototype.onItemRemoved = function(item) {
            	var self  =this;
                console.log("onItemRemoved item: "+item);
            };



            return viewmodel;
    }]);

    
})();