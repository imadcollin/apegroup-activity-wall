
`use strict`;

window.Behaviors = window.Behaviors || {};

window.Behaviors.Loader = {
    properties: {
        loadingStatus: {
            type: String,
            value: ``,
            observer: `_loadingStatusChanged`
        }
    },

    _loadingStatusChanged: function () {
        let lightDOMContainer = Polymer.dom(this);
        if (typeof this.loader === `undefined`) {
            this.loader = lightDOMContainer.querySelector(`x-loader`);
        }

        if (this.loadingStatus === `loaded`) {
            lightDOMContainer.removeChild(this.loader);
        } else {
            lightDOMContainer.appendChild(this.loader);
        }
    }
};

