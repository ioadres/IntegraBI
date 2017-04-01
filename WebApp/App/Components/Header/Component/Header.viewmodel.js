(function () {
    "use strict";
    angular.module('Header', ['Header.Service', 'ngTranslations', 'ngAuth']);

    angular.module('Header').factory('Header', ['HeaderService', 'LoginService', 'ngTranslations', 'ngAuth', '$window', 'ngLoadRequest', '$timeout', '$mdSidenav', '$rootScope', function (HeaderService, LoginService, ngTranslations, ngAuth, $window, ngLoadRequest, $timeout, $mdSidenav, $rootScope) {

        var viewmodel = function (menuLeftActive) {
            var self = this;
            self.service = new HeaderService();
            self.loginservice = new LoginService();
        }

        viewmodel.prototype.toggleLeft = function () {
            $mdSidenav('left').toggle();
            $rootScope.menuLeftActive = !$rootScope.menuLeftActive;
        };

        viewmodel.prototype.init = function () {
            var self = this;
            if (ngAuth.isLoggedIn()) {
                var user = ngAuth.getUser();
                self.username = user.Username;
                self.rol = self.capitalizeFirstLetter(user.Rol);
                self.isSagec = user.isSagec;
            }            
        };

        viewmodel.prototype.changeLang = function (lang) {
            var self = this;
            self.service.setLang(lang);
            ngTranslations.setLang(lang);
            $window.location.reload();
        }

        viewmodel.prototype.logOut = function () {
            var self = this;
            ngLoadRequest.startBlock();
            self.loginservice.userLogout().success(function () {
            }).finally(function () {
                ngLoadRequest.stopBlock();
                ngAuth.logout();
            });
        };

        viewmodel.prototype.isActive = function (location) {
            var self = this;
            var viewLocation = $window.location.hash.split('/')[1];
            var active = (viewLocation == location.replace('/', ''));
            return active;
        };

        viewmodel.prototype.appChange = function () {
            var self = this;

            self.service.setApplication().then(function (result) {
                ngAuth.changeApp(result.data);
                $window.location.reload();
            });
        }

        viewmodel.prototype.capitalizeFirstLetter = function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        return viewmodel;

    }]);

})();