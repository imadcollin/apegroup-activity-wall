class MobileWall {

    get is() {
        return `mobile-view`;
    }
    get behaviors() {
        return [window.Behaviors.Wall];
    }
    ready() {
        console.log("ready");
        this.dotForAvaaliability = "green";
    }
    beforeRegister() {
        this.properties = {
            exit: {
                type: Boolean,
                value: false
            },
            showOverlay: {
                type: Boolean,

            },
            employeePhone: {
                type: Number,
                value: 0
            },
            employeeEmail: {
                type: String,
                value: `test`
            },
            employeeSlack: {
                type: String,
                value: `this message is from slack `
            },
            myColor: {
                type: String,
                value: function () {
                    //Should be this employee.Location when the API wordks as should
                    if (this.employeeEmail == "") {
                        return "red";
                    }
                    else {
                        console.log("employee", this.employee);
                        return "green";
                    }
                }
            }
        }
    }

    /**
     * Adding new method for changing the views easier with iron-pages :)
     */
    changeView() {
        console.log(`change the view to next `);

    }

    /**
     * This function will hide the parent view
     * The function will set the pop-up view size to normal in case of exit
     * The function don't allow bubbling for multi level trigger
     */
    hideContent(event) {
        console.log("here the all employees", this.employeesOutOfOffice);

        this.fire(`myevent`, this.showOverlay);
        this.showOverlay = true;
        console.log(this.showOverlay);
        event = event || window.event // cross-browser event
        if (event.stopPropagation) {
            event.stopPropagation()
        } else {
            event.cancelBubble = true
        }

        var focusedEmployee = document.getElementById("focused-employee");
        focusedEmployee.classList.remove("mobileFullScreen");
        focusedEmployee.classList.add("focusedEmployee");

        /*For flex direction*/
        mobileIcons.classList.remove("iconWithLargView");
        mobileIcons.classList.add("mobileIcons");


    }
    phoneCall(event) {
        event = event || window.event // cross-browser event
        if (event.stopPropagation) {
            event.stopPropagation()
        } else {
            event.cancelBubble = true
        }

        /*ToDo*/
        // 1- The phone no. should be declaerd for each employees "Firebase"
        if (this.employee === undefined || this.employee === `` || typeof this.employee == undefined) {
            this.employeePhone = `No Phone No.`;
        } else {
            //Where the employee phone number should be added to the Firebase
            //@Param phone: is the employee.phoneNumber
            this.employee.phone = "0730000";
            this.employeePhone = this.employee.phone;
            window.open("tel:" + this.employeePhone);
        }
        console.log("Calling ...");
    }
    mailTo(event) {
        event = event || window.event // cross-browser event
        if (event.stopPropagation) {
            event.stopPropagation()
        } else {
            event.cancelBubble = true
        }
        if (this.employee === undefined || this.employee === `` || typeof this.employee == undefined) {
            this.employeeEmail = `No Email `;
        } else {

            this.employeeEmail = this.employee.email;
            console.log("email", this.employeeEmail);
            window.open("mailto:" + this.employeeEmail, "_self");
            // location.href = "mailto:"+this.employeeEmail;
        }
        console.log("Mailing ...");
    }

    employeeSlack(event) {
        event = event || window.event // cross-browser event
        if (event.stopPropagation) {
            event.stopPropagation()
        } else {
            event.cancelBubble = true
        }
        window.open("slack:open", "_self")
        console.log("Slacking ...");
        console.log("location is :", this.locations);
    }
}
Polymer(MobileWall)