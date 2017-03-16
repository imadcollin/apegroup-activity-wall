class AppComponent {

    get is() {
        return `app-component`
    }

    get behaviors() {
        return [
            window.Behaviors.Loader
        ]
    }

    get properties() {
        return {
            /* A static configuration object, for convenience */
            config: {
                type: Object,
                readOnly: true,
                value: {
                    requestTimeoutMs: 10000,
                    paths: {
                        walls: `wall`
                    },
                    wallTypes: {
                        //Set the first wall as defual route
                        wallUnavailable: `wall/4`,
                        //The Main teams and walls route is pick
                        //wallUnavailable: `pick`,
                        organization: `org`,
                        team: `team`
                    },
                    /*New database set as working DB */
                    //Google Provider not used, Email and Password
                    firebase: {
                        name: `activitywall`,
                        apiKey: `AIzaSyBhpYBQ5GpFHaxx6r3RrZcEqvrMCvaEykM`,
                        authDomain: `my-project-1478708218814.firebaseapp.com`,
                        databaseUrl: `https://my-project-1478708218814.firebaseio.com`,
                        authProvider: `google`,
                        auth: {
                            provider: `google`,
                            email: `imad.collin@apegroup.com`,
                            password: `123456`
                        },
                        paths: {
                            walls: `/walls`,
                            employees: `/employees`,
                            availabilities: `/availabilities`,
                            locations: `/locations`,
                            calendarEvents: `/calendar/events`,
                            slack: `/slack`
                        }
                    }
                }
            },

            loadingStatus: {
                type: String,
                value: ``
            },

            selectedWallId: {
                type: Number,
                computed: `_selectedWallIdComputed(routeData.pathSection, subrouteData.pathSection)`
            },

            selectedWall: {
                type: Object,
                observer: `_selectedWallChanged`
            },

            employeesOnSelectedWall: {
                type: Array,
                computed: `_employeesOnSelectedWallComputed(employees, selectedWall.members)`,
                observer: `_employeesOnSelectedWallChanged`
            },

            descriptionOfSelectedWall: {
                type: String,
                value: null
            }
        }
    }

    get observers() {
        return [
            `_onRouteDataChanged(routeData.pathSection)`,
            `_onForegroundColorChanged(selectedWall.foreground_color)`,
            `_onBackgroundGradientChanged(selectedWall.background_gradient)`
        ];
    }

    get listeners() {
        return {
            'set-route': `onSetRoute`
        };
    }

    /**
     * ======================================================================
     * Component Lifecycle
     * ======================================================================
     */

    attached() {
        this.async(() => {
            if (!this._isWallPath(this.routeData.pathSection, this.subrouteData.pathSection)) {
                this.set(`route.path`, `${this.config.wallTypes.wallUnavailable}`);
                this.loadingStatus = `loaded`;
            }
        });

        this.$.jsFirebaseAuth.signInWithEmailAndPassword(
            this.config.firebase.auth.email,
            this.config.firebase.auth.password)
            .then((response) => {
                console.debug('jsFirebaseAuth.signInWithEmailAndPassword() => response', response);
            })
            .catch((error) => {
                console.debug('error', error);
            });
    }

    /**
     * =================================================================
     * Public Method Declarations
     * =================================================================
     */

    getSelectedWallFirebasePath(selectedWallId) {
        const wallFirebasePath = `${this.config.firebase.paths.walls}/${selectedWallId}`;
        return wallFirebasePath;
    }

    handleFirebaseAuthError(e) {
        console.debug('handleFirebaseAuthError() -> e', e);
    }

    onSetRoute(event) {
        console.debug(`onSetRoute -> event`, event);
        this.set(`route.path`, event.detail.route);
        this.set(`subroute.path`, event.detail.subRoute);
    }

    /**
     * =================================================================
     * Private Method Declarations
     * =================================================================
     */

    _selectedWallIdComputed(routerPathSectionOne, routerPathSectionTwo) {
        if (this._isWallPath(routerPathSectionOne, routerPathSectionTwo)) {

            return routerPathSectionTwo;
        }
        return undefined;
    }

    _selectedWallChanged(newSelectedWall) {
        if (this.routeData && this.routeData.pathSection == this.config.paths.walls) { // Why can this even be false? 😖
            if (newSelectedWall && newSelectedWall.type) {
                this.cancelDebouncer(`wallDoesNotExist`);

                /* Activate wall specific CSS */
                if (this.config.wallTypes.team === newSelectedWall.type) {
                    document.documentElement.setAttribute('wall-type', 'team');

                } else if (this.config.wallTypes.organization === newSelectedWall.type) {
                    document.documentElement.setAttribute('wall-type', 'org');
                }

                /* Make members array never undefined, to prevent infinite loader on empty boards */
                if (!newSelectedWall.members) {
                    newSelectedWall.members = [];
                }

            } else {
                this.debounce(`wallDoesNotExist`, () => {
                    this.set(`route.path`, `${this.config.wallTypes.wallUnavailable}`);
                    this.loadingStatus = `loaded`;
                    alert('Timed out! \nThe wall could not be found.');
                }, this.config.requestTimeoutMs);
            }
        }
    }

    _onForegroundColorChanged(foregroundColor) {
        if (foregroundColor) {
            this.customStyle[`--foreground-color`] = `#${foregroundColor}`;
            this.updateStyles();
        }
    }

    _onBackgroundGradientChanged(backgroundGradient) {
        if (backgroundGradient) {
            if (!backgroundGradient.animate) {
                this.customStyle[`--background-size`] = `100% 100%`;
                this.customStyle[`--animation--background-gradient`] = `none`;
            }

            const direction = backgroundGradient.direction_degrees;

            /* Convert object to an array */
            let colorsArray = [];
            for (let key in backgroundGradient.colors) {
                colorsArray.push(backgroundGradient.colors[key]);
            }

            /* If there is only one color, dont bother making a gradient */
            if (colorsArray.length === 1) {
                this.customStyle[`--background`] = `#${colorsArray[0].value_hex}`;
                this.updateStyles();

            } else {
                /* Sort the gradient colors so the css string can be constructed correctly */
                const sortedColors = colorsArray.sort((a, b) => {
                    if (a.position_percent < b.position_percent)
                        return -1;
                    if (a.position_percent > b.position_percent)
                        return 1;
                    return 0;
                });

                /* Then construct the css string */
                let gradientCss = `linear-gradient(${direction}deg`;
                sortedColors.map((color) => {
                    gradientCss += `, #${color.value_hex} ${color.position_percent}%`;
                });
                gradientCss += `);`;

                this.customStyle[`--background`] = gradientCss;

                this.updateStyles();
            }
        }
    }

    _onRouteDataChanged(routePath) {
        if (routePath === this.config.wallTypes.wallUnavailable) {
            this.cancelDebouncer(`wallDoesNotExist`);
        }
    }

    _employeesOnSelectedWallComputed(employees, selectedWallMembers) {
        let members = [];

        let idx = 0;
        for (let memberId in selectedWallMembers) {
            let member = employees[memberId];
            if (member) {
                member.$key = memberId;
                members.push(member);

                idx++;
            }
        }

        return members;
    }

    _employeesOnSelectedWallChanged(newEmployeesOnSelectedWall) {
        this.loadingStatus = `loaded`;
    }

    _isWallPath(routerPathSectionOne, routerPathSectionTwo) {
        return routerPathSectionOne === this.config.paths.walls && routerPathSectionTwo && parseInt(routerPathSectionTwo);
    }
}

Polymer(AppComponent);