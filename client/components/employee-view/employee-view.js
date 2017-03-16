class EmployeeView {

    get behaviors() {
        return [window.Behaviors.Utilities];
    }

    beforeRegister() {
        this.is = `employee-view`;
        this.properties = {
            avatarUrl: {
                type: String,
                value: `assets/media/fallback-avatar.png`
            },
            locationLitteral: String,
            availabilityLitteral: String,
            availabilityEmoji: String,
            availabilityHasShadow: {
                type: Boolean,
                value: true
            },
            availabilityBgColorHex: {
                type: String,
                value: `#0f0`
            },
            availabilityTextColorHex: {
                type: String,
                value: `#000`
            },
            meetingHeading: {
                type: String,
                value: `no meetings today`,
                computed: `_computeMeetingHeading(employee.next_meeting.ongoing, employee.next_meeting.text)`
            },
            meetingTime: String,
            expanded: {
                type: Boolean,
                reflectToAttribute: true
            },
            offTheGrid: {
                type: Boolean,
                reflectToAttribute: true
            },
            showDot: {
                type:Boolean,
                value:true
            }
        };
    }

    get observers() {
        return [
            `_avatarUrlChanged(employee.avatar_url)`,
            `_availabilityChanged(employee.availability.availability_id, availabilities)`,
            `_availabilityAppearanceChanged(availabilityHasShadow, availabilityBgColorHex, availabilityTextColorHex)`,
            `_locationChanged(employee.location.location_id, locations)`
        ];
    }

    attached () {
        /* This is done to circumvent a bug that prevents font sizes set
        in rem from scaling down beyond a fixed size */
        this.Util_convertRemVariableToPixels(`--font-size--xsmall`);
        this.Util_convertRemVariableToPixels(`--font-size--xxsmall`);

        this.updateStyles();
    }

    /**---------------------
    * Observer methods
    ---------------------*/

    _avatarUrlChanged(avatarUrl) {
        if(avatarUrl && avatarUrl !== ``) {
            this.avatarUrl = avatarUrl;
        } else {
            this.avatarUrl = `assets/media/fallback-avatar.png`;
        }
    }

    _locationChanged(locationId, locations) {
        this.locationLitteral = this._isOffTheGrid() ? `` : locations[locationId];
    }

    _availabilityChanged(availabilityId, availabilities) {
        if(this._isOffTheGrid()) {
            this.offTheGrid = true;
        } else {
            this.offTheGrid = false;
        }
        this.availabilityLitteral = this._getAvailabilityLitteral(availabilityId, availabilities);
        this.availabilityEmoji = availabilities[availabilityId].utf8_emoji_char;
        this.availabilityHasShadow = availabilities[availabilityId].has_shadow || false;
        this.availabilityBgColorHex = `#${availabilities[availabilityId].hex_color}`;
        this.availabilityTextColorHex = `#${availabilities[availabilityId].text_color}`;
    }

    _availabilityAppearanceChanged(availabilityHasShadow, bgColorHex, textColorHex) {
        if(availabilityHasShadow) {
            this.customStyle[`--card-shadow`] = `var(--card-shadow--large)`;
        } else {
            if(this.expanded) {
                this.customStyle[`--card-shadow`] = `var(--card-shadow--small)`;
            } else {
                this.customStyle[`--card-shadow`] = `0`;
            }
        }
        this.customStyle[`--color--status`] = bgColorHex;
        this.customStyle[`--color--text-status`] = textColorHex;
        this.updateStyles();
    }

    _computeMeetingHeading(isMeetingOngoing, meetingText) {
        if(meetingText && meetingText.trim() !== ``) {
            if(isMeetingOngoing) {
                return `currently in meeting`;
            } else { /* Meeting is in future */
                return `next meeting between`;
            }
        } else {
            return `no meetings today`;
        }
    }

    /**---------------------
     * Helper methods
     ---------------------*/

     _isOffTheGrid() {
         if(this.employee && this.employee.availability) {
            return AVAILABILITY.isOffTheGrid(this.employee.availability.availability_id);
         } else {
             console.error(`_isOffTheGrid() -> Missing employee or employee availability`);
             return true;
         }
     }

    _getAvailabilityLitteral(availabilityId, availabilities) {
        const availabilityName = availabilities[availabilityId].name;
        if(this.employee && this.employee.location && this.employee.location.location_id && !this._isOffTheGrid()) {
            return ` and ${availabilityName}`;
        }
        return `${availabilityName}`;
    }
}

Polymer(EmployeeView);