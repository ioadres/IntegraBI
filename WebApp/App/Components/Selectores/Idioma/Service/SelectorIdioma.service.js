(function () {

    "use strict";

    angular.module('Selector.IdiomaService', ['ngConstants']);

    angular.module('Selector.IdiomaService').factory('SelectorIdiomaService', ['$http', 'ngServicesCtrl', function ($http, ngServicesCtrl) {

        var Service = function () {
            var self = this;
            self.$http = $http;
        };

        Service.prototype.getIdiomaSelector = function () {
            var self = this;
            var url = ngServicesCtrl.CommonController.GetIdiomasSelector;
            return $http.post(url);
        }

        return Service;

    }]);


})();