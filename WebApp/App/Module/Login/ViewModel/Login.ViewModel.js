(function(){

    "use strict";

    angular.module('Login.ViewModel', ['Login.Service'])

    angular.module('Login.ViewModel').factory('LoginViewModel',
        ['ngLoadRequest', 'ngRoutesCtrl', 'LoginService', 'ngAuth', 'ngCommon', 'ngEnumerados', function (ngLoadRequest, ngRoutesCtrl, LoginService, ngAuth, ngCommon, ngEnumerados) {

            var viewmodel = function () {
                var self = this;
                //### Config
                self.service = new LoginService();

                //### vars
                self.username = "";
                self.password = "";
            }
            
            viewmodel.prototype.init = function () {
                var self = this;
            
            }

            viewmodel.prototype.login = function() {
            	var self = this;
            	self.service.then(function() {
            		

            	});

            }

            return viewmodel;
    }]);

    
})();