const expect = require( 'expect' );

const {Users} = require( './users' );

describe( 'Users', () => {

    beforeEach( () => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        },
        users.users = {
            id: '2',
            name: 'Jen',
            room: 'React Course'
        },
         users.users = {
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        }];
    });
    it( 'should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Steve', 
            room: 'Family Chat'
        };
        var response = users.addUser( user.id, user.name, user.room );
        expect( users.users).toEqual([user]);
    });
    it( 'should remove a user', () => {
        var user = users.removeUser( '2' );
        expect( users.users.length ).toBe( 2 );
        expect( user.name ).toEqual( ['Jen'] );
    });
    it( 'should not remove a user', () => {
        expect( users.removeUser( '17' )).toNotExist();
        expect( users.users.length ).toBe( 3 );
    });
    it ( 'should find the user', () => {
        var user = users.getUser( '2' );
        expect( users.users.length ).toBe( 3 );
        expect( user.name ).toEqual( ['Jen'] );
    });
    it( 'should not find a user', () => {
        expect( users.getUser( '17' ) ).toNotExist();
        expect( users.users.length ).toBe( 3 );
    });
    it ( 'should return names for the  courses', () => {
        var userList = users.getUserList( 'Node Course' );
        expect( userList ).toEqual( ['Mike', 'Julie'] );
        userList = users.getUserList( 'React Course' );
        expect( userList ).toEqual( ['Jen'] );
    });
})

