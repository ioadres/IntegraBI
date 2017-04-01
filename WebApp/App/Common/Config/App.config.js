
(function () {
    "use strict";

    angular.module('App')

        .config(['blockUIConfig', function (blockUIConfig) {
            blockUIConfig.message = "Un Momentito...";
            blockUIConfig.autoInjectBodyBlock = false;
            blockUIConfig.delay = 100;
        }])



        .config([
            '$httpProvider', function ($httpProvider) {
                // Initialize get if not there
                if (!$httpProvider.defaults.headers.get) {
                    $httpProvider.defaults.headers.get = {};
                }
                // disable IE ajax request caching
                $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
                $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
                $httpProvider.defaults.headers.get['Pragma'] = 'no-cachse';
        		$httpProvider.defaults.useXDomain = true;
		        delete $httpProvider.defaults.headers.common['X-Requested-With'];
                // Disable IE ajax request caching
                //  $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
            }
        ])
        .config(['$locationProvider', function ($locationProvider) {
            $locationProvider.hashPrefix('');
        }]);

})();