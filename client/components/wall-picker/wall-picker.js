class WallPicker {

    get behaviors() {
        return [];
    }

    beforeRegister() {
        this.is = `wall-picker`;
        this.properties = {
        };
    }

    getMemberCount(wall) {
        let memberCount = 0;
        if(wall.members) {
            for(let memberKey in wall.members) {
                memberCount++;
            }
        }
        return memberCount + ``;
    }

    goToWall(event) {
        console.debug(`goToWall -> event.currentTarget.wallId`, event.currentTarget.wallId);
        this.fire(`set-route`, { route : `wall`, subRoute : event.currentTarget.wallId });
    }

    toArrayAndKeysToIds(walls) {
        let wallsArr = [];
        for(let wallKey in walls) {
            let wall = walls[wallKey];
            wall.$id = wallKey;
            wallsArr.push(wall);
        }
        return wallsArr;
    }

}

Polymer(WallPicker);