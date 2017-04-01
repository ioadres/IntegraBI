(function(){

    "use strict";

    angular.module('Home.ViewModel', ['Home.Service'])

    angular.module('Home.ViewModel').factory('HomeViewModel',
        ['ngLoadRequest', 'ngRoutesCtrl', 'HomeService', 'ngAuth', 'ngCommon', 'ngEnumerados', function (ngLoadRequest, ngRoutesCtrl, HomeService, ngAuth, ngCommon, ngEnumerados) {

            var viewmodel = function () {
                var self = this;
                //### Config
                self.service = new HomeService();
            }
            
            viewmodel.prototype.init = function () {
                var self = this;
            
            }

            return viewmodel;
    }]);

    
})();