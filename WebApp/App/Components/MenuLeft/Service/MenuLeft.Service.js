(function(){

    "use strict";

    angular.module('MenuLeft.Service', ['ngConstants']);

    angular.module('MenuLeft.Service').factory('MenuLeftService', ['$http', 'ngServicesCtrl', function ($http, ngServicesCtrl) {

        var MenuLeftService = function () {
            var self = this;
            self.$http = $http;
        };

        MenuLeftService.prototype.setLang = function (lang) {
            var self = this;
            var url = ngServicesCtrl.MultilingualController.ChangeLanguage;
            return $http.post(url, { lang : lang });
        };

        return MenuLeftService;

    }]);


})();