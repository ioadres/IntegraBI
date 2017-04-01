(function () {
    "use strict";
    angular.module('MenuLeft', ['MenuLeft.Service', 'ngTranslations', 'ngAuth']);

    angular.module('MenuLeft').factory('MenuLeft', ['HeaderService', 'ngTranslations', 'ngAuth', '$window', 'ngLoadRequest', '$rootScope','$mdSidenav', function (MenuLeftService, ngTranslations, ngAuth, $window, ngLoadRequest, $rootScope, $mdSidenav) {

        var viewmodel = function () {
            var self = this;
            self.service = new MenuLeftService();
        }

        viewmodel.prototype.init = function () {
            var self = this;
        };

        viewmodel.prototype.toggleLeft = function () {
            $mdSidenav('left').toggle();
            $rootScope.menuLeftActive = !$rootScope.menuLeftActive;
        };

        viewmodel.prototype.isActive = function (location) {
            var self = this;
            var viewLocation = $window.location.hash.split('/')[1];
            var active = (viewLocation == location.replace('/', ''));
            return active;
        };

        return viewmodel;

    }]);

})();