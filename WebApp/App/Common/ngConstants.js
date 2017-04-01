(function () {
    "use strict";

    // Rutas
    angular.module('ngConstants', [])

    .factory('ngServicesCtrl', [function () {

        return {
            HomeController : {
                GetInfoBasicRmaCurrentMonth: 'PanelControl/GetInfoBasicRmaCurrentMonth',
                GetLastRmasChanges:'PanelControl/GetLastRmasChanges'
            }
        }

    }])

    .constant('ngRoutesCtrl', {
        HomeViewCtrl: {
            url: '/Home',
            templateUrl: 'App/Module/Home/View/Index.html',
            controller: 'HomeViewCtrl'
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