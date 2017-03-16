
`use strict`;

window.Behaviors = window.Behaviors || {};

window.Behaviors.Utilities = {
    properties: {
        /* Inlined object properties are static in Polymer (shared between instances) */
        static: {
            type: Object,
            value: {
                rootFontSize: undefined
            }
        }
    },

    /**
     * Convert a variables rem value to pixels.
     * Use in case rem doesnt work, for example on very small font sizes.
     * NOTE: Remember to call this.updateStyles() after.
     */
    Util_convertRemVariableToPixels: function(variableName) {
        if(this.static[`pxConverted_${variableName}`]) {
            this.customStyle[variableName] = `${this.static[`pxConverted_${variableName}`]}px`;
        } else {
            /* This seems like an expensive operation, so only do it once */
            if(!this.static.rootFontSize) {
                this.static.rootFontSize = window.getComputedStyle(document.documentElement).fontSize.slice(0, -2);
            }
            // console.log(`rootFontSize`, rootFontSize);
            let variableRemFontSize = this.getComputedStyleValue(variableName).slice(0, -3);
            // console.log(`remFontSize`, remFontSize);
            let variablePxFontSize = this.static.rootFontSize * variableRemFontSize;
            this.customStyle[variableName] = `${variablePxFontSize}px`;
            this.static[`pxConverted_${variableName}`] = variablePxFontSize;
        }
    }
};

