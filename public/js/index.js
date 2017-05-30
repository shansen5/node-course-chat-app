$.ajax({
    url: document.URL + "get_rooms",
    type: "GET",
    dataType: "json",
    success: function ( responseJson ) {
        $.each( responseJson, function ( i, room ) {
            jQuery( '[name=room_select]').append(new Option( room, room, true, true));
        });
    },
    error: function( xhr, status ) {
        console.log( 'There was a problem', status );
    },
    complete: function( xhr, status ) {
        console.log( "The request for rooms is complete" );
    }
})

// $.get( '/get_rooms', ( responseJson ) => {
//     $.each( responseJson, function ( i, room ) {
//         jQuery( '[name=room_select]').append(new Option( room, room, true, true));
//     });
// });

jQuery( "#add-form").on( "submit", function( e ) {
    e.preventDefault();
    var newRoomTextbox = jQuery( '[name=room]' ); 
    jQuery( '[name=room_select]').append(new Option( newRoomTextbox.val(), newRoomTextbox.val(), true, true));
});