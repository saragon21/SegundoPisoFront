var app = angular.module("segundoPisoApp", ['ngRoute']);
app.config(function ($routeProvider) {
    $routeProvider
            // route for the home page
            /*.when('/', {
                templateUrl: '/index.html'})*/
            .when('/alumnos', {
                templateUrl: 'views/catalogos/student.html',
                controller: 'studentsCtrl'
            })
            .when('/reporte/alumnos/clase', {
                templateUrl: 'views/reportes/reporteAlumnosClase.html',
                controller: 'reporteAlumnosClase'
            })
});       
app.run();//['$scope'], function($scope){
    
//});


/*app.directive('showErrors', function() {
    return {
        restrict: 'A',
        require: '^form',
        link: function(scope, el, attrs, formCtrl) {
            // find the text box element, which has the 'name' attribute
            var inputEl = el[0].querySelector("[name]");
            // convert the native text box element to an angular element
            var inputNgEl = angular.element(inputEl);
            // get the name on the text box
            var inputName = inputNgEl.attr('name');

            // only apply the has-error class after the user leaves the text box
            inputNgEl.bind('blur', function() {
                el.toggleClass('has-error', formCtrl[inputName].$invalid);
            });

            scope.$watch(function() {
                return scope.showErrorsCheckValidity;
            }, function(newVal, oldVal) {
                if (!newVal) {
                    return;
                }
                el.toggleClass('has-error', formCtrl[inputName].$invalid);
            });
        }
    };
});*/
