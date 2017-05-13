app.controller('reporteAlumnosClase', function($scope, $rootScope, WebApiFactory) {
    $scope.classes = [];
    var dd_mm_yyyy = "DD/MM/YYYY";
    var yyyy_mm_dd = "YYYY-MM-DD";
    var table;
    $rootScope.filter = {fechaInicio: moment().format(dd_mm_yyyy), fechaFin: '', clases: 0};
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
                    {"data": "alumno.codigo"},
                    {"data": "alumno.nombre"},
                    {"data": "alumno.correo"},
                    {"data": "alumno.telefono"}];
    init();
    
    function init() {
        WebApiFactory.getClasses(true).then(function (data) {
            $scope.clases = data;
            if (!Utils.isEmpty(data)) {
                $rootScope.filter.clases = data[0].id;
            }
            
            $scope.createReport(true);
        });
    }
    
    $scope.createReport = function(newTable) {
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
        });
        
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
