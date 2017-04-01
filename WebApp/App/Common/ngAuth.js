(function () {
    "use strict";

    angular.module('ngAuth', ['ngCookies'])

        .factory('ngAuth', ['$cookies', '$state', '$rootScope', function ($cookies, $state, $rootScope) {
            var ctokenintegrabi = "tokenintegrabi";
            var UserContextCookie = "UserContextCookie";

            return {
            	loginToken: function (token) {
            		token.isAnonymus = false;
            		$cookies.putObject(ctokenintegrabi, token);
                    $rootScope.token = token;
                },
                login: function (UserContext) {
                    $cookies.putObject(UserContextCookie, UserContext);
                    $rootScope.UserContext = UserContext;
                    $state.go('Home');
                },
                logout: function () {
                    $cookies.remove(UserContextCookie);
                    $rootScope.UserContext = null;
                    $rootScope.token = {
                    	isAnonymus : true
                    } 
                    $state.go('Login')
                },

                isLoggedIn: function () {
                    return $rootScope.isAnonymus = true;
                },

                getUser: function () {
                	return $cookies.getObject(UserContextCookie);
            	},
            	getToken: function () {
                	if($cookies.getObject(ctokenintegrabi) == null) {
                		return {
                			isAnonymus : true
                		}
                	}
            	},

            }
        }])


        .factory('permissions', ['$cookies', function ($cookies) {
            return {
                hasPermission: function (permission) {
                    var VIEWS_CURRENT_USER = $cookies.getObject(ctokenintegrabi).Vistas;
                    permission = permission.trim();
                    return _.some(VIEWS_CURRENT_USER, function (item) {
                        if (_.isString(item.Nombre)) {
                            return item.Nombre.trim() === permission
                        }
                    });
                }
            };
        }]);

})();