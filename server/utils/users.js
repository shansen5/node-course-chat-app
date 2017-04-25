// addUser( id, name, room )
// removeUser( id )
// getUser( id )
// getUserList( room )

class Users {
    constructor () {
        this.users = [];
    }

    addUser( id, name, room ) {
        var user = { id, name, room };
        this.users.push( user );
        return user;
    }

    removeUser( id ) {
        var idx = this.users.map( (user) => user.id ).indexOf( id );
        return idx >= 0 ? this.users.splice( idx, 1 )[0] : undefined;
    }

    getUser( id ) {
        return this.users.filter( (user) => user.id === id )[0];
    }

    getUserList( room ) {
        var users = this.users.filter( (user) => {
            return user.room === room;
        });
        var namesArray = users.map( (user) => {
            return user.name;
        });
        return namesArray;
    }
}

module.exports = {Users};