'use strict';

(function () {
  // Show list of temp users
  $.get('/temp-users', function(data) {
    // console.log(data);
    data.forEach((user, index) => {
      console.log(user);
      $('#temp-user-list').append(
        '<div class="well">' +
          '<p>' + user.local.email + '</p>' +
          '<p>' + user.local.usertype + '</p>' +
          
        '</div>'
      );
    });

    // $('body')
    //   .append( 'Name: ' + data.name ) // John
    //   .append( 'Time: ' + data.time ); //  2pm
  }, 'json' );

})();
