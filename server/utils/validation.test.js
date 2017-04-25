const expect = require( 'expect' );

const {isRealString} = require( './validation' );

describe( 'isRealString', () => {
    it( 'should approve a real string', () => {
        var text = 'Here is a test string';
        var response = isRealString( text );
        expect( response ).toBe( true );
    });
    it( 'should trim leading and/or trailing spaces and return true', () => {
        var text1 = '  leading space';
        var text2 = 'trailing space     ';
        var text3 = '   space on both ends  ';
        var response = isRealString( text1 );
        expect( response ).toBe( true );
        response = isRealString( text2 );
        expect( response ).toBe( true );
        response = isRealString( text3 );
        expect( response ).toBe( true );
    });
    it( 'should return false for empty string', () => {
        var text1 = '';
        var text2 = '     ';
        var response = isRealString( text1 );
        expect( response ).toBe( false );
        response = isRealString( text2 );
        expect( response ).toBe( false );
    });
    it( 'should reject non-strings', () => {
        expect( isRealString( 254 ) ).toBe( false );
    });
});
