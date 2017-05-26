app.controller('reporteClasesAlumno', function($scope, $rootScope, $routeParams, WebApiFactory) {
    $scope.classes = [];
    var idAlumno = $routeParams.idAlumno;
    var dd_mm_yyyy = "DD/MM/YYYY";
    var yyyy_mm_dd = "YYYY-MM-DD";
    var table;
    $("#fechaInicio").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });
    $("#fechaFin").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy'
    });
    var columns = [
                    {"data": "idAsistencia"},
                    {"data": "idMaestro.nombre"},
                    {"data": "fechaStr"}];
    init();
    
    function init() {
        console.log($rootScope.filter)
        WebApiFactory.getClasses(true).then(function (data) {
            WebApiFactory.getStudent(idAlumno).then(function(studentData) {
                $scope.clases = data;
                $scope.student = studentData;
                $scope.createReport(true);
            });
        });
    }
    
    $scope.createReport = function(newTable) {
        if (!Utils.isTrue(newTable) && !Utils.isEmpty(table)) {
            //Hide the current table.
            $('#reporteClasesAlumno').attr("style", "none");
            //Destroy the table to create the new one.
            table.destroy();
        }
            
        if (!Utils.isEmpty($rootScope.filter)) {
            var newFilter = Utils.clone($rootScope.filter);
console.log(newFilter, $rootScope.filter)
            if (!Utils.isEmpty(newFilter.fechaInicio)) {
                var fechaInicio = moment(newFilter.fechaInicio, dd_mm_yyyy).format(yyyy_mm_dd);
                newFilter.fechaInicio = fechaInicio;
            }

            if (!Utils.isEmpty(newFilter.fechaFin)) {
                var fechaFin = moment(newFilter.fechaFin, dd_mm_yyyy).format(yyyy_mm_dd);
                newFilter.fechaFin = fechaFin;
            }

            var filters = angular.toJson(newFilter);
            WebApiFactory.getAttendenceByStudent(filters).then(function (data) {
                console.log(data)
                createTable(data);
            });
        }
    };
    
    function createTable(items) {
        $('#reporteClasesAlumno tfoot th').each( function () {
            var title = $(this).text();
            $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
        });
        
        table = $("#reporteClasesAlumno").DataTable({
            "data": items,
            "columns": columns,
            "searching": true,
            "paging": true,
            "responsive": true,
            "scrollCollapse": true,
            "dom": 'frtip',
            "select": true
        });
    }
});
