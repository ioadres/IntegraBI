(function () {
    "use strict";
    angular.module('Selector', ['ngTranslations', 'ngAuth']);

    angular.module('Selector').factory('Selector', ['ngTranslations', 'ngAuth', 'ngLoadRequest', function (ngTranslations, ngAuth, ngLoadRequest) {

        var viewmodel = function (required, ngChangeCallback, ngFinalizedCallback, ngModel) {
            var self = this;  
            self.ngLoadRequest = ngLoadRequest;
            self.ngAuth = ngAuth;
            self.options = [];
            self.selected = null;
            self.required = false;
            self.disabled = false;
            self.literal = ngTranslations.getTranslationObject();
            self.required = required;
            if (ngChangeCallback != null) self.ngChangeCallback = ngChangeCallback.bind(ngModel);
            if (ngFinalizedCallback != null) self.ngFinalizedCallback = ngFinalizedCallback;
        }        

        viewmodel.prototype.finalized = function (param) {
            var self = this;
            if (self.ngFinalizedCallback != null) {
                self.ngFinalizedCallback(param);
            }
        }
        
        viewmodel.prototype.ngChange = function (value) {
            var self = this;
            self.ngChangeCallback(value);
        }
       
        viewmodel.prototype.clear = function () {
            var self = this;
            self.selected = null;
        }

        viewmodel.prototype.getSelected = function () {
            var self = this;
            return self.selected;
        }

        viewmodel.prototype.setSelected = function (value) {
            var self = this;
            self.selected = value;
        }

        viewmodel.prototype.getTextSelected = function () {
            var self = this;
            return self.selected.Text;
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