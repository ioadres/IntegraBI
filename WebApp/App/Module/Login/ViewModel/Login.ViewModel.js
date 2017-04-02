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
            	ngLoadRequest.startBlock();
            	self.service.login(self.getModel()).then(function(result) {
            		ngAuth.loginToken(result.data);
            		ngLoadRequest.startBlock();
            		self.service.getUserContext().then(function(response) {
            			ngAuth.login(response.data);
            		}).finally(function() {
            			ngLoadRequest.requestSuccess()
            		});
            	}).catch(function() {
            		ngLoadRequest.showToastError("Error: usuario y/o contraseña incorrecta.");
            	}).finally(function() {
            		ngLoadRequest.stopBlock()
            	});

            }

            viewmodel.prototype.getModel = function() {
            	var self = this;
            	return {
	            	username : self.username,
	            	password: self.password
            	}
            }

            return viewmodel;
    }]);

    
})();