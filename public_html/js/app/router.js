/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('segundoPisoApp').config(function($routeProvider) {
    $routeProvider
            .when('/inicio', {
                templateUrl: 'partials/login.html',
                controller: 'loginCtrl'
            })
            .when('/alumnos', {
                templateUrl: 'partials/catalogs/student.html',
                controller: 'studentsCtrl'
            })
            .when('/maestros', {
                templateUrl: 'partials/catalogs/teacher.html',
                controller: 'teachersCtrl'
            })
            .when('/clases', {
                templateUrl: 'partials/catalogs/class.html',
                controller: 'clazzesCtrl'
            })
            .when('/eventos', {
                templateUrl: 'partials/catalogs/event.html',
                controller: 'eventsCtrl'
            })
            .when('/movimientos', {
                templateUrl: 'partials/registro/movements.html',
                controller: 'movementsCtrl'
            })
            .when('/asistencia', {
                templateUrl: 'partials/registro/attendence.html',
                controller: 'attendenceCtrl'
            })
            .when('/externos', {
                templateUrl: 'partials/catalogs/extern.html',
                controller: 'externCtrl'
            })
            .when('/talleres', {
                templateUrl: 'partials/catalogs/workshop.html',
                controller: 'workshopCtrl'
            })
            .when('/registroTalleres', {
                templateUrl: 'partials/registro/asistenciaTalleres.html',
                controller: 'workshopAtendenceCtrl'
            }) 
            .when('/', {
                templateUrl: 'partials/start.html',
                controller: 'homeCtrl'
            })
            .when('/reporteAlumnos', {
                templateUrl: 'partials/reports/alumnos.html',
                controller: 'studentsReportCtrl'
            })
            .when('/reporteClases', {
                templateUrl: 'partials/reports/classes.html',
                controller: 'classesReportCtrl'
            })
            .when('/pago/maestros', {
                templateUrl: 'partials/registro/teachersPayment.html',
                controller: 'teachersPaymentCtrl'
            })
            .when('/reporte/pago/maestros', {
                templateUrl: 'partials/reports/pagoMaestro.html',
                controller: 'teachersPaymentReportCtrl'
            })
            .when('/reporte/talleres', {
                templateUrl: 'partials/reports/talleres.html',
                controller: 'workshopsReportCtrl'
            });
});