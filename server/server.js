const path = require( 'path' );
const http = require( 'http' );
const express = require( 'express' );
const socketIO = require( 'socket.io' );

const publicPath = path.join( __dirname, '../public' );
const port = process.env.PORT || 3000;

console.log(__dirname + '/../public' );
console.log( publicPath );

const {generateMessage, generateLocationMessage} = require( './utils/message' );
const {isRealString} = require( './utils/validation' );
const {Users} = require( './utils/users' );
const {Rooms} = require( './utils/rooms' );

var app = express();
var server = http.createServer( app );
var io = socketIO( server );
var users = new Users();
var rooms = new Rooms();

io.on( 'connection', ( socket ) => {
    console.log( 'New user connected' );
    socket.on( 'getRooms', ( params, callback ) => {

    });
    socket.on( 'join', ( params, callback ) => {
        if ( !isRealString( params.name) || !isRealString( params.room_select )) {
            return callback( 'Name and room name are required' );
        }
        socket.join( params.room_select );
        users.removeUser( socket.id );
        users.addUser( socket.id, params.name, params.room_select );
        rooms.addRoom( params.room_select );

        io.to( params.room_select ).emit( 'updateUserList', users.getUserList( params.room_select ));

        // socket.emit sends to one user
        socket.emit( 'newMessage', generateMessage(
            'Admin', 'Welcome to the chat app' ));
        // socket.broadcast.emit sends to all but current user
        socket.broadcast.to( params.room_select).emit( 'newMessage', generateMessage(
        'Admin', `${params.name} joined the chat app` ));
        callback();
    });
    socket.on( 'createMessage', ( message, callback ) => {
        var user = users.getUser( socket.id );
        if ( user && isRealString( message.text )) {
            // io.emit sends to all connected
            io.to( user.room ).emit( 'newMessage', generateMessage(
                user.name, message.text ));
        }
        if ( callback !== undefined ) {
            callback();
        }
    });
    socket.on( 'createLocationMessage', ( coords ) => {
        var user = users.getUser( socket.id );
        if ( user ) {
            io.to( user.room ).emit( 'newLocationMessage', 
                generateLocationMessage( user.name,
                    coords.latitude, coords.longitude ));
        }
    });
    socket.on( 'disconnect', () => {
        var user = users.removeUser( socket.id );
        if( user ) {
            io.to( user.room ).emit( 'updateUserList', users.getUserList( user.room ));
            io.to( user.room ).emit( 'newMessage', generateMessage( 'Admin',
            `${user.name} has left the room.` ));
        }
        console.log( 'User disconnected' );
    });
});

app.use( express.static( publicPath ));

app.get( '/get_rooms', ( request, response ) => {
   response.send( rooms.getRoomList() );
});

server.listen( port, () => {
    console.log( `Chat server is up at port ${port}` );
});