(function() {

    "use strict";

    angular.module('Bot.ViewModel', ['Bot.Service'])

    angular.module('Bot.ViewModel').factory('BotViewModel', ['ngLoadRequest', 'ngRoutesCtrl', 'BotService', 'ngAuth', 'ngCommon', 'ngEnumerados','$rootScope', '$sce', function(ngLoadRequest, ngRoutesCtrl, BotService, ngAuth, ngCommon, ngEnumerados,rootScope, sce) {

        var viewmodel = function() {
            var self = this;
            //### Config
            self.service = new BotService();
            self.token = rootScope.token.access_token;
            self.UserContext = rootScope.UserContext;
            self.url = sce.trustAsResourceUrl('https://webchat.botframework.com/embed/integraBIBot?s=ODc7ROKYG-w.cwA.CD0.c2o48LDrPzIDnMnP1oWNJMnsOvpYNjsKt-ZSLiouu7k&username='+self.UserContext.username+'&userid='+self.UserContext.userId);
        }

        viewmodel.prototype.init = function() {
            var self = this;

        }

        return viewmodel;
    }]);


})();