(function () {

    "use strict";

    angular.module('App.Control', [])

    angular.module('App.Control').factory('AppControl',
        ['$rootScope', 'ngLoadRequest', 'ngRoutesCtrl', 'ngTranslations', '$timeout', 'ngAuth', '$state', 'ngEnumerados', '$location', 'ngCommon', 'blockUIConfig',
            function ($rootScope, ngLoadRequest, ngRoutesCtrl, ngTranslations, $timeout, ngAuth, $state, ngEnumerados, $location, ngCommon, blockUIConfig) {

                var app = function () {
                    var self = this;
                    $rootScope.controller = ngRoutesCtrl;
                    $rootScope.translation = ngTranslations.getTranslationObject();
                    $rootScope.enumerados = ngEnumerados;
                    $rootScope.token = ngAuth.getToken();
                    $rootScope.UserContext = ngAuth.getUser();
                    $rootScope.state = $state;
                    $rootScope.menuLeftActive = false;
                }

                app.prototype.initState = function () {
                    var self = this;
                    $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {

                        $rootScope.state = toState;
                        blockUIConfig.message = "Un momentito";//$rootScope.translation.LabelMomento;

                       
                        //### Si no es una pagina huesped  y el usuario no esta logueado --> redirect to Login
                        if (!self.guestAccess(toState.data) && $rootScope.token.isAnonymus === true) {
                            e.preventDefault();
                            $state.go('Login');
                            $rootScope.state = $state.get('Login');
                            return;
                        }

                        //### Si el usuario esta logueado, pero no tiene los permisos suficientes --> redirect to Home
                        if (ngAuth.isLoggedIn()) {
                            if (!self.controlAuthorized(toState.data)) {
                                e.preventDefault();
                                $state.go('Home');
                            }
                            if (self.controlAuthorized(toState.data)) {
                                self.enableSpinnerForRoute();
                            }
                        }
                    });

                    $rootScope.$on('$stateChangeSuccess', function (e, toState, toParams, fromState, fromParams) {
                        self.disabledSpinnerForRoute();
                    });
                }

                app.prototype.controlAuthorized = function (data) {
                    var self = this;
                    if (data !== undefined && data.authorized != undefined) {
                        var result = $rootScope.UserContext.Vistas.filter(function (obj) {
                            return obj.Nombre === data.authorized;
                        })[0];

                        // Sin permisos --> TODO : añadir pagina acceso denegado
                        if (result === undefined) {
                            return false;
                        }
                    }
                    return true;
                }

                app.prototype.guestAccess = function (data) {
                    if (data !== undefined && data.guestAccess == true) {
                        return true;
                    }
                    return false;
                }

                app.prototype.disabledSpinnerForRoute = function () {
                    var self = this;
                    $timeout(function () { ngLoadRequest.stopBlock(); }, ngCommon.Value500);
                }

                app.prototype.enableSpinnerForRoute = function () {
                    ngLoadRequest.startBlock();
                }

                return app;
            }]);


})();