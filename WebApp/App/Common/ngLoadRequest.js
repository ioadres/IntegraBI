(function () {
    "use strict";
    // Rutas
    angular.module('ngLoadRequest', [])

        .factory('ngLoadRequest', ['blockUI', 'ngToast', 'ngTranslations', function (blockUI, ngToast, ngTranslations) {

            var literal = ngTranslations.getTranslationObject();
            return {
                startBlock: function () {
                    blockUI.instances.get('spinner').start();
                },

                stopBlock: function () {
                    blockUI.instances.get('spinner').stop();
                },

                showToastSuccess: function (message) {
                literal.ToastPeticionRealizadaCorrectamente = "Peticion realizada";
                    if (message === undefined || message === '') {
                        ngToast.create('<b>' + literal.ToastPeticionRealizadaCorrectamente + '<b>');
                    } else {
                        ngToast.create('<b>' + message + '</b');
                    }
                },

                showToastError: function (message) {
                    if (message === undefined || message === '' || message === null || message === 'null') {
                        ngToast.create({
                            className: 'danger',
                            content: '<b>' + literal.ToastErrorPeticion + '<b>'
                        });
                    } else {
                        ngToast.create({
                            className: 'danger',
                            content: '<b>' + message + '</b'
                        });
                    }
                },
                showToastWarning: function (message) {
                    if (message === undefined || message === '') {
                        ngToast.create({
                            className: 'warning',
                            content: '<b>' + literal.ToastErrorPeticion + '<b>'
                        });
                    } else {
                        ngToast.create({
                            className: 'warning',
                            content: '<b>' + message + '</b'
                        });
                    }
                },
                showToastInfo: function (message) {
                    if (message === undefined || message === '') {
                        ngToast.create({
                            className: 'info',
                            content: '<b>' + literal.ToastErrorPeticion + '<b>'
                        });
                    } else {
                        ngToast.create({
                            className: 'info',
                            content: '<b>' + message + '</b'
                        });
                    }
                },
                requestSuccess: function () {
                    this.stopBlock();
                    this.showToastSuccess();
                },
            };

        }])

})();