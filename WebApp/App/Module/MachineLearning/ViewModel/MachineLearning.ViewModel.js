(function() {

    "use strict";

    angular.module('MachineLearning.ViewModel', ['MachineLearning.Service'])

    angular.module('MachineLearning.ViewModel').factory('MachineLearningViewModel', ['ngLoadRequest', 'MachineLearningService', function(ngLoadRequest, MachineLearningService) {

        var viewmodel = function() {
            var self = this;
            //### Config
            self.service = new MachineLearningService();

        }

        viewmodel.prototype.init = function(id) {
            var self = this;
        }



        return viewmodel;
    }]);


})();