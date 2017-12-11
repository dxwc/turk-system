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

function handleBidAcceptClick(paramsStr) {
  // params is in string format so format it with .split to create an array with the parameters
  const paramsArr = paramsStr.split(',');
  const isLowestBid = paramsArr[0];
  const bidId = paramsArr[1];
  const demandId = paramsArr[2];

  // if the bid is not the lowest bid, show the div that asks for justification
  if (isLowestBid === 'false') {
    $('#justification-div-' + bidId).show();
  } else {
    // api call to accept bid
    $.post('/accept-bid', { 'demandId': demandId, 'bidId': bidId }, function(data) {
      // $('#well-' + id).hide();
      console.log("###");
      console.log(data);
      if (data === 'No money') {
        alert('You dont have enough money in your account');
      } else {
        alert('Bid sucessfully accepted');
      }
    });

  }
}
