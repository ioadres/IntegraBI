(function() {

    "use strict";

    angular.module('Bot.ViewModel', ['Bot.Service'])

    angular.module('Bot.ViewModel').factory('BotViewModel', ['ngLoadRequest', 'ngRoutesCtrl', 'BotService', 'ngAuth', 'ngCommon', 'ngEnumerados', function(ngLoadRequest, ngRoutesCtrl, BotService, ngAuth, ngCommon, ngEnumerados) {

        var viewmodel = function() {
            var self = this;
            //### Config
            self.service = new BotService();
        }

        viewmodel.prototype.init = function() {
            var self = this;

        }

        return viewmodel;
    }]);


})();