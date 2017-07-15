(function() {

    "use strict";

    angular.module('Bot.Service', []);

    angular.module('Bot.Service').factory('BotService', ['$http', 'ngServicesCtrl', function($http, ngServicesCtrl) {

        var Service = function() {
            var self = this;
            self.$http = $http;
        }

        return Service;

    }]);


})();