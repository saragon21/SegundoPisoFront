/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('studentsCtrl', function($scope, $http, $rootScope, $timeout, WebApiFactory) {
    $rootScope.showMenu = true;
    $scope.alumno = {status: "true", alumno: "true"};
    $scope.curPage = 0;
    $scope.sizeOfPage = 10;
    $scope.students = [];
    $scope.extern = {};
    
    init();
    
    function init() {
        var columns = [
                       {"data": "idAlumno"},
                       {"data": "nombre"},
                       {"data": "correo"},
                       {"data": "telefono"},
                       {"data": "lastModUser"},
                       {"data": "statusStr"}];

        WebApiFactory.getStudents(true).then(function(items) {
            console.log(items)
            $("#alumnos").DataTable({
                "data": items,
                "columns": columns,
                "searching": true,
                "paging": true,
                "dom": '<"tableTitle"><"filterString">frtB<Tip>'
            });
        });
        //$scope.activos = CatalogService.getActivos();
        //$scope.alumno = {status: $scope.activos[0].value, alumno: "true"};
        
        /*$http({
            method: 'get',
            url: 'rest/student/getStudents/',
            params: {'alumnos' :true}
        }).success(function(data, status, headers, config) {
            $scope.students = data;
        }).error(function(data, status, headers, config) {
        });*/
    }

    $scope.setStudent = function(student) {
        $scope.alumno = student;
    };

    $scope.persistStudent = function() {
        $scope.generalMessage = null;
        $scope.showMessage = false;
        $scope.errorMessage = false;
        $scope.successMessage = false;
        $scope.extern.fromStudent = true;

        if ($scope.studentForm.$valid) {
            delete $scope.alumno.statusStr;
            var alumno = angular.toJson($scope.alumno);
            $http({
                method: 'post',
                url: 'rest/student/persistStudent',
                data: alumno,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Accept": "application/json"
                }
            }).success(function(data, status, headers, config) {
                $scope.generalMessage = data.message;


                if (!data.valid) {
                    $scope.errorMessage = true;
                    $timeout(function() {
                        $scope.showMessage = true;
                    }, 5000);
                } else {
                    $scope.successMessage = true;
                    $timeout(function() {
                        $scope.showMessage = true;
                    }, 5000);
                    init();
                    $scope.studentForm.$setPristine();
                    $scope.alumno = {};
                    $scope.alumno = {status: "true", alumno: "true"};
                }
            }).error(function(data, status, headers, config) {
                alert("Contacte al adminsitrador");
            });
        }
    };
    
    $scope.numberOfPages = function () {
        return Math.ceil($scope.students.length / $scope.sizeOfPage);
    };
});