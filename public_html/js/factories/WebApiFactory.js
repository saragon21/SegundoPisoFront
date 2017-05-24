/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
app.factory('WebApiFactory', function ($http) {
    var WebApiFactory = {};
    
    WebApiFactory.getStudents = function (activos) {
        return $http({
            method: 'get',
            params: {'alumnos': activos},
            url: Config.dataApiUrl + 'rest/student/getStudents/',
            dataType: 'jsonp'
        }).then(function (response) {
            return response.data;
        });
    };
    
    WebApiFactory.getClasses = function (activas) {
        return $http({
            method: 'get',
            params: {'status': activas},
            url: Config.dataApiUrl + 'rest/clase/getClases/status',
            dataType: 'jsonp'
        }).then(function (response) {
            return response.data;
        });
    };
    
    WebApiFactory.getReportAlumnosClase = function (params) {
        return $http({
            method: 'post',
            data: params,
            url: Config.dataApiUrl + 'rest/report/classes'
        }).then(function (response) {
            return response.data;
        });
    };
    
    return WebApiFactory;
});