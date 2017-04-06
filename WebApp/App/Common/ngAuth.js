(function () {
    "use strict";

    angular.module('ngAuth', ['ngCookies'])

        .factory('ngAuth', ['$cookies', '$state', '$rootScope','$timeout', function ($cookies, $state, $rootScope,$timeout) {
            var ctokenintegrabi = "tokenintegrabi";
            var UserContextCookie = "UserContextCookie";

            return {
            	loginToken: function (token) {
            		token.isAnonymus = false;
                    $rootScope.token = token;
                    var expired = new Date();
             		expired.setMilliseconds(expired.getMilliseconds() + token.expires_in * 1200 );
            		$cookies.putObject(ctokenintegrabi, token,{'expires': expired});

            		$rootScope.$watch($cookies.get(ctokenintegrabi), function(){
		                if(!$cookies.get(ctokenintegrabi)){
		                 	$window.location.href = '/';
		                 	}
					});
                },

                login: function (UserContext) {
                    $cookies.putObject(UserContextCookie, UserContext);
                    $rootScope.UserContext = UserContext;
                    $state.go('Home');
                },

                logout: function () {
                    $cookies.remove(ctokenintegrabi);
                    $cookies.remove(UserContextCookie);
                    $rootScope.UserContext = null;
                    $rootScope.token = {
                    	isAnonymus : true
                    } 
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
                		};
                	}
                	return {
                			isAnonymus : false
                	};
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