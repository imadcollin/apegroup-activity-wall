class OrgWall {

    get behaviors() {
        return [window.Behaviors.Wall];
    }

    beforeRegister() {
        this.is = `org-wall`;
        this.properties = {
            shOwerlay: {
                type: Boolean,
                value: false
            },
            hideParent: {
                type: Boolean,
                value: false
            },
            names: {
                type: String,
                value: `test`,
                // observer: `_trackChangesOnEmployees`

            },
            Employees: {
                type: String,
                value: []

            },
            filterText: {
                value: '',
                observer: 'refreshFilter'
            }

        };
        this.listeners = {
            'myevent': '_changeBoolean'
        }

    }

    filterRoom(item) {
        return (this.filterText && item.name.match(new RegExp(this.filterText, 'i')));
    }

    refreshFilter() {
        this.$.resultList.render();
    }
    onTapEmployeeView(event) {
        console.log(`onTapEmployeeView(event) -> event.model.item`, event.model.employee);
        let employeeTapped = event.model.employee;

        this.focusedEmployee = employeeTapped;

        this.shOwerlay = true;
    }

    navigateToSearchView() {
        console.log(`Should open search view `);
        this.hideParent = true;


    }
    //Search and filter
    search(event, detail, sender) {

        var arr = [];
        console.log(this.employeesOutOfOffice);
        var name = this.employeesOutOfOffice.map(function (x) {
            var obj = {
                name: x.firstname + " " + x.lastname,
                image: x.avatar_url
            };
            arr.push(obj);

        });
        this.Employees = arr;
        console.log("...................");

        var search = document.getElementById("inputField");
        var filter = search.value.toUpperCase();
        console.log("input is :", filter);

    }

    //Bck to the Parent view
    back() {
        this.hideParent = false;
    }


    //On-tap the small view for moblie shall become 100*100
    changeWidth(event) {
        console.log(`width changer works`);
        var focusedEmployee = document.getElementById("focused-employee");
        //Set the mobile view size to 100*100
        focusedEmployee.classList.add("mobileFullScreen");
        var mobileIcons = document.getElementById("mobileIcons");
        mobileIcons.classList.add("iconWithLargView");

    }

    showSearchedEmployee(event) {
        let searchedEmployee = event.model.employee;

        let createdEmployee = {};/*createdEmployee: is the object for the pressed name from search */

        for (var i = 0; i < this.employeesOutOfOffice.length; i++) {
            console.log("test:", searchedEmployee.name);
            if (this.employeesOutOfOffice[i].firstname + " " + this.employeesOutOfOffice[i].lastname
                == searchedEmployee.name) {
                createdEmployee = this.employeesOutOfOffice[i];
                this.focusedEmployee = createdEmployee;

                this.shOwerlay = true;
                this.hideParent = false;

                console.log("createdEmployee", createdEmployee);
            }
        }
    }

    //Apply the boolean change at the time exit button clicked
    _changeBoolean() {
        console.log(`overlay[hide] is `, this.shOwerlay);
        this.shOwerlay = !this.shOwerlay;

        console.log(`overlay[hide] after click is `, this.shOwerlay);
    }
    exists(obj) {
        if (obj) {
            return true;
        } else {
            return false;
        }
    }

}

Polymer(OrgWall);