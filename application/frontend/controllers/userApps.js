'use strict';

(function () {
  // Show list of temp users
  $.get('/temp-users', function(data) {
    // console.log(data);
    data.forEach((user, index) => {
      // console.log(user);
      // console.log('<input type="button" id="' + 'qwer' +'" onclick="handleAcceptClick(this.id)" value="Accept" />');
      $('#temp-user-list').append(
        '<div class="well">' +
          '<p>' + user.local.email + '</p>' +
          '<p>' + user.local.usertype + '</p>' +
          '<input type="button" id="' + user._id + '" onclick="handleAcceptClick(this.id)" value="Accept" />' +
          '<input type="button" id="' + user._id + '" onclick="handleRejectClick(this.id)" value="Reject" />' +
        '</div>'
      );
    });
  }, 'json' );

})();

function handleAcceptClick(clicked_id) {
  alert('accept');
};

function handleRejectClick(clicked_id) {
  alert('reject');
};
