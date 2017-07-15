(function() {
    "use strict";

    // Rutas
    angular.module('ngConstants', [])

    .factory('ngServicesCtrl', [function() {
        var url = URLSERVICE;

        return {
            Login: {
                token: url + '/token'
            },
            User: {
                GetUserContext: url + '/user/GetUserContext'
            },
            Home: {},
            ReportController: {
                Add: url + '/Report/Add',
                Update: url + '/Report/Update',
                GetReports: url + '/Report/GetReports',
                Get: url + '/Report/Get',
                SendReport: url + '/Report/SendReport',
                Remove: url + '/Report/Remove',
            },

            ChartController: {
                GetCharts: url + '/Chart/GetCharts'

            }
        }

    }])

    .constant('ngRoutesCtrl', {

        ReportListViewCtrl: {
            url: '/Report/List',
            templateUrl: 'App/Module/Report/View/List.html',
            controller: 'ReportListViewCtrl'
        },

        ReportViewCtrl: {
            url: '/Report/?id',
            templateUrl: 'App/Module/Report/View/Index.html',
            controller: 'ReportViewCtrl'
        },

        ReportViewViewCtrl: {
            url: '/Report/View/?id',
            templateUrl: 'App/Module/Report/View/View.html',
            controller: 'ReportViewViewCtrl'
        },

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
                guestAccess: true
            }
        },

        MachineLearningViewCtrl: {
            url: '/MachineLearning',
            templateUrl: 'App/Module/MachineLearning/View/Index.html',
            controller: 'MachineLearningViewCtrl',
        },

        BotViewCtrl: {
            url: '/Bot',
            templateUrl: 'App/Module/Bot/View/Index.html',
            controller: 'BotViewCtrl'
        }
    })

    .constant('ngEnumerados', {

        Extensiones: {
            //jpg:
        },
    })

    .constant('ngCommon', {

        UrlImageProfile: 'Users/Profile/',
        UrlImageNoIcon: 'Content/images/no-image-icon.png',
        Value500: 500

    })

    ;

})();