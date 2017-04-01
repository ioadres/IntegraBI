(function () {
    "use strict";
    angular.module('Selector.Idioma', ['Selector.IdiomaService']);

    angular.module('Selector.Idioma').factory('SelectorIdioma', ['SelectorIdiomaService', 'Selector', function (SelectorIdiomaService, Selector) {

        var viewmodel = function (required, ngChangeCallback, ngFinalizedCallback, ngModel) {
            var self = this;
            Selector.call(self, required, ngChangeCallback, ngFinalizedCallback, ngModel);           

            //### Config
            self.service = new SelectorIdiomaService();
            self.selected = 'ES';
            self.labelText = self.literal.IdiomaServicio;
            self.component = {
                name: 'SelectorIdioma',
                context: self
            };
        }

        viewmodel.prototype = Object.create(Selector.prototype);

        viewmodel.prototype.init = function () {
            var self = this;
            self.getIdiomaSelector();
        };       

        viewmodel.prototype.getIdiomaSelector = function () {
            var self = this;
            var done = self.service.getIdiomaSelector().then(function (result) {
                self.options = result.data;
            }).finally(function () {
                self.finalized(self.component);
            });
        };

        return viewmodel;

    }]);

})();