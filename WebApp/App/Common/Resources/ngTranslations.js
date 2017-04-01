(function(){
    "use strict";
    // Rutas
    angular.module('ngTranslations', ['ngLiteral','ngCookies'])

    .service('ngTranslations', ['ngLiteral','$cookies', '$rootScope',function (ngLiteral, $cookies,$rootScope) {
        this.literal = ngLiteral;
        if ($cookies.get('lang') == undefined) {
            $cookies.put('lang', Mrw.lang);
        }

        this.getTranslation = function ($scope) {        
            $scope.translation = this.literal[$cookies.get('lang')];
        };

        this.getTranslationObject = function () {       
            return this.literal[$cookies.get('lang')];
        };

        this.getLang = function () {
            return $cookies.get('lang');
        };

        this.getShortLang = function () {
            return $cookies.get('lang').substring(0, 2);
        };

        this.setLang = function (lang) {
            $cookies.put('lang', lang)
        };

    }]);

})();
