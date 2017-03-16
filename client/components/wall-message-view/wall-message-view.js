class WallMessageView {

    get behaviors() {
        return [];
    }

    beforeRegister() {
        this.is = `wall-message-view`;
        this.properties = {
            messagerAvatarUrl: {
                type: String,
                value: `assets/media/fallback-avatar.png`
            },
            messagerName: {
                type: String,
                value: `Glenn Strömming`
            },
            messageTimePosted: {
                type: String,
                value: `00:00`
            },
            messageText: {
                type: String,
                value: `Type something in Slack - General channel`
            },
            messageMaxLength: {
                type: Number,
                value: 300
            },
            wallHeading: {
                type: String
            }
        };
    }

    get observers() {
        return [
            /* Observe timestamp to resolve the data again when the message changes */
            `_resolveData(message.timestamp, message, slackIds, employees, wallHeading)`
        ];
    }

    created() {
        console.info(`Component created`);
    }

    attached() {
        console.info(`Component attached`);
    }

    detached() {
        console.info(`Component detached`);
    }

    _resolveData(timestamp, message, slackIds, employees, wallHeading) {
        let messagerId = slackIds[message.user_id];
        if (messagerId) {
            this.messagerName = `${employees[messagerId].firstname} ${employees[messagerId].lastname}`;
            this.messagerAvatarUrl = employees[messagerId].avatar_url;
            this.messageTimePosted = window.UtilStrings.getHoursAndMinutesFromEpocSeconds(timestamp);
            this.messageText = message.text;
        }
    }
}

Polymer(WallMessageView);