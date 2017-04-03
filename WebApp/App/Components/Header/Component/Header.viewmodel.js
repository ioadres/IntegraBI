(function () {
    "use strict";
    angular.module('Header', ['Header.Service', 'ngTranslations', 'ngAuth']);

    angular.module('Header').factory('Header', ['HeaderService', 'LoginService', 'ngTranslations', 'ngAuth', '$window', 'ngLoadRequest', '$rootScope', function (HeaderService, LoginService, ngTranslations, ngAuth, $window, ngLoadRequest, $rootScope) {

        var viewmodel = function (menuLeftActive) {
            var self = this;
            self.service = new HeaderService();
            self.loginservice = new LoginService();
            self.username = $rootScope.UserContext.username;
        }

        viewmodel.prototype.toggleLeft = function () {           
        };

        viewmodel.prototype.init = function () {
            var self = this; 
        };


        viewmodel.prototype.logOut = function () {
            var self = this;
            ngLoadRequest.startBlock();
            self.loginservice.userLogout().success(function () {
            }).finally(function () {
                ngLoadRequest.stopBlock();
                ngAuth.logout();
            });
        };

        return viewmodel;

    }]);

})();