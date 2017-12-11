'use strict';

(function () {
  // get logged in client's user id
  const id = $('#user-id')[0].innerHTML;

  // Show list of temp users
  $.get('/api/quit-req-users', function(data) {
    // loop through all users with quit reqs
    data.forEach((user, index) => {
      const userId = user._id;
      const email = user.local.email;
      const realname = user.local.realname;
      const usertype = user.local.usertype;

      // append demand well to demands-list
      $('#quits-list').append(
        '<div class="well" id="well-' + userId +'">' +
          '<p>userId: ' + userId + '</p>' +
          '<p>email: ' + email + '</p>' +
          '<p>realname: ' + realname + '</p>' +
          '<p>usertype: ' + usertype + '</p>' +
          '<input type="button" onclick="handleApproveQuitDemandClick(\'' + userId + '\')" value="Approve Quit Demand" />' +
        '</div>'
      );
    });
  }, 'json' );
})();

function handleApproveQuitDemandClick(userId) {
  console.log(userId);
  $.get('/api/approve-quit-demand/' + userId, function(data) {
    console.log(data);
    $('#well-' + userId).hide();

  });

}
