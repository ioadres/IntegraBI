(function(){

    "use strict";

    angular.module('Home.Service', []);

    angular.module('Home.Service').factory('HomeService', ['$http', 'ngServicesCtrl', function ($http, ngServicesCtrl) {

        var Service = function () {
            var self = this;
            self.$http = $http;
        }        

        Service.prototype.getLastRmasChanges = function (lines, state) {
            var self = this;
            var url = ngServicesCtrl.PanelControlController.GetLastRmasChanges;
            var params = { lines: lines, state: state }
            return $http.post(url, params);
        }

        Service.prototype.getInfoBasicRmaCurrentMonth = function () {
            var self = this;
            var url = ngServicesCtrl.PanelControlController.GetInfoBasicRmaCurrentMonth;
            return $http.get(url);
        }

        return Service;

    }]);


})();