'use strict';

(function () {
  // Show list of temp users
  $.get('/temp-users', function(data) {
    console.log(data);
    // $("body")
    //   .append( "Name: " + data.name ) // John
    //   .append( "Time: " + data.time ); //  2pm
  }, "json" );

})();
