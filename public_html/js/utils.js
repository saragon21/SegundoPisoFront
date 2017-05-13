    function Utils() {
    }
    
    /**
     * Validates if the value is empty or not.
     * @param {String} value
     * @returns {Boolean}
     */
    Utils.isEmpty = function (value) {
        if (value !== undefined) {
            if (value instanceof Array) {
                value = value.toString();
            }

            if (value !== '' && value !== ' ') {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    };
    
    Utils.clone = function(obj) {
        if (null === obj || "object" !== typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    };
    
    Utils.parseData = function(items) {
        for (var index in items) {
            items[index]["codigoLink"] = "<a href='#/reporte/clases/alumno/" + items[index].alumno.idAlumno + "'>" + items[index].alumno.codigo + "</a>";
        }
        
        return items;
    };
    
    Utils.correoValido = function(correo) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(correo)) {
            return false;
        }
        
        return true;
    };
    
    /**
     * Create a String with the status that are between from and to
     * parameters, including them.
     * @param {String} from
     * @param {String} to
     * @param {[]} statusArray
     * @returns {String}
     */
    Utils.getStatus = function (from, to, statusArray) {
        //Initialization
        var status = '';
        var fromIndex = 0;
        var toIndex = 0;
        //Initialization

        //Iterates over all the status
        for (var i = 0; i < statusArray.length; i++) {
            //Get the index where the status from is
            if (from === statusArray[i]) {
                fromIndex = i;
            }

            //Get the index where the status to is
            if (to === statusArray[i]) {
                toIndex = i;
            }
        }

        //If the index of the to is 0, then set it to the size of the
        //array to take all the status, otherwise just increase in one
        //the index.
        if (toIndex === 0) {
            toIndex = statusArray.length;
        } else {
            toIndex++;
        }

        //Get the values starting from the index from to the to index.
        status = statusArray.slice(fromIndex, toIndex).toString();
        //Return the value.
        return status;
    };

    /*
     * Creates a date object based on the date string and time string, the date 
     * string is split by the splitDateBy parameter.
     * @param {String} dateString
     * @param {String} timeString
     * @param {String} splitDateBy
     * @returns {Date}
     */
    Utils.createDate = function (dateString, timeString, splitDateBy) {
        //Split the dateString parameter
        var datePart = dateString.split(splitDateBy);
        //Split the timeString parameter
        var timePart = timeString.split(":");
        //Creates the date object depending the splitDateBy parameter
        if (splitDateBy === '/') {
            return new Date(datePart[2], (datePart[1] - 1), datePart[0], timePart[0], timePart[1], timePart[2]);
        } else {
            return new Date(datePart[0], (datePart[1] - 1), datePart[2], timePart[0], timePart[1], timePart[2]);
        }
    };

    

    /**
     * Return true if the object is empty otherwise false.
     * @param {Object} value
     * @returns {Boolean}
     */
    Utils.isEmptyObj = function(value) {
        //If the object isn't undefined, validates if the object has properties.
        if (value !== undefined) {
            //If the object dosn't have properties, then is an empty object, otherwise isn't.
            return Object.keys(value).length === 0;
        } else {
            return true;
        }
    };

    /**
     * Get the corresponding color for the value.
     * @param {String} area
     * @param {int} value
     * @param {Array} ranges
     * @returns {Object}
     */
    Utils.getColor = function(area, value, ranges) {
        //If the range parameter is empty, gets the range property of the area from the Config object.
        var rangesColor = Utils.isEmpty(ranges) ? Config.Areas[area].ranges : ranges;
        var colorsConfig = {color: "background", textColor: "txt_black"};
        // Ranges
        if (rangesColor !== undefined) {
            //If the value is greater than 100, set 100, is the value is less than 0, set 0 otherwise sets the value.
            colorsConfig.value =  value >= 100 ? 100 : value < 0 ? 0 : value;
            //Iterates over the ranges property
            for (var index in rangesColor) {
                //If the value is between the from and to property of the range, then get the color and ends the cycle.
                if ((colorsConfig.value * 1) >= rangesColor[index].from && (colorsConfig.value * 1) <= rangesColor[index].to) {
                    //Sets the color for the background.
                    colorsConfig.color = rangesColor[index].style;
                    //Sets the color for the font.
                    colorsConfig.textColor = rangesColor[index].font;
                    break;
                }
            }
        }
        return colorsConfig;
    };

    /**
     * Get the date part of an Date object.
     * @param {type} date
     * @returns {String}
     */
    Utils.formatDate = function(date) {
        return Utils.pad(date.getDate(), 2) + '/' + Utils.pad(date.getMonth() + 1, 2) + '/' + date.getFullYear();
    };
    
    /**
     * Gets the value of the cookie.
     * @param {String} cname
     * @returns {String}
     */
    Utils.getCookie = function(cname) {
        var name = cname + "=";
        //Get the available cookies and split it by ;
        var ca = document.cookie.split(';');
        //Iterates over cookies
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            //Search for the cookie.
            while (c.charAt(0) === ' ')
                c = c.substring(1);
            if (c.indexOf(name) === 0)
                return c.substring(name.length, c.length);
        }
        return "";
    };
    
    /**
     * Creates a new cookie with the cname and the cvalue.
     * @param {String} cname
     * @param {String} cvalue
     */
    Utils.setCookie = function(cname, cvalue) {
        var d = new Date();
        d.setTime(d.getTime() + (1000 * 24 * 60 * 60 * 1000));
        document.cookie = cname + "=" + cvalue + "; expires=" + d.toUTCString() + ";";
    };
    
    /*
     * Delete the cookie by the cname.
     * @param {String} cname
     */
    Utils.deleteCookie = function(cname) {
        var d = new Date();
        d.setTime(d.getTime() + (1000 * 24 * 60 * 60 * 1000));
        document.cookie = cname + "=" + "; expires=" + d.toUTCString() + ";";
    };
    
    Utils.createStatus = function(bodyStatus) {
        var status = [];
        for (var index in bodyStatus) {
            if (status.indexOf(bodyStatus[index]) > -1) {
                continue;
            }
            status.push(bodyStatus[index]);
        }
            
        return status.toString();
    };
    
    Utils.generates7Dates = function(date) {
        var numberDates = 7;
        var dates = [];
        var dateObj = {date:'', days: 0};
        var previousDays = 0;

        if (date.hour() < 6) {
            date.subtract(1, 'days');
        }

        for (var index = 0; index < numberDates; index++) {
            dateObj = {date:'', days: 0};
            dateObj.date = date.format('DD/MM/YYYY');
            dateObj.days = previousDays;
            dates.push(dateObj);
            previousDays++;
            date = date.subtract(1, 'days');
        }
        return dates;
    };
    
    /**
     * Add the number of days that are passed as parameter to the date, and 
     * return the resulting date.
     * @param {type} date
     * @param {type} days
     * @returns {Utils.addDays.newDate|Date}
     */
    Utils.addDays = function(date, days) {
        var dateAsString = Utils.formatDate(date);
        var newDate = Utils.createDate(dateAsString, '00:00:00', '/');
        newDate.setDate((newDate.getDate() + days * 1));
        return newDate;
    };
    
    /**
     * Validate if the value is undefined, return a empty String, otherwise
     * return the same value.
     * @param {String} value
     * @returns {String}
     */
    Utils.replaceUndefined = function(value) {
        if (Utils.isEmpty(value)) {
            value = '&nbsp;';
        }

        return value;
    };
    
    Utils.removeDuplicated = function(values, notDuplicatedValues) {
        for (var index in values) {
            if (notDuplicatedValues.indexOf(values[index]) > -1) {
                continue;
            }
            notDuplicatedValues.push(values[index]);
        }
            
        return notDuplicatedValues.toString();
    };
    
    /**
     * Create a new link element and configure its attributes, like the
     * href, target and name. Then triggers the event click to generate
     * the file.
     * @param {String} type - If its a csv, pdf, xsl.
     * @param {String} base64data - The content of the file.
     */
    Utils.createFile = function(type, base64data) {
        var name = Utils.createFileName();
        var a = document.createElement('a');
        a.href = 'data:attachment/' + type + ';' + base64data;
        a.target = '_blank';
        a.download = name + '.' + type;

        document.body.appendChild(a);
        a.click();
        $('.table-loader').fadeOut();
    };
    
    Utils.createFileName = function() {
        var today = new Date();
        var day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
        var month = (today.getMonth() + 1) < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);
        var name = 'Orders_' + (day + month + today.getFullYear()) + '_' + (today.getHours() + '' + today.getMinutes() + '' + today.getSeconds());

        return name;
    };
    
    /**
     * Reads the current language, then iterates over the EFS values and
     * get the text, finally concatenates the EFS and return the string to
     * add as a tooltip.
     * @param {Object} item
     * @returns {String}
     */
    Utils.getEfsString = function(item, symbol, language) {
        language = language !== undefined ? language : Utils.getCookie('language').toUpperCase();
        var efsText = 'EFS:' + symbol;
        var lastEfs = '';
        language = language === "ES-MX" ? "ES" : "DE";
        
        for (var index in item["EFS"]) {
            if (lastEfs !== item["EFS"][index]) {
                efsText += item["EFS"][index] + ': ' + item[item["EFS"][index] + '.' + language] + symbol;
                lastEfs = item["EFS"][index];
            }
        }
        
        return efsText;
    };
    
    Utils.pad = function (num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    };
    
    Utils.calculateA60Capacity = function(area, parent, location) {
        var locations;
        var capacity = 0;

        if (!Utils.isEmpty(parent)) {
            locations = Config.Areas[area].sections[parent][location];
            for (var index in locations) {
                capacity += locations[index].spots;
            }
        } else if (!Utils.isEmpty(location)) {
            locations = Config.Areas[area].sections[location];
            for (var index in locations) {
                for (var subIndex in locations[index]) {
                    capacity += locations[index][subIndex].spots;
                }
            }
        } else {
            locations = Config.Areas[area].sections;
            for (var index in locations) {
                for (var subIndex in locations[index]) {
                    for (var innerIndex in locations[index][subIndex]) {
                        capacity += locations[index][subIndex][innerIndex].spots;
                    }
                }
            }
        }

        return capacity;
    };
    
    Utils.calculateA62Capacity = function(area, location) {
        var locations;
        var capacity = 0;
        
        if (!Utils.isEmpty(location)) {
            locations = Config.Areas[area].sections[location];
            for (var index in locations) {
                capacity += locations[index].spots;
            }
        } else {
            locations = Config.Areas[area].sections;
            for (var index in locations) {
                for (var indexL in locations[index]) {
                    if (!Utils.isEmpty(locations[index][indexL].spots)) {
                        capacity += locations[index][indexL].spots;
                    }
                }
            }
        }

        return capacity;
    };
    
    Utils.calculateA60Capacity = function(area, parent, location) {
        var locations;
        var capacity = 0;

        if (!Utils.isEmpty(parent)) {
            locations = Config.Areas[area].sections[parent][location];
            for (var index in locations) {
                capacity += locations[index].spots;
            }
        } else if (!Utils.isEmpty(location)) {
            locations = Config.Areas[area].sections[location];
            for (var index in locations) {
                for (var subIndex in locations[index]) {
                    capacity += locations[index][subIndex].spots;
                }
            }
        } else {
            locations = Config.Areas[area].sections;
            for (var index in locations) {
                for (var subIndex in locations[index]) {
                    for (var innerIndex in locations[index][subIndex]) {
                        capacity += locations[index][subIndex][innerIndex].spots;
                    }
                }
            }
        }

        return capacity;
    };
    
    Utils.isTrue = function(value) {
        if(!Utils.isEmpty(value)) {
            if (value === 'true') {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    /**
     * Format a date string and returns it with the format DD/MM/YYYY HH:MM:SS 
     * @param {String} date
     * @returns {String}
     */
    Utils.formatDateTime = function(date) {        
        return date.replace(/\./g, '/');        
    };
    
    
    
    Utils.createArray = function(values, delimiter) {
        var array = [];
        if (!Utils.isEmpty(values)) {

            if (!values.includes(delimiter)) {
                array.push(values.toUpperCase());
            } else {
                array = values.toUpperCase().split(delimiter, values.split(delimiter).length);
            }
        }

        return array;
    };
    
    /*
     * If the min time is lower than the target min time, then the color is red, otherwise green.
     * If the max time is greater than the target max time, then the color is red, otherwise green.
     * If the avg time is greater than the target avg time, then the color is red, otherwise green.
     * @param {Array} kpis
     * @param {Array} types
     * @returns {undefined}
     */
    Utils.setKpiColor = function setColors(kpis, types) {
        for (var index in kpis) {
            for (var indexType in types) {
                var target = kpis[index]['target_' + types[indexType]];
                var actual = kpis[index][types[indexType]];
                var dateTarget = Date.parse('01/01/2011 ' + target);
                var dateActual;

                if (actual.split(':').length > 3) {
                    var lastIndex = actual.lastIndexOf(':');
                    actual = actual.substring(0, lastIndex);
                }         

                dateActual = Date.parse('01/01/2011 ' + actual);

                if ('min' === types[indexType]) {
                    if (dateActual < dateTarget) {
                        kpis[index]['class_' + types[indexType]] = 'red';
                    } else {
                        kpis[index]['class_' + types[indexType]] = 'green';
                    }
                } else if ('max' === types[indexType]) {
                    if (dateActual > dateTarget) {
                        kpis[index]['class_' + types[indexType]] = 'red';
                    } else {
                        kpis[index]['class_' + types[indexType]] = 'green';
                    }
                } else if ('avg' === types[indexType]) {
                    if (dateActual > dateTarget) {
                        kpis[index]['class_' + types[indexType]] = 'red';
                    } else {
                        kpis[index]['class_' + types[indexType]] = 'green';
                    }
                }
            }
        }
    };
    
    /**
     * Take the first digit, then takes the array with the possible 
     * starting values for a PIN, if the first digit is in the array
     * returns true, otherwise returns false.
     * @param {String} value
     * @param {String} pin_starts
     * @returns {Boolean}
     */
    Utils.isPin = function(value, pin_starts)  {
        var _1digit = value.substring(0, 1);
        var pin = pin_starts.toString().indexOf(_1digit) >= 0;
        return pin;
    };
    
    /*
     * Take the first to digits and convert into a int value, then
     * evaluete them and if they are below the KNR_LIMIT constant,
     * the value is a KNR otherwise is not.
     * @param {String} value
     * @returns {Boolean}
     */
    Utils.isAKnr = function(value, krn_limit) {
        var _2digits = value.substring(0, 2);
        _2digits = _2digits * 1;

        if (_2digits <= krn_limit) {
            return true;
        }

        return false;
    };
    
    Utils.isAlpahnumeric = function(value, separators, size) {
        var valid = false;
        //Split the string by , * - operations.
        var subfilter = value.split(new RegExp(separators.join('|'), 'g'));

        for (var index in subfilter) {
            if (!Utils.isEmpty(subfilter[index])) {
                if (subfilter[index].length === size && /^[a-z0-9]+$/i.test(subfilter[index])) {
                    valid = true;
                } else {
                    valid = false;
                    break;
                }
            }
        }

        return valid;
    };
    
    Utils.isAlphanumeric = function(value, separators) {
        var valid = false;
        //Split the string by , * - operations.
        var subfilter = value.split(new RegExp(separators.join('|'), 'g'));
        
        for (var index in subfilter) {
            if (/^[a-z0-9]+$/i.test(subfilter[index])) {
                valid = true;
            } else {
                valid = false;
                break;
            }
        }

        return valid;
    };
    
    Utils.isNumeric = function(value, separators, size) {
        var valid = false;
        //Split the string by , * operations.
        var subfilter = value.split(new RegExp(separators.join('|'), 'g'));
        
        if (value.indexOf(Utils.notDelimiter) < 0) {
            for (var index in subfilter) {
                if (subfilter[index].length <= size && /^[0-9]+$/i.test(subfilter[index])) {
                    valid = true;
                } else {
                    valid = false;
                    break;
                }
            }
        }
        
        return valid;
    };
    
    Utils.calculateCapacity = function(area, subarea) {
        var segments = Config.Areas[area].segments;
        var capacity = 0;
        
        if (!Utils.isEmpty(subarea)) {
            if (!Utils.isEmpty(Config.Areas[area].segments[subarea].spots)) {
                capacity = Config.Areas[area].segments[subarea].spots;
            } else {
                segments = Config.Areas[area].segments[subarea]
                for (var index in segments) {
                    capacity += !Utils.isEmpty(segments[index].spots) ? segments[index].spots : 0;
                }
            }
        } else {
            for (var index in segments) {
                if (Utils.isEmpty(segments[index].spots)) {
                    for (var indexStatus in segments[index]) {
                        if (!Utils.isEmpty(segments[index][indexStatus].spots)) {
                            capacity += segments[index][indexStatus].spots;
                        }
                    }
                } else {
                   capacity += segments[index].spots;
                }
            }
        }
        
        return capacity;
    };
    
    Utils.setAlarm = function(target, actual) {
        var dateTarget = Date.parse('01/01/2011 ' + target);
        var dateActual;

        if (actual.split(':').length > 3) {
            var lastIndex = actual.lastIndexOf(':');
            actual = actual.substring(0, lastIndex);
        }         

        dateActual = Date.parse('01/01/2011 ' + actual);
        
        if (dateActual > dateTarget) {
            return true;
        } else {
            return false;
        }
    };
    
    Utils.addEmptySpots = function(orders, capacitySegment) {
        var until = capacitySegment - orders.length;
        for (var i = 0; i < until; i++) {
            var car = {isEmpty: true};
            orders.unshift(car);
        }
        
        return until;
    };
    
    Utils.compareByStatuszeit = function (a, b) {
        var aDate = moment(a.Statuszeit.replace(/\./g, '/'), 'DD/MM/YYYY HH:mm:ss');
        var bDate = moment(b.Statuszeit.replace(/\./g, '/'), 'DD/MM/YYYY HH:mm:ss');

        return bDate.valueOf() - aDate.valueOf();
    };
    
    Utils.emptyLocation = function(obj) {
        return obj.LocationName === '';
    };
    
    Utils.notEmptyLocation = function(obj) {
        return obj.LocationName !== '';
    };
    
    //Group orders for the extraction monitor page
    Utils.groupOrders = function(orders, pr, translate, currentStatus, tMax, today) {
        var ordersIO = [];
        var ordersNIO = [];
        var monitorRow = {"ioCount": 0, "nioCount": 0, "ioOrders" : [], "nioOrders": [], "status": currentStatus, "tMax": tMax, "total": 0, "name": currentStatus};
        var hours = tMax.split(':')[0];
        var minutes = tMax.split(':')[1];
        var tMinutes = (Number(hours) * 60) + Number(minutes);
        
        //Validates that the array has elements
        if (orders.length > 0) {
            //Iterates over each order in the array.
            for (var index in orders) {
                //Creates a moment object with the status time of the object.
                var time = moment(orders[index].Statuszeit, 'DD.MM.YYYY HH:mm:ss');
                //Get the time that the order has had the extraction status.
                var stopWatch = Utils.getStopWatch(time, today);
                //Get the PR for the country of the car.
                var land = pr.GetPRByFamily("TPL", orders[index].PR);
                //Get the PR for the Steuerungsnummer of the car.
                var quattro = pr.GetPRByFamily("SNR", orders[index].PR);
                
                //Set the properties used in the extraction monitor to the object.
                orders[index].stopWatch = stopWatch.stopWatch;
                orders[index].land = land;
                orders[index].landImage = "<img src='img/flags/" + land + ".png' title='" + translate.instant("P" + land) + "'> <span>" + land + "</span>";
                orders[index].daisyNr = !Utils.isEmpty(quattro) ? quattro :  "";
                orders[index].sonderText = "";
                
                //If the time that a car has been in a extraction status is less that the T.Max, then the cars is an IO, otherwise a NIO.
                if (stopWatch.totalMinutes <= tMinutes) {
                    orders[index].class = "iorow";
                    ordersIO.push(orders[index]);
                } else {
                    orders[index].class = "niorow";
                    ordersNIO.push(orders[index]);
                }
            }
            
            //Configure the monitor row object.
            monitorRow.ioCount = ordersIO.length;
            monitorRow.nioCount = ordersNIO.length;
            monitorRow.ioOrders = ordersIO;
            monitorRow.nioOrders = ordersNIO;
            monitorRow.total = orders.length;
            monitorRow.name = currentStatus;
        }

        return monitorRow;
    };
    
    /**
     * Calculates how many time a car has been in a status.
     * @param {moment} time
     * @param {moment} today
     * @returns {Object}
     */
    Utils.getStopWatch = function(time, today) {
        var stopWatch;
        var minute = 60000;
        var hour = minute * 60;
        var day = 24 * hour;
        var waitingDays, waitingHours, waitingMinutes;
        var sTime = today.valueOf() - time.valueOf(); //Difference between the time when the car get the status and the current time
        var totalMinutes = sTime / minute;
        
        //Calculate how many days the car has had the status
        waitingDays = Math.round(sTime / day);
        sTime = sTime % day;
        //Calculate how many hours the car has had the status
        waitingHours = Math.round(sTime / hour);
        sTime = sTime % hour;
        //Calculate how many minutes the car has had the status
        waitingMinutes = Math.round(sTime / minute);
        //Create the stop watch string
        stopWatch = Utils.pad(waitingDays, 2) + ' ' + Utils.pad(waitingHours, 2) + ':' + Utils.pad(waitingMinutes, 2);
        
        return {'stopWatch': stopWatch, 'totalMinutes': totalMinutes};
    };
    
    /**
     * Used as a callback function to filter the elements.
     * The element variable is the current object in the iteration. 
     */
    Utils.filterByBodyStatus = function(currentStatus) {
        return function(element) {
            return element.BodyStatus === currentStatus;
        };
    };
    
    /*
     * Gets all the extraction status of an area or from a specific segment.
     * @param {String} area
     * @param {String} segment
     * @returns {String}
     */
    Utils.extractionStatus = function(area, segment, property) {
        var status = '';
        //If the segment is empty, get all the extraction points of the area, otherwise get the extraction points of the segment.
        if (Utils.isEmpty(segment)) {
            //Iterates over the segments of the area that have extraction points.
            for (var index in Config.Areas[area][property]) {
                //Get the elements of the segment.
                var segments = Config.Areas[area][property][index];
                //Concatenates the extraction status of the segment
                status += getExtractionPoints(segments);
            }
        } else {
            //Concatenates the extraction status of the segment
            status = getExtractionPoints(Config.Areas[area][property][segment]);
        }
        
        //Remove the last , and then return the result.
        return status.substr(0, status.length - 1);
    };
    
    Utils.getParent = function(segment) {
        var parent = segment;
        outer: for (var iAreas in Config.Areas) {
            if (!Utils.isEmpty(Config.Areas[iAreas].subpages)) {
                for (var iSubpage in Config.Areas[iAreas].subpages) {
                    if (iSubpage === segment) {
                        parent = iAreas;
                        break outer;
                    }
                }
            }
        }
        
        return parent;
    };
    
    Utils.groupBy = function(extraction, area, segment) {
        var extractionMonitorRow = {"ioCount": 0, "nioCount": 0, "total": 0};
        var ioCount = 0;
        var nioCount = 0;
        var total = 0;
        var name = area;

        if (Utils.isEmpty(segment)) {
            if (area !== 'Plant') {
                //Iteration by Segements
                for (var index in extraction[area]) {
                    //Iteration By status
                    for (var indexS in extraction[area][index]) {
                        ioCount += extraction[area][index][indexS].ioCount;
                        nioCount += extraction[area][index][indexS].nioCount;
                        total +=  extraction[area][index][indexS].total;
                    }
                }
            } else {
                for (var areaName in extraction) {
                    if (areaName !== 'Plant') {
                        for (var index in extraction[areaName]) {
                            //Iteration By status
                            for (var indexS in extraction[areaName][index]) {
                                ioCount += extraction[areaName][index][indexS].ioCount;
                                nioCount += extraction[areaName][index][indexS].nioCount;
                                total +=  extraction[areaName][index][indexS].total;
                            }
                        }
                    }
                }
            }
        } else {
            name = segment;
            for (var indexS in extraction[area][segment]) {
                ioCount += extraction[area][segment][indexS].ioCount;
                nioCount += extraction[area][segment][indexS].nioCount;
                total +=  extraction[area][segment][indexS].total;
            } 
        }

        extractionMonitorRow.ioCount = ioCount;
        extractionMonitorRow.nioCount = nioCount;
        extractionMonitorRow.total = total;
        extractionMonitorRow.name = name;
        
        return extractionMonitorRow;
    };
    
    Utils.allExtractionStatus = function(areas) {
        var allExtraction = '';
        
        for (var area in areas) {
            if (!Utils.isEmpty(Config.Areas[areas[area]].extraction)) {
                allExtraction += Utils.extractionStatus(areas[area]) + ',';
            }
        }
        
        if (allExtraction.length > 0) {
            allExtraction = allExtraction.substr(0, allExtraction.length - 1);
        }
        
        return allExtraction;
    };
    
    Utils.getAreasByProperty = function(property) {
        var areas = [];
        
        for (var index in Config.Areas) {
            if (!Utils.isEmpty(Config.Areas[index][property])) {
                areas.push(index);
            }
        }
        
        return areas;
    };
    
    /**
     * Concatenates the keys of the object and returns the value.
     * @param {Object} segments
     * @returns {String}
     */
    function getExtractionPoints(segments) {
        var status = '';
        //Iterates over the segments object and get its key.
        for (var index in segments) {
            status += index + ',';
        }
        
        return status;
    }
    
    Utils.getHoursMinutes = function(millisecondsTime) {
        var hoursInMilliseconds = 3600000;
        var minutesInMilliseconds  = 60000;
        var hour = Math.floor(millisecondsTime / hoursInMilliseconds);
        var minutes;
        
        millisecondsTime = millisecondsTime % hoursInMilliseconds;
        minutes = millisecondsTime / minutesInMilliseconds;
        
        return {"hours": hour, "minutes": minutes};
    };
    
    Utils.getExtractionHistoryPlant = function(orders, historyTMax) {
        var orderTotalMinutes = 0;
        var ordersIO = [];
        var ordersNIO = [];
        var hours = historyTMax.split(':')[0];
        var minutes = historyTMax.split(':')[1];
        var tMinutes = (Number(hours) * 60) + Number(minutes);
        var newOrders = [];
        
        for (var index in orders[0]) {
            var keys = orders[0][index].ExtractionHistory.map(function(a) {return Object.keys(a).toString();});
            var position = keys.indexOf("Total");

            if (position >= 0) {
                var total = orders[0][index].ExtractionHistory[position].Total;

                if (!Utils.isEmpty(total)) {
                    var pointPosition = total.indexOf(".");
                    if (pointPosition >= 0) {
                        orderTotalMinutes = Number(total.substring(0, pointPosition)) * 24 * 60;
                        total = total.substring(pointPosition + 1, total.length);
                    }

                    //Split the time and convert it into minutes.
                    var hourParts = total.split(":");

                    for (var indexHour in hourParts) {
                        switch (index) {
                            case 0: orderTotalMinutes += (Number(hourParts[indexHour]) * 60);
                                    break;
                            case 1: orderTotalMinutes += Number(hourParts[indexHour]);
                                    break;
                                    orderTotalMinutes += (Number(hourParts[indexHour]) / 60);
                            case 2: break;
                        }
                    }
                    
                    //If the total time is less than the T. Max, the order is a io, otherwise nio.
                    if (orderTotalMinutes <= tMinutes) {
                        ordersIO.push(orders[0][index]);
                    } else {
                        ordersNIO.push(orders[0][index]);
                    }
                }
            }
        }
        
        newOrders = newOrders.concat(ordersIO).concat(ordersNIO);
        
        return {"ioOrders": ordersIO, "nioOrders": ordersNIO, "orders": newOrders};
    };
    
    Utils.orderKeys = function(a, b) {
        if (a < b)
            return -1;
        if (a > b)
            return 1;
        return 0;
    };
    
    Utils.concatenateTimes = function(shifts) {
        var periods = [];

        for (var index in shifts) {
            periods = periods.concat(shifts[index].ListOfShiftPeriod);
        }

        return periods;
    };
    
    Utils.getDateToQuery = function(actual, constants) {
        var productionStart = moment();
        var productionEnd = moment();

        if (!Utils.isEmpty(constants.PRODUCTION_START) && !Utils.isEmpty(constants.PRODUCTION_END)) {
            var productionStartHour = constants.PRODUCTION_START.split(':')[0];
            var productionStartMinute = constants.PRODUCTION_START.split(':')[1];
            var productionEndHour = constants.PRODUCTION_END.split(':')[0];
            var productionEndMinute = constants.PRODUCTION_END.split(':')[1];

            productionStart.hour(productionStartHour);
            productionStart.minute(productionStartMinute);

            if (Number(productionEndHour) <= Number(productionStartHour)) {
                productionEnd.add(1, 'days');
            }

            productionEnd.hour(productionEndHour);
            productionEnd.minute(productionEndMinute);
            if (actual.unix() < productionStart.unix()) {
                if (actual.hour() >= 0 && actual.hour() <= Number(productionStartHour)) {
                    return productionStart.subtract(1,'day').format('YYYY-MM-DD');
                } else {
                    return actual.format('YYYY-MM-DD');
                }
            } else {
                return actual.format('YYYY-MM-DD');
            }

        } else {
            return actual.format('YYYY-MM-DD');
        }
    };
    
    Utils.calculateCurrentValue = function(actual, configuration, date) {
        var totalTarget = 0;
        var targetValue = 0;
        var minRaw;
        var maxRaw;
        var lsm = [];
        var min = moment(date, 'YYYY-MM-DD');
        var max = moment(date, 'YYYY-MM-DD');
        var minPeriod = moment(date, 'YYYY-MM-DD');
        var maxPeriod = moment(date, 'YYYY-MM-DD');
        var productionDayInMiliseconds;
        var shiftSpeed = 0;
        
        configuration = Object.keys(configuration).map(function(k) { return configuration[k] });
        configuration.sort(Utils.orderShifts);
        
        //Iterates over shifts
        outer: for (var index in configuration) {
            targetValue = configuration[index].ShiftTarget;
            lsm = configuration[index].ListOfShiftPeriod;

            minRaw = lsm[0].TimeFrom.split(":");
            maxRaw = lsm[lsm.length - 1].TimeTo.split(":");
            min.hours(minRaw[0]).minutes(minRaw[1]).second(0).millisecond(0);
            max.hours(maxRaw[0]).minutes(maxRaw[1]).second(0).millisecond(0);

            if (max.unix() <= min.unix()) {
                max.add(1, 'days');
            }
            //Validates if the actual date is between the curren shift.
            if (actual.unix() >= min.unix() && actual.unix() <= max.unix()) {
                //Iterates over production and breaks periods.
                for (var indexConfig in configuration[index].ListOfShiftPeriod) {
                    var period = configuration[index].ListOfShiftPeriod[indexConfig];
                    var minPeriodRaw = period.TimeFrom.split(":");
                    var maxPeriodRaw = period.TimeTo.split(":");
                    
                    shiftSpeed = (60000 / configuration[index].ListOfShiftPeriod[indexConfig].PlantPerformancesInAMinutes.plant);
                    minPeriod.hours(minPeriodRaw[0]).minutes(minPeriodRaw[1]).second(0).millisecond(0);
                    maxPeriod.hours(maxPeriodRaw[0]).minutes(maxPeriodRaw[1]).second(0).millisecond(0);
                    
                    if (maxPeriod.unix() <= minPeriod.unix()) {
                        maxPeriod.add(1, 'days');
                    }
                    
                    if (period.TypeName === "Production" && (actual.unix() >= minPeriod.unix() && actual.unix() <= maxPeriod.unix())) {
                        productionDayInMiliseconds = maxPeriod.diff(minPeriod);
                        totalTarget += Math.floor((actual.diff(minPeriod) * targetValue) / productionDayInMiliseconds);
                        break outer;
                    } else if(period.TypeName === "Production") {
                        productionDayInMiliseconds = maxPeriod.diff(minPeriod);
                        totalTarget += Math.floor(productionDayInMiliseconds / shiftSpeed);
                    } else if ((actual.unix() >= minPeriod.unix() && actual.unix() <= maxPeriod.unix())) {
                        break outer;
                    }
                }
            } else {
                //Add the target value of the shift, because it's over.
                totalTarget += targetValue;
            }
        }

        return totalTarget;
    };
    
    Utils.orderShifts = function(a, b) {
        if (a.ShiftPeriod < b.ShiftPeriod)
            return -1;
        if (a.ShiftPeriod > b.ShiftPeriod)
            return 1;
        return 0;
    };
    
    /**
     * Get the normal and the extraction status of an area.
     * @param {String} area
     * @param {String} property
     * @param {Boolean} addExtractionPoints
     * @returns {Array}
     */
    Utils.getHeaderStatus = function(area, property, addExtractionPoints) {
        var statusPointsArr = [];
        //Get the normal status points.
        var statusPoints = getStatusPoints(Config.Areas[area].segments, property);
        
        //Concatenate status points values to the general array.
        statusPointsArr = statusPointsArr.concat(statusPoints);
        
        if (addExtractionPoints) {
            //Get the extraction points.
            var extractionPoints = getStatusPoints(Config.Areas[area].extraction, property);

            //Concatenates extraction points values to the general array.
            statusPointsArr = statusPointsArr.concat(extractionPoints);
        }
        
        //Order the array in a ascendent order.
        statusPointsArr.sort(orderByStatus);
        
        //return the status of an area.
        return statusPointsArr;
    };
    
    /**
     * Callback function to order the array based on the status property.
     * @param {Object} a
     * @param {Object} b
     * @returns {Number}
     */
    function orderByStatus(a, b) {
        if (a.status < b.status)
            return -1;
        if (a.status > b.status)
            return 1;
        return 0;
    }
    
    /**
     * Get the elements that has the property passed as parameter.
     * @param {String} segments
     * @param {String} property
     * @returns {Array}
     */
    function getStatusPoints(segments, property) {
        var valuesArr = [];
        
        for (var index in segments) {
            //If the current segment has the propety passed as parameter add it to the new array of values.
            if (!Utils.isEmpty(segments[index][property])) {
                segments[index]["status"] = index;
                valuesArr.push(segments[index]);
            }
            
            valuesArr = valuesArr.concat(getObjectByProperty(segments[index], property));
        }
        
        return valuesArr;
    }
    
    function getObjectByProperty(values, property) {
        var valuesArr = [];
        for (var index in values) {
            if (!Utils.isEmpty(values[index][property])) {
                values[index]["status"] = index;
                valuesArr.push(values[index]);
            }
        }

        return valuesArr;
    }
    
    Utils.getProperty = function(area, section, status, property) {
        if (!Utils.isEmpty(Config.Areas[area])) {
            if (!Utils.isEmpty(status) && !Utils.isEmpty(section)) {
                if (!Utils.isEmpty(Config.Areas[area].segments[section][status]) && !Utils.isEmpty(Config.Areas[area].segments[section][status][property])) {
                    return Config.Areas[area].segments[section][status][property];
                } else {
                    return Utils.getProperty(area, section, '', property);
                }
            } else if (!Utils.isEmpty(section)) {
                if (!Utils.isEmpty(Config.Areas[area].segments[section][property])) {
                    return Config.Areas[area].segments[section][property];
                }
            } else if (!Utils.isEmpty(status)) {
                if (!Utils.isEmpty(Config.Areas[area].segments[status][property])) {
                    return Config.Areas[area].segments[status][property];
                }
            } else if (Utils.isEmpty(section) && Utils.isEmpty(status)) {
                if (!Utils.isEmpty(Config.Areas[area][property])) {
                    return Config.Areas[area][property];
                }
            } else {
                return 0;
            }
        }
    };
    
    Utils.openExtractionList = function(area, segment, status, type, history) {
        var link = area !== Config.Areas.Finish.tagName ? '/list/extractionMonitor' : '/list/specialMonitor';
                
        if (!Utils.isEmpty(area)) {
            link += '/' + ((area === 'Plant' && history === 'history') ? 'PlantHistory' : area);

            if (!Utils.isEmpty(type)) {
                link += '/' + type;
            }

            if (!Utils.isEmpty(segment)) {
                link += '/' + segment;

                if (!Utils.isEmpty(status)) {
                    link += '/' + status;
                }
            }
        }
        
        return link;
    };
    
    Utils.getCurrentPage = function(path) {
        var lastSlash = path.lastIndexOf('/');
        var segment = path.substring(lastSlash + 1, path.length);
        
        return segment;
    };
    
    /* 
     * Create an array with the concatenation of the prefix and a number.
     * @param {String} prefix
     * @param {int} numberTimes
     * @returns {Array}
     */
    Utils.getTTimes = function(prefix, numberTimes) {
        var times = [];
        
        for (var i = 0; i < numberTimes; i++) {
            times.push(prefix + i);
        }
        
        return times;
    };
    
    // Function used to scroll vertical and horizontal when there are fixed columns. 
    Utils.scroll = function(id) {
        //Scroll horizontal.
        $('#' + id + ' > .scroll').scroll(function() {
            $('#' + id + ' > .tabheader').scrollLeft($(this).scrollLeft());
        }); 
        
        //Scroll vertical.
        $("#" + id + " > .scroll").scroll(function(){
           $("#" + id + " > .tabcontentshort").scrollTop($(this).scrollTop());
        });
    };
    
    Utils.getCookies = function(key) {
        var cookies = [];
        var name = key;
        //Get the available cookies and split it by ;
        var ca = document.cookie.split(';');
        //Iterates over cookies
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            //Search for the cookie.
            while (c.charAt(0) === ' ')
                c = c.substring(1);
            if (c.indexOf(name) === 0) {
                var equalPosition = c.indexOf("=");
                c = c.substring(equalPosition + 1);
                cookies.push(c);
            }
        }
        return cookies;
    };
    
    //Calculate the number of cars to be produced.
    Utils.calculateTargetValue = function (actual, shift, date, endProductionHour) {
        var min = moment(date, 'YYYY-MM-DD');
        var max = moment(date, 'YYYY-MM-DD');
        
        var minRaw = shift.ListOfShiftPeriod[0].TimeFrom.split(":");
        var maxRaw = shift.ListOfShiftPeriod[shift.ListOfShiftPeriod.length - 1].TimeTo.split(":");
        
        min.hours(minRaw[0]).minutes(minRaw[1]).second(0).millisecond(0);
        max.hours(maxRaw[0]).minutes(maxRaw[1]).second(0).millisecond(0);

        if (max.isBefore(min) || max.isSame(min)) {
            max.add(1, 'days');
        }
        
        if (actual.unix() >= min.unix() && actual.unix() <= max.unix()) {
            //Get the break in milliseconds that has passed until the current time.
            var totalBreakTime = getBreak(actual, shift.ListOfShiftPeriod, date, endProductionHour);
            //Get the production time of the day.
            var totalProductionTime = getProductionTimes(shift.ListOfShiftPeriod, date, endProductionHour);
            //The time needed to build a car.
            var carPerMilliseconds = totalProductionTime / shift.ShiftTarget;
            //console.log("totalBreak", totalBreakTime, "ShiftTarget" , shift.ShiftTarget, "totalProductionTime", totalProductionTime, "carPerMilliseconds", carPerMilliseconds, "actual.diff(min)", actual.diff(min), "actual.diff(min)/carPerMilliseconds", Math.floor((actual.diff(min) - totalBreakTime) /carPerMilliseconds))
            return Math.floor((actual.diff(min) - totalBreakTime) /carPerMilliseconds);
        } else if (max.unix() <= actual.unix()) { //If the shift has ended.
            return shift.ShiftTarget;
        } else { //If the shift hasn't started.
            return 0;
        }
    };
    
    //Get the sum of the production times.
    function getProductionTimes(listOfShiftPeriod, date, productionEndHour) {
        var min = moment(date, 'YYYY-MM-DD');
        var max = moment(date, 'YYYY-MM-DD');
        var minRaw;
        var maxRaw;
        var totalBreakTime = 0;
        
        listOfShiftPeriod.sort(Utils.orderShifts);
        for (var index in listOfShiftPeriod) {
            min = moment(date, 'YYYY-MM-DD');
            max = moment(date, 'YYYY-MM-DD');
            
            minRaw = listOfShiftPeriod[index].TimeFrom.split(":");
            maxRaw = listOfShiftPeriod[index].TimeTo.split(":");
            
            min.hours(minRaw[0]).minutes(minRaw[1]).second(0).millisecond(0);
            max.hours(maxRaw[0]).minutes(maxRaw[1]).second(0).millisecond(0);
            
            if (min.hours() >= 0 && min.hours() < productionEndHour) {
                min.add(1, 'days');
            }
            
            if (max.isBefore(min) || max.isSame(min)) {
                max.add(1, 'days');
            } else if (max.hours() >= 0 && max.hours() < productionEndHour && min.isAfter(max)) {
                max.add(1, 'days');
            }
            
            if (listOfShiftPeriod[index].TypeName === "Production") {
                totalBreakTime += max.diff(min);
            }
        }
        
        return totalBreakTime;
    }
    
    //Get the break time until the current time.
    function getBreak(actual, listOfShiftPeriod, date, productionEndHour) {
        var min = moment(date, 'YYYY-MM-DD');
        var max = moment(date, 'YYYY-MM-DD');
        var minRaw;
        var maxRaw;
        var minBreak = moment(date, 'YYYY-MM-DD'); 
        var maxBreak = moment(date, 'YYYY-MM-DD'); 
        var minRawBreak;
        var maxRawBreak;
        var totalBreakTime = 0;
        var breakObj = {};
        
        listOfShiftPeriod.sort(Utils.orderShifts);

        for (var index in listOfShiftPeriod) {
            minRaw = listOfShiftPeriod[index].TimeFrom.split(":");
            maxRaw = listOfShiftPeriod[index].TimeTo.split(":");
            min.hours(minRaw[0]).minutes(minRaw[1]).second(0).millisecond(0);
            max.hours(maxRaw[0]).minutes(maxRaw[1]).second(0).millisecond(0);

            if (max.isBefore(min) || max.isSame(min)) {
                max.add(1, 'days');
            }
            
            if (min.hours() >= 0 && min.hours() < productionEndHour) {
                min.add(1, 'days');
            }

            //If actual hour is in a break time.
            if (listOfShiftPeriod[index].TypeName === "Break" && actual.unix() >= min.unix() && actual.unix() <= max.unix()) {
                breakObj = listOfShiftPeriod[index];
                minRawBreak = breakObj.TimeFrom.split(":");
                minBreak.hours(minRawBreak[0]).minutes(minRawBreak[1]).second(0).millisecond(0);
                if (minBreak.hours() >= 0 && minBreak.hours() <= productionEndHour) {
                    minBreak.add(1, 'days');
                }
                
                totalBreakTime += actual.diff(minBreak);
                
                break;
            } else if (listOfShiftPeriod[index].TypeName === "Break" && min.unix() <= actual.unix() && max.unix() <= actual.unix()) { //If actual is outside a break.
                breakObj = listOfShiftPeriod[index];
                minRawBreak = breakObj.TimeFrom.split(":");
                maxRawBreak = breakObj.TimeTo.split(":");
                minBreak.hours(minRawBreak[0]).minutes(minRawBreak[1]).second(0).millisecond(0);
                maxBreak.hours(maxRawBreak[0]).minutes(maxRawBreak[1]).second(0).millisecond(0);
                totalBreakTime += maxBreak.diff(minBreak);
            }
        }
        
        return totalBreakTime;
    }
    
    /**
     * Get the configuration objects from config_plant that has the property
     * passed as a parameter.
     * @param {String} property
     * @returns {Array}
     */
    Utils.getConfigByProperty = function(property) {
        var config = [];

        for (var index in Config.Areas) {
            if (!Utils.isEmpty(Config.Areas[index]) && !Utils.isEmpty(Config.Areas[index].tagName)) {
                if (!Utils.isEmpty(Utils.getProperty(Config.Areas[index].tagName, "", "", property))) {
                    config.push(Config.Areas[index]);
                }
            }
        }
        
        return config;
    };
    
    //Get the delayed orders according some criterias.
    Utils.getBacklogOrders = function(status, orders, PR, S9T, S0C) {
        var newOrders = [];
        //Get the current date.
        var today = moment();
        //Get the current week and decrease one week.
        var week = today.week() - 1;
        //Get the current week day.
        var day = today.weekday();
        //Create the knr prefix.
        var week_day = Number(week + "" + day);
            
        //Iterates over the orders
        for (var index in orders) {
            //Get the first 3 digits of the Orders
            var knr = Number(orders[index].Order.substring(0, 3));
            //Get the 3 digit of the Order.
            var _3digit = Number(("" + knr).substring(2, 3));
            //Get the SNR pr from the order.
            var pr_s9t_s0c = PR.GetAllPRByFamily("SNR", orders[index].PR);
            
            //If the order has a different status as the passed as parameter
            //and the knr is less than (the current week and day) - a week.
            //and the SNR value is different than S9T or S0C.
            if (orders[index].BodyStatus !== status && knr < week_day && _3digit !== 7 
                    && ((!Utils.isEmpty(pr_s9t_s0c) && pr_s9t_s0c.indexOf(S9T) < 0 && pr_s9t_s0c.indexOf(S0C) < 0) || Utils.isEmpty(pr_s9t_s0c))) {
                newOrders.push(orders[index]);
            }
        }
        
        return newOrders;
    };
    
    Utils.createCustomFilter = function(typeFilter) {
        var search = {};
        
        if (!Utils.isEmpty(typeFilter.custom)) {
            var pr = "";
            
            if (!Utils.isEmpty(typeFilter.pr)) {
                pr = typeFilter.pr + '*';
            }
            
            if (!Utils.isEmpty(typeFilter.steuerungnr)) {
                pr += typeFilter.steuerungnr + '*';
            }
            
            pr = pr.substring(0, pr.length - 1);
            search = {"pr": pr, knr: typeFilter.knr, pin: "", status: "", efs: typeFilter.efs, farbe: typeFilter.farbe, innenFarbe: typeFilter.innenfarbe, fu: typeFilter.fu}; 
        }
        
        return search;
    };
    
    /**
     * Takes the properties of the object and if they aren't empty, they are 
     * concatenated to the string.
     * @param {JSONObject} filter
     * @returns {String}
     */
    Utils.filterObjectToString = function(filter) {
        var properties = ["knr", "pr", "efs", "status", "fu", "type", "location"];
        var text = "";
        //Iterates over the properties of the filter object.
        for (var index in filter) {
            //If the property is not empty, then add it to the filter string.
            if (!Utils.isEmpty(filter[index]) && properties.indexOf(index) >= 0) {
                if (filter[index] instanceof String) {
                    text += index.toUpperCase() + ":" + filter[index].toUpperCase() + ", ";
                } else {
                    text += index.toUpperCase() + ":" + filter[index] + ", ";
                }
            }
        }
        
        //Remove the 2 last characters of the string.
        if (!Utils.isEmpty(text)) {
            text = text.substring(0, text.length - 2);
        }
        
        return text;
    };
    
    /**
     * Add a value in property of the object.
     * @param {JSONObject} filter
     * @param {String} property
     * @param {String} value
     * @returns {JSONObject}
     */
    Utils.addValueToProperty = function(filter, property, value) {
        var and = ",";
        
        //If the property is empty, then add the value.
        if (Utils.isEmpty(filter[property])) {
            filter[property] = value;
        } else {//If the property has a value, then concatenate the new value.
            //Get the current value.
            var currentValue = filter[property];
            
            if (currentValue.indexOf(value) < 0) {
                //Concatenates the current value with the new value.
                currentValue += and + value;
                //Add the new value to the property in the object.
                filter[property] = currentValue;
            }
        }
        
        return filter;
    };
    
    /**
     * Function to add the operation symbol in the input.
     * @param {String} input
     * @param {String} operation
     */
    Utils.addOperation = function(input, operation) {
        var cursorPosition = 0;
        var inputValue, before, after;
        after = '';
        //Get the position of the cursor in the input.
        cursorPosition = $('#' + input).prop("selectionStart");
        //Get the value of the input
        inputValue = $('#' + input).val();
        //Get a substring from 0 to the position of the cursor.
        before = inputValue.substring(0, cursorPosition);
        //Get a substring from the position of the cursor to the end of the string.
        after = inputValue.substring(cursorPosition, inputValue.length);
        
        //Create the new string and set it to the input
        $('#' + input).val(before + operation + after);
        $('#' + input).trigger('keypress');
    };
    
    /**
     * Function to decide which button will be enabled.
     * @param {String} id
     * @param {String} buttonPrefix
     * @returns {String}
     */
    Utils.enableButtons = function(id, buttonPrefix) {
        //Disable al the buttons
        $('[id*=' + buttonPrefix + ']').attr('disabled', true);
        
        //Validates if the id is part of the default properties.
        if (id.indexOf('pr') >= 0 || id.indexOf('knr') >= 0 || id.indexOf('efs') >= 0 ||
                id.indexOf('farbe') >= 0 || id.indexOf("innenfarbe") >= 0 || 
                id.indexOf("fu") >= 0 || id.indexOf("steuerungnr") >= 0) {
            //If the id is the pr, enable all the buttons.
            if (id.indexOf('pr') >= 0) {
                $('[id*=' + buttonPrefix + ']').attr('disabled', false);
            } else { //Otherwise disable the not button.
                $('[id*=' + buttonPrefix + ']:not(#' + buttonPrefix + 'not)').attr('disabled', false);
            }
        }

        return id;
    };
    
    Utils.getCountersCirculation = function($rootScope, $dataService, CarInfoFactory, shift, generalStatus, changeLevel, areasName) {
        Utils.getCounters($rootScope, $dataService, CarInfoFactory, shift, generalStatus);
        Utils.getCirculation($rootScope, $dataService, CarInfoFactory, changeLevel, areasName);
    };
        
    Utils.getCounters = function($rootScope, $dataService, CarInfoFactory, shift, generalStatus) {
        //Bottom counter
        if ($rootScope.TypeFilter.showBottom) {
            if (Utils.isEmpty($rootScope.TypeFilter.custom)) {
                $dataService.countersProduction($rootScope.TypeFilter.value, shift, generalStatus).then(function (result) {
                    $rootScope.standardCounter = result;
                    $rootScope.$broadcast('bottomCounters');
                }); 
            } else {
                var search = Utils.createCustomFilter($rootScope.TypeFilter);
                var searchObj = Utils.clone(search);
                var filter = CarInfoFactory.createSearchFilter('', '', '', '', '', '', searchObj);

                $dataService.getProductionCounter(generalStatus, filter).then(function (result) {
                    $rootScope.standardCounter = result;
                    $rootScope.$broadcast('bottomCounters');
                });
            }
        } else {
            $rootScope.$broadcast('bottomCounters');
        }
    };

    Utils.getCirculation = function ($rootScope, $dataService, CarInfoFactory, changeLevel, areasName) {
        if (Utils.isEmpty($rootScope.TypeFilter.custom) || (!Utils.isEmpty($rootScope.TypeFilter.custom) && !$rootScope.TypeFilter.changeLevel)) {
            //Filling level of the conveyor
            $dataService.GetCirculationCounter(changeLevel, areasName).then(function (result) {
                $rootScope.Circulation = result;            
                $rootScope.$broadcast('circulationCounters');
                $rootScope.$broadcast('countersMeterTexted');
            });
        } else {
            if ($rootScope.TypeFilter.changeLevel) {
                $rootScope.Circulation = {};
                var search = Utils.createCustomFilter($rootScope.TypeFilter);
                var searchObj = Utils.clone(search);
                //$rootScope.searchString = $scope.filter;

                for (var index in areasName) {
                    var filter = CarInfoFactory.createSearchFilter(areasName[index], '', '', '', '', '', searchObj);
                    getCountersFiltered(areasName[index], filter, areasName.length, $rootScope, $dataService);
                }
            }
        }
    };
        
    function getCountersFiltered(area, filter, areasLength, $rootScope, $dataService) {
        $dataService.getCountersFilter(filter).then(function(result) {
            var counter = 0;
            for (var index in result) {
                counter += result[index];
            }
            $rootScope.Circulation[area] = counter;
            if (Object.keys($rootScope.Circulation).length >= areasLength) {
                $rootScope.$broadcast('circulationCounters');
            }
        });
    }
    