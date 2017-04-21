const expect = require( 'expect' );

const {app} = require( '../server' );
const {generateMessage} = require( './message' );

describe( 'generateMessage', () => {
    it( 'should generate correct message object', () => {
        var from = 'testUser';
        var text = 'A short test text message';

        var response = generateMessage( from, text );
        // expect( response.from ).toEqual( from );
        // expect( response.text ).toEqual( text );
        expect( response ).toInclude( {from, text});
        expect( response.createdAt ).toBeA( 'number' );
    });
});