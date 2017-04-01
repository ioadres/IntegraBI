(function () {
    "use strict";

    angular.module('ngAuth', ['ngCookies'])

        .factory('ngAuth', ['$cookies', '$state', '$rootScope', function ($cookies, $state, $rootScope) {
            var usercontextcookie = "UserContextGame";

            return {
                login: function (UserContext) {
                    $cookies.putObject(usercontextcookie, UserContext);
                    $rootScope.UserContext = UserContext;
                    $state.go('Home');
                },
                logout: function () {
                    $cookies.remove(usercontextcookie);
                    $rootScope.UserContext = null;
                    $state.go('Login')
                },
                logoutCookie: function () {
                    $cookies.remove(usercontextcookie);
                    $rootScope.UserContext = null;
                },
                isLoggedIn: function () {
                    return ($rootScope.UserContext) ? true : false;
                },
                getUser: function () {
                    return $cookies.getObject(usercontextcookie);
                },
                getUserId: function () {
                    return $cookies.getObject(usercontextcookie).UserId;
                },
                getUserName: function () {
                    return $cookies.getObject(usercontextcookie).Username;
                },
                getEmail: function () {
                    return $cookies.getObject(usercontextcookie).Email;
                },
                getRol: function () {
                    return $cookies.getObject(usercontextcookie).Rol;
                },
                setEmail: function (email) {
                    var UserContext = $cookies.getObject(usercontextcookie);
                    UserContext.Email = email;
                    $cookies.remove(usercontextcookie);
                    $cookies.putObject(usercontextcookie, UserContext);
                    $rootScope.UserContext = UserContext
                }
            }
        }])


        .factory('permissions', ['$cookies', function ($cookies) {
            return {
                hasPermission: function (permission) {
                    var VIEWS_CURRENT_USER = $cookies.getObject(usercontextcookie).Vistas;
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