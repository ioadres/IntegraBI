(function () {
    "use strict";

    // Rutas
    angular.module('ngConstants', [])

    .factory('ngServicesCtrl', [function () {

        return {
            Login : {
                token: 'http://localhost:5000/api/token'
            },
            User : {
            	GetUserContext:'http://localhost:5000/api/user/GetUserContext'
            },
            Home : {
            }
        }

    }])

    .constant('ngRoutesCtrl', {
        HomeViewCtrl: {
            url: '/Home',
            templateUrl: 'App/Module/Home/View/Index.html',
            controller: 'HomeViewCtrl'
        },

        LoginViewCtrl: {
            url: '/',
            templateUrl: 'App/Module/Login/View/Index.html',
            controller: 'LoginViewCtrl',
            data: {
            	guestAccess : true
            }
        },
    })

    .constant('ngEnumerados', {

        Extensiones: {
            //jpg:
        },
    })

    .constant('ngCommon', {

        UrlImageProfile: 'Users/Profile/',
        UrlImageNoIcon: 'Content/images/no-image-icon.png',
        Value500 : 500

    })

    ;

})();