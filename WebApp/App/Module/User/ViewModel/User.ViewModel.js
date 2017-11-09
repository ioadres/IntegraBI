(function() {

    "use strict";

    angular.module('User.ViewModel', ['User.Service'])

    angular.module('User.ViewModel').factory('UserViewModel', ['ngLoadRequest', 'UserService', '$rootScope', '$sce', '$state', function(ngLoadRequest, UserService, $rootScope, $sce, $state) {

        var viewmodel = function($scope, userId) {
            var self = this;
            //### Config
            self.service = new UserService();
            self.state = $state;
            self.userId = userId;
            self.user = {
                rol : {}
            };
            self.user.lock = false;
            self.scope = $scope;
            self.passwordValidate = true;          
            self.runValidation();
        }

        viewmodel.prototype.init = function(id) {
            var self = this;
            self.userId = id;
        }

        viewmodel.prototype.get = function() {
            var self = this;
            ngLoadRequest.startBlock();
            self.service.get(self.userId).then(function(result) {
                if (result.data == "") {} else {
                    self.user = result.data;                    
                    self.passwordValidate = false;
                    var password = document.getElementById("password")
                    password.setCustomValidity('');
                }
            }).finally(function() {
                ngLoadRequest.stopBlock();
            });
        }       

        viewmodel.prototype.runValidation = function() {
            var self = this;
            var password = document.getElementById("password")
            var confirm_password = document.getElementById("confirm_password");

            password.setCustomValidity('Completa este campo');

            function validatePassword() {
                password.setCustomValidity('');
                confirm_password.setCustomValidity('');
                if(password.value != confirm_password.value) {
                    confirm_password.setCustomValidity("Las contraseñas no coinciden");
                } 
                if(password.value.length < 5) {
                    password.setCustomValidity("La contraseña ha de tener un minimo de 5 caracteres");
                } 
                if(confirm_password.value.length < 5) {
                    confirm_password.setCustomValidity("La contraseña ha de tener un minimo de 5 caracteres");
                } 
            }

            function onchangePassword() {                
                self.passwordValidate = true;
                validatePassword();
            }

            password.onchange = onchangePassword;
            confirm_password.onkeyup = onchangePassword;

        }

        viewmodel.prototype.save = function() {
            var self = this;     

            ngLoadRequest.startBlock();
            self.service.save(self.getModel()).then(function(result) {
                if (result.data == "") {
                    ngLoadRequest.showToastError("Error inesperado al guardar el usuario");
                } else {
                    self.state.go('UserList');
                }
            }).finally(function() {
                ngLoadRequest.stopBlock();
            });        
        };

        viewmodel.prototype.getModel = function() {
            var self = this;
            debugger;
            return {
                UserName: self.user.username,
                Password: self.passwordValidate == true ? self.password: self.user.password,
                Email : self.user.email,
                Lock : self.user.lock,
                Rol : {
                    id : self.user.rol.id
                },
                UserId : self.user.userId
            }
        }


        return viewmodel;
    }]);


})();