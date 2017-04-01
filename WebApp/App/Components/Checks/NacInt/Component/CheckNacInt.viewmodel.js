(function () {
    "use strict";
    angular.module('Check.NacInt', ['ngTranslations', 'ngAuth']);

    angular.module('Check.NacInt').factory('CheckNacInt', ['ngTranslations', 'ngAuth', 'ngLoadRequest', function (ngTranslations, ngAuth, ngLoadRequest) {

        var viewmodel = function () {
            var self = this;
            self.option = false;
            self.required = false;
            self.disabled = false;
        }

        viewmodel.prototype.init = function (required, ngChangeCallback) {
            var self = this;
            self.required = required;
            self.ngChangeCallback = ngChangeCallback;
        };

        viewmodel.prototype.ngChange = function () {
            var self = this;
            self.ngChangeCallback(self.option);
        }       

        viewmodel.prototype.clear = function () {
            var self = this;
            self.option = false;
        }

        viewmodel.prototype.getSelected = function () {
            var self = this;
            return self.option;
        }

        viewmodel.prototype.getSelectedInt = function () {
            var self = this;
            return self.option?1:0;
        }

        viewmodel.prototype.setRequired = function (value) {
            var self = this;
            self.required = value;
        }

        viewmodel.prototype.setDisabled = function (value) {
            var self = this;
            self.disabled = value;
        }

        return viewmodel;

    }]);

})();