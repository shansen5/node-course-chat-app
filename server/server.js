const path = require( 'path' );
const http = require( 'http' );
const express = require( 'express' );
const socketIO = require( 'socket.io' );

const publicPath = path.join( __dirname, '../public' );
const port = process.env.PORT || 3000;

console.log(__dirname + '/../public' );
console.log( publicPath );

const {generateMessage, generateLocationMessage} = require( './utils/message' );
var app = express();
var server = http.createServer( app );
var io = socketIO( server );

io.on( 'connection', ( socket ) => {
    console.log( 'New user connected' );
    socket.emit( 'newMessage', generateMessage(
        'Admin', 'Welcome to the chat app' ));
    socket.broadcast.emit( 'newMessage', generateMessage(
        'Admin', 'A new user joined the chat app' ));
    socket.on( 'createMessage', ( message, callback ) => {
        console.log( 'createMessage', message );
        io.emit( 'newMessage', generateMessage(
            message.from, message.text ));
        if ( callback !== undefined ) {
            callback();
        }
    });
    socket.on( 'createLocationMessage', ( coords ) => {
        io.emit( 'newLocationMessage', 
            generateLocationMessage( 'Admin', 
                coords.latitude, coords.longitude ));
    });
    socket.on( 'disconnect', () => {
       console.log( 'User disconnected' );
    });
});

app.use( express.static( publicPath ));

server.listen( port, () => {
    console.log( `Chat server is up at port ${port}` );
});