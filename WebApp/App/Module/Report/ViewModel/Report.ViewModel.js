(function(){

    "use strict";

    angular.module('Report.ViewModel', ['Report.Service'])

    angular.module('Report.ViewModel').factory('ReportViewModel',
        ['ngLoadRequest', 'ngRoutesCtrl', 'ReportService', 'ngAuth', 'ngCommon', 'ngEnumerados', function (ngLoadRequest, ngRoutesCtrl, ReportService, ngAuth, ngCommon, ngEnumerados) {

            var viewmodel = function () {
                var self = this;
                //### Config
                self.service = new ReportService();

                self.widgets = [{ x:0, y:0, width:1, height:1 }, { x:0, y:0, width:3, height:1 }];
                self.options = {
                    cellHeight: 200,
                    verticalMargin: 10
                };
            }
            
            viewmodel.prototype.init = function () {
                var self = this;
            
            }

            viewmodel.prototype.addWidget = function() {
            	var self  =this;
                var newWidget = { x:0, y:0, width:1, height:1 };
                self.widgets.push(newWidget);
            };
            viewmodel.prototype.moveWidget = function() {
            	var self = this;
                self.widgets[0].x = 1;
                self.widgets[0].width = 2;
                self.widgets[0].height = 2;
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