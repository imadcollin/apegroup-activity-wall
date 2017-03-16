`use strict`;

class UtilStringsImpl {

    getHoursAndMinutesFromDateTime(timestamp) {
        let startDate = new Date();
        startDate.setTime(Date.parse(timestamp));
        let hours = this.guaranteeTwoNumbers(startDate.getHours());
        let minutes = this.guaranteeTwoNumbers(startDate.getMinutes());

        return `${hours}:${minutes}`;
    }

    getHoursAndMinutesFromEpocSeconds(timestamp) {
        let startDate = new Date(0);
        startDate.setUTCSeconds(timestamp);
        let hours = this.guaranteeTwoNumbers(startDate.getHours());
        let minutes = this.guaranteeTwoNumbers(startDate.getMinutes());

        return `${hours}:${minutes}`;
    }

    guaranteeTwoNumbers(integerString) {
        if(parseInt(integerString) < 10) {
            return `0` + integerString;
        }
        return integerString;
    }
}

window.UtilStrings = window.UtilStrings || new UtilStringsImpl();