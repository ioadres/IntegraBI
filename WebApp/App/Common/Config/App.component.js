(function() {
    "use strict";

    angular.module('App')

    //# Componentes Helpers
    .component('appheader', {
        restrict: 'A',
        templateUrl: '/App/Components/Header/View/index.html',
        controller: ['$scope', 'Header', 'ngTranslations', function($scope, Header, ngTranslations) {
            $scope.viewmodel = new Header();
            $scope.viewmodel.init();
            $scope.translation = ngTranslations.getTranslationObject();
        }]
    })

    //### TODO : PASAR DE DIRECTIVA A COMPONENTE Control acceso Roles links
    .directive('hasPermission', ['permissions', function(permissions) {
        return {
            link: function(scope, element, attrs) {
                if (attrs.hasPermission == "") {
                    throw 'hasPermission value must be a string'
                }
                var value = attrs.hasPermission.trim();
                var notPermissionFlag = value[0] === '!';
                if (notPermissionFlag) {
                    value = value.slice(1).trim();
                }

                function toggleVisibilityBasedOnPermission() {
                    var hasPermission = permissions.hasPermission(value);
                    if (hasPermission && !notPermissionFlag || !hasPermission && notPermissionFlag) {
                        element.show();
                    } else {
                        element.hide();
                    }
                }
                toggleVisibilityBasedOnPermission();
            }
        };
    }])

    //TODO : PASAR DE DIRECTIVA A COMPONENTE
    .directive('modal', ['ngTranslations', function(ngTranslations) {
        return {
            restrict: 'E', // this allows restriction of blink to an HTML element.
            transclude: true, // transclusion instructs angular to embed the original content from the DOM into the resultant output
            templateUrl: '/App/Components/Modal/modal.html', // This is the template that will replace the <blink> tag. The ng-transclude indicates what element should be blended.
            scope: {
                idModal: '@',
                ngModel: '=',
                titlePopup: '@',
                saveCallback: "="
            },
            require: 'ngModel',
            link: function(scope, elem, attrs, rootScope) { //our link function is what is invoked for the directive. In this case, simply toggle between hidden and visible css styles. 
                scope.translation = ngTranslations.getTranslationObject();
                if (this.saveCallback != undefined) {
                    this.saveCallback.bind(this.ngModel)
                }
            }
        }
    }])

    //TODO : PASAR DE DIRECTIVA A COMPONENTE
    .directive('modalwithoutbuttons', ['ngTranslations', function(ngTranslations) {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/App/Components/Modal/modalWithoutButtons.html',
            scope: {
                idModal: '@',
                ngModel: '=',
                titlePopup: '@',
            },
            require: 'ngModel',
            link: function(scope, elem, attrs, rootScope) {
                scope.translation = ngTranslations.getTranslationObject();
            }
        }
    }])

    .directive('modalwithoutbody', ['ngTranslations', function(ngTranslations) {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'App/Components/Modal/modalWithoutBody.html',
            scope: {
                idModal: '@',
                ngModel: '=',
                titlePopup: '@',
                minwidth: '@'
            },
            require: 'ngModel',
            link: function(scope, elem, attrs, rootScope) {
                scope.translation = ngTranslations.getTranslationObject();
            }
        }
    }])


    ;

})();