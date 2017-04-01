
(function () {
    "use strict";

    angular.module('App',
        [
            'ui.router', 'ngCookies', 'blockUI', 'ngToast', 'ngMessages', 'ngMaterial',
            'App.Control', 'ngTranslations', 'ngLoadRequest', 'ngConstants', 'ngAuth',
            'Home'
        ]
    )

        .run(['AppControl',
            function (AppControl) {
                var appControl = new AppControl();
                appControl.initState();
            }]);

})();