/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('studentsCtrl', function($scope, $http, $rootScope, $timeout, WebApiFactory) {
    var newTable = true;
    var table;
    var dd_mm_yyyy = "DD/MM/YYYY";
    var yyyy_mm_dd = "YYYY-MM-DD";
    var columns = [
        {"data": "codigo"},
        {"data": "nombre"},
        {"data": "correo"},
        {"data": "telefono"},
        {"data": "fechaNacimiento"},
        {"data": "statusStr"}];
    
    function createTable (items, newTable) {
        if (!Utils.isTrue(newTable) && !Utils.isEmpty(table)) {
            //Hide the current table.
            $('#alumnos').attr("style", "none");
            //Destroy the table to create the new one.
            table.destroy();
        }
        
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
                        console.log(student)
                        var fechaNacimiento = Utils.isEmpty(student.fechaNacimiento) ? "" : moment(student.fechaNacimiento, dd_mm_yyyy).format(yyyy_mm_dd);
                        
                        student.status = "true";
                        student.alumno = "true";
                        student.fromStudent = "true";
                        student.fechaNacimiento = fechaNacimiento;
                        console.log(student)
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
                    name: "student.fechaNacimiento",
                    type: "datetime",
                    format: "DD/MM/YYYY"
                }
            ]
        });
        
        editor.on("submitComplete", function(a, o, action) {
            console.log(a, o, action)
            newTable = false;
            init();
        });
        
        editor.on('preSubmit', function (e, o, action ) {
            if ( action !== 'remove') {
                var codigo = this.field('student.codigo');
                var nombre = this.field("student.nombre");
                var correo = this.field("student.correo");
                
                if (!codigo.isMultiValue()) {
                    if (Utils.isEmpty(codigo.val())) {
                        codigo.error("* Campo requerido");
                    }
                    
                    if (isNaN(codigo.val()) && codigo.val().length < 4) {
                        codigo.error("* Campo numérico, mnimo 4 digitos");
                    }
                }

                if (!nombre.isMultiValue() ) {
                    if (Utils.isEmpty(nombre.val())) {
                        nombre.error( '* Campo requerido' );
                    }
                }

                /*if (!correo.isMultiValue()) {
                    if (!Utils.isEmpty(correo.val())) {
                        if (!Utils.correoVaido(correo.val())) {
                            correo.error("* Formato inválido");
                        }
                    }
                }*/

                // If any error was reported, cancel the submission so it can be corrected
                if ( this.inError() ) {
                    return false;
                }
            }
        });
        
        table = $("#alumnos").DataTable({
            "data": items,
            "columns": columns,
            "searching": true,
            "paging": true,
            "responsive": true,
            "scrollCollapse": true,
            "dom": 'Bfrtip',
            select: true,
            "order": [[0, "ASC"]],
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
    
    $(document).ready(function() {
        init();
    });
    
    function init() {
        WebApiFactory.getStudents(true).then(function(items) {
            createTable(items, newTable);
        });
    }
});