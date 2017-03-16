`use strict`;

window.AVAILABILITY = window.AVAILABILITY || {};

window.AVAILABILITY = {
    AVAILABLE: 1,
    UNKNOWN: 2,
    DND: 3,
    SICK: 4,
    PARENTAL_LEAVE: 5,
    VAB: 6,
    VACATION: 7,
    IN_MEETING: 8,
    IN_CALL: 9,
    LUNCH: 10,
    WORK_LEAVE: 11,

    isOffTheGrid: function(availabilityId) {
        return [this.SICK,
            this.PARENTAL_LEAVE,
            this.VAB,
            this.VACATION,
            this.WORK_LEAVE,
            this.LUNCH,
            this.UNKNOWN].indexOf(parseInt(availabilityId)) !== -1;
    },

    isOnLeave: function(availabilityId) {
        return [this.SICK,
            this.PARENTAL_LEAVE,
            this.VAB,
            this.VACATION,
            this.WORK_LEAVE].indexOf(parseInt(availabilityId)) !== -1;
    },

    isWorkingAndAvailable: function(availabilityId) {
        return [this.AVAILABLE].indexOf(parseInt(availabilityId)) !== -1;
    },
    
    isWorkingAndUnavailable: function(availabilityId) {
        return [this.DND,
            this.IN_MEETING,
            this.IN_CALL].indexOf(parseInt(availabilityId)) !== -1;
    },

    getSortingPriorityOfId: function(availabilityId) {

        /* [variable] keys are ES6 computed property names.
        see: http://www.ecma-international.org/ecma-262/6.0/#sec-object-initializer */
        return {
            [this.AVAILABLE]: 1,
            [this.DND]: 1,
            [this.IN_MEETING]: 1,
            [this.IN_CALL]: 1,
            [this.LUNCH]: 2,
            [this.UNKNOWN]: 3,
            [this.SICK]: 4,
            [this.VAB]: 5,
            [this.VACATION]: 6,
            [this.PARENTAL_LEAVE]: 7,
            [this.WORK_LEAVE]: 8
        }[availabilityId];
    }
};