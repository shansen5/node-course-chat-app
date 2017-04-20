const path = require( 'path' );
const http = require( 'http' );
const express = require( 'express' );
const socketIO = require( 'socket.io' );

const publicPath = path.join( __dirname, '../public' );
const port = process.env.PORT || 3000;

console.log(__dirname + '/../public' );
console.log( publicPath );

var app = express();
var server = http.createServer( app );
var io = socketIO( server );

io.on( 'connection', ( socket ) => {
    console.log( 'New user connected' );
    socket.emit( 'newMessage', {
        from: 'karen',
        text: 'I love you',
        createdAt: 123
    });
    socket.on( 'createMessage', ( newMessage ) => {
        console.log( 'createMessage', newMessage );
    });
    socket.on( 'disconnect', () => {
       console.log( 'User disconnected' );
    });
});

app.use( express.static( publicPath ));

server.listen( port, () => {
    console.log( `Chat server is up at port ${port}` );
});