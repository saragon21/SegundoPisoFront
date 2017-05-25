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
                    {"data": "codigoLink"},
                    {"data": "alumno.nombre"},
                    {"data": "alumno.correo"},
                    {"data": "alumno.telefono"}];
    init();
    
    function init() {
        WebApiFactory.getClasses(true).then(function (data) {
            WebApiFactory.getStudent(idAlumno).then(function(studentData) {
                WebApiFactory.getAttendenceByStudent(idAlumno).then(function(attendenceData) {
                    $scope.clases = data;
                    $scope.student = studentData;
                    $scope.createReport(true);
                });
            });
        });
    }
    
    $scope.createReport = function(newTable) {
        console.log(newTable, !Utils.isTrue(newTable), table, !Utils.isEmpty(table))
        if (!Utils.isTrue(newTable) && !Utils.isEmpty(table)) {
            //Hide the current table.
            $('#reporteAlumnosClase').attr("style", "none");
            //Destroy the table to create the new one.
            table.destroy();
        }
            
        var newFilter = Utils.clone($rootScope.filter);
        
        if (!Utils.isEmpty(newFilter.fechaInicio)) {
            var fechaInicio = moment(newFilter.fechaInicio, dd_mm_yyyy).format(yyyy_mm_dd);
            newFilter.fechaInicio = fechaInicio;
        }
        
        if (!Utils.isEmpty(newFilter.fechaFin)) {
            var fechaFin = moment(newFilter.fechaFin, dd_mm_yyyy).format(yyyy_mm_dd);
            newFilter.fechaFin = fechaFin;
        }
        
        var filters = angular.toJson(newFilter);
        WebApiFactory.getReportAlumnosClase(filters).then(function (data) {
            createTable(data);
        });
    };
    
    function createTable(items) {
        items = Utils.parseData(items);
        $('#reporteAlumnosClase tfoot th').each( function () {
            var title = $(this).text();
            $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
        });console.log(items)
        
        table = $("#reporteAlumnosClase").DataTable({
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
