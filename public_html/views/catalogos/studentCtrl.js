/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('studentsCtrl', function($scope, $http, $rootScope, $timeout, WebApiFactory) {
    var columns = [
        {"data": "codigo"},
        {"data": "nombre"},
        {"data": "correo"},
        {"data": "telefono"},
        {"data": "lastModUser"},
        {"data": "statusStr"}];
    
    function createTable (items) {
        $('#alumnos tfoot th').each( function () {
            var title = $(this).text();
            $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
        });
            
        var editor = new $.fn.dataTable.Editor({
            ajax: {
                create: {
                    type: 'POST',
                    url:  Config.dataApiUrl + 'rest/student/persistStudent',
                    data: function (d) {
                        var student = d.data[0].student;
                        student.status = "true";
                        student.alumno = "true";
                        student.fromStudent = "true";
                        
                        return angular.toJson(student);
                    },
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        "Accept": "application/json"
                    }
                },
                edit: {
                    type: 'POST',
                    url:  Config.dataApiUrl + 'rest/student/persistStudent'
                },
                remove: {
                    type: 'POST',
                    url:  Config.dataApiUrl + 'rest/student/persistStudent'
                }
            },
            table: "#alumnos",
            fields: [ 
                {
                    label: "Código:",
                    name: "student.codigo"
                },
                {
                    label: "Nombre:",
                    name: "student.nombre"
                }, {
                    label: "Correo:",
                    name: "student.correo"
                }, {
                    label: "Teléfono:",
                    name: "student.telefono"
                }, {
                    label: "Fecha Nacimiento:",
                    name: "student.statusStr",
                    type: "datetime"
                }
            ]
        });
            
        var table = $("#alumnos").DataTable({
            "data": items,
            "columns": columns,
            "searching": true,
            "paging": true,
            "responsive": true,
            "scrollCollapse": true,
            "dom": 'Bfrtip',
            select: true,
            buttons: [
                { extend: "create", editor: editor },
                { extend: "edit",   editor: editor },
                { extend: "remove", editor: editor }
            ]
        });
            
        // Apply the search
        table.columns().every( function () {
            var that = this;

            $( 'input', this.footer() ).on( 'keyup change', function () {
                if ( that.search() !== this.value ) {
                    that
                        .search( this.value )
                        .draw();
                }
            });
        });
    }
    
    init();
    
    function init() {
        WebApiFactory.getStudents(true).then(function(items) {
            createTable(items);
        });
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
});