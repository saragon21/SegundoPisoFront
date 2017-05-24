app.controller('reporteAlumnosClase', function($scope, $http, $rootScope, $timeout, WebApiFactory) {
    $scope.classes = [];
    var dd_mm_yyyy = "DD/MM/YYYY";
    var yyyy_mm_dd = "YYYY-MM-DD";
    var table;
    $scope.filter = {fechaInicio: moment().format(dd_mm_yyyy), fechaFin: '', clases: 0};
    var columns = [
                    {"data": "codigo"},
                    {"data": "nombre"},
                    {"data": "correo"},
                    {"data": "telefono"}];
    init();
    
    function init() {
        WebApiFactory.getClasses(true).then(function (data) {
            $scope.clases = data;
            if (!Utils.isEmpty(data)) {
                $scope.filter.clases = data[0].id;
            }
            
            $scope.createReport(true);
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
            
        var newFilter = Utils.clone($scope.filter);
        
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
        table = $("#reporteAlumnosClase").DataTable({
                "data": items,
                "columns": columns,
                "searching": true,
                "paging": true,
                "dom": '<"tableTitle"><"filterString">frtB<Tip>'
            });
    }
});