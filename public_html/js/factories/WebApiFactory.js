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
    
    return WebApiFactory;
});