(function () {
    "use strict";
    angular.module('WaitForComponent', []);

    angular.module('WaitForComponent').factory('WaitForComponent', ['ngLoadRequest', '$rootScope', function (ngLoadRequest, $rootScope) {

        var viewmodel = function (callbackAll, numeroComponentes, waitForAll) {
            var self = this;
            var ieval = eval;
            var global = ieval('this');
            global.Component = {};
            global.Component.WaitForComponent = this;

            //### Configure
            self.numeroComponentes = numeroComponentes;
            self.componentsLoads = [];
            self.callbackAll = callbackAll;     
            self.waitForAll = waitForAll;
            if (waitForAll) self.waitAllComponents();
            
        }

        viewmodel.prototype.Add = function (name) {
            var self = Component.WaitForComponent;
            self.componentsTemp.push(item);            
        }

        viewmodel.prototype.waitAllComponents = function () {
            var self = Component.WaitForComponent;
            var unbind = $rootScope.$watch(function () { return self.numeroComponentes == self.componentsLoads.length }, function (value) {
                if (value) {
                    self.callbackAll();
                    unbind();
                    Component = null;
                }
            });
        }

        viewmodel.prototype.waitFor = function (nameComponent) {
            var self = Component.WaitForComponent;

        }

        viewmodel.prototype.componentLoad = function (component) {
            var self = Component.WaitForComponent;
            self.componentsLoads.push(component);
        };



        return viewmodel;

    }]);

})();