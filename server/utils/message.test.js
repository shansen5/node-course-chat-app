const expect = require( 'expect' );

const {app} = require( '../server' );
const {generateMessage, generateLocationMessage} = require( './message' );

describe( 'generateMessage', () => {
    it( 'should generate correct message object', () => {
        var from = 'testUser';
        var text = 'A short test text message';

        var response = generateMessage( from, text );
        // expect( response.from ).toEqual( from );
        // expect( response.text ).toEqual( text );
        expect( response ).toInclude( {from, text} );
        expect( response.createdAt ).toBeA( 'number' );
    });
});

describe( 'generateLocationMessage', () => {
    it( 'should generate correct location object', () => {
        var from = 'testUser';
        var lat = 48.7;
        var lon = -122.5;
        var expectedUrl = 'https://www.google.com/maps?q=48.7,-122.5';

        var response = generateLocationMessage( from, lat, lon );
        expect( response ).toInclude( {from, url: expectedUrl} );
        expect( response.createdAt ).toBeA( 'number' );
    });
});