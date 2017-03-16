window.Behaviors = window.Behaviors || {};

window.Behaviors.Wall = {
    properties: {
        employees: {
            type: Array,
            observer: `_employeesChanged`
        },
        employeesAtOffice: {
            type: Array,
            observer: `_employeesAtOfficeChanged`
        },
        employeesOutOfOffice: {
            type: Array,
            observer: `_employeesOutOfOfficeChanged`
        },
        employeesOnLeave: {
            type: Array,
            observer: `_employeesOnLeaveChanged`
        }
    },

    created: function() {
        console.info(`Component created`);
    },

    attached: function() {
        console.info(`Component attached`);
    },

    detached: function() {
        console.info(`Component detached`);
    },

    _employeesChanged: function(newEmployees) {
        let employeesAtOffice = [];
        let employeesOutOfOffice = [];
        let employeesOnLeave = [];
        //Array with all employees
        let allEmployees=[];

        newEmployees.map((employee) => {
            if(employee.location !== null && employee.location !== undefined && employee.location.location_id !== null && employee.location.location_id !== undefined) {
                if(1 === parseInt(employee.location.location_id)) {
                    employeesAtOffice.push(employee);

                } else if(AVAILABILITY.isOnLeave(employee.availability.availability_id)) {
                    employeesOnLeave.push(employee);

                } else {
                    employeesOutOfOffice.push(employee);
                }
            } else {
                console.warn(`Warning! the following employee was excluded, because it has no location field:`, employee);
            }
        });
        /**
         * All employees should be in one array
         * Sort one array
         */
        this.employeesAtOffice = employeesAtOffice.sort();
        this.employeesOutOfOffice = employeesOutOfOffice.sort();
        this.employeesOnLeave = employeesOnLeave.sort();
        //All in one fast solution :)
        this.allEmployees=employeesAtOffice.concat(employeesOutOfOffice).concat(employeesOnLeave);
    },

    _employeesAtOfficeChanged: function(newEmployeesAtOffice) {
        this.employeesAtOffice.sort(this._compareEmployeeNames);
    },

    _employeesOutOfOfficeChanged: function(newEmployeesOutOfOffice) {
        this.employeesOutOfOffice.sort(this._compareEmployeeNames);
    },

    _employeesOnLeaveChanged: function(newEmployeesOnLeave) {
        this.employeesOnLeave.sort(this._compareEmployeeNames);
    },

    /*
        Utility Functions
    */

    _compareEmployeeStatuses: function(a, b) {
        const argumentsOk = a && b && a.availability && b.availability;
        if(!argumentsOk) {
            return 0;
        }

        let aOrder = AVAILABILITY.getSortingPriorityOfId(a.availability.availability_id);
        let bOrder = AVAILABILITY.getSortingPriorityOfId(b.availability.availability_id);

        if(aOrder === bOrder) {
            return this._compareEmployeeNames(a, b);
        }
        return aOrder - bOrder;
    },

    _compareEmployeeLocationTimestamps: function(a, b) {
        const argumentsOk = a && b && a.location && b.location;
        if(!argumentsOk) {
            return 0;
        }

        return a.location.timestamp - b.location.timestamp;
    },

    _compareEmployeeNames: function(a, b) {
        let argumentsOk = a && b && a.firstname && b.firstname;
        if(!argumentsOk) {
            return 0;
        }

        if(a.firstname.toLowerCase() === b.firstname.toLowerCase()) {

            let argumentsOk = a.lastname && b.lastname;
            if(!argumentsOk) {
                return 0;
            }

            if(a.lastname.toLowerCase() === b.lastname.toLowerCase()) {
                return 0;
            } else if (a.lastname.toLowerCase() > b.lastname.toLowerCase()) {
                return 1;
            }

        } else if (a.firstname.toLowerCase() > b.firstname.toLowerCase()) {
            return 1;
        }
        return -1
    }
};