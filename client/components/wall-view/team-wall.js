class TeamWall {

    get behaviors() {
        return [window.Behaviors.Wall];
    }

    beforeRegister() {
        this.is = `team-wall`;
        this.properties = {};
    }
}

Polymer(TeamWall);