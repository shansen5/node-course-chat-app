// addRoom( name )
// removeRoom( name )
// getRoomList()

class Rooms {
    constructor () {
        this.rooms = [];
    }

    addRoom( name ) {
        // If a room already exists with this name, return it.
        var idx = this.rooms.map( (room) => room.name ).indexOf( name );
        if ( idx >= 0 ) {
            return this.rooms[idx];
        }
        var room = { name };
        this.rooms.push( room );
        return room;
    }

    removeRoom( name ) {
        var idx = this.rooms.map( (room) => room.name ).indexOf( name );
        return idx >= 0 ? this.rooms.splice( idx, 1 )[0] : undefined;
    }

    getRoomList() {
        var namesArray = this.rooms.map( (room) => {
            return room.name;
        });
        return JSON.stringify( namesArray );
    }
}

module.exports = {Rooms};