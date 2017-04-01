(function(){

    "use strict";

    angular.module('Header.Service', ['ngConstants']);

    angular.module('Header.Service').factory('HeaderService', ['$http', 'ngServicesCtrl', function ($http, ngServicesCtrl) {

        var HeaderService = function () {
            var self = this;
            self.$http = $http;
        };

        HeaderService.prototype.setLang = function (lang) {
            var self = this;
            var url = ngServicesCtrl.MultilingualController.ChangeLanguage;
            return $http.post(url, { lang : lang });
        };

        HeaderService.prototype.setApplication = function () {
            var self = this;
            var url = ngServicesCtrl.CommonController.SetApplication;
            return $http.post(url);
        };

        return HeaderService;

    }]);


})();