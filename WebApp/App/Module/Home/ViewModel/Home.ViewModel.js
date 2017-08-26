(function() {

    "use strict";

    angular.module('Home.ViewModel', ['Home.Service'])

    angular.module('Home.ViewModel').factory('HomeViewModel', ['ngLoadRequest', 'ngRoutesCtrl', 'HomeService', 'ngAuth', 'ngCommon', '$rootScope', function(ngLoadRequest, ngRoutesCtrl, HomeService, ngAuth, ngCommon, $rootScope) {

        var viewmodel = function() {
            var self = this;
            //### Config
            self.service = new HomeService();
            self.user = $rootScope.UserContext;
        }

        viewmodel.prototype.init = function() {
            var self = this;

        }

        return viewmodel;
    }]);


})();