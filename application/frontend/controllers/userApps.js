'use strict';

(function () {
  // Show list of temp users
  $.get('/api/temp-users', function(data) {
    // console.log(data);
    data.forEach((user, index) => {
      // console.log(user);
      // console.log('<input type="button" id="' + 'qwer' +'" onclick="handleAcceptClick(this.id)" value="Accept" />');
      console.log('<input type="button" onclick="handleAcceptClick(' + user._id + ')" value="Accept" />' );
      $('#temp-user-list').append(
        '<div class="well" id="well-' + user._id +'">' +
          '<p>Real Name: ' + user.local.realname + '</p>' +
          '<p>Deposit: ' + user.local.deposit + '</p>' +
          '<p>Email: ' + user.local.email + '</p>' +
          '<p>User Type: ' + user.local.usertype + '</p>' +
          '<input type="button" onclick="handleAcceptClick(\'' + user._id + '\')" value="Accept" />' +
          '<input type="button" onclick="handleRejectClick(\'' + user._id + '\')" value="Reject" />' +
          '<div id="reject-div-' + user._id + '" style="display: none;">' +
            '<label>Reject reason: </label>' +
            '<input type="text" id="reject-message-' + user._id + '"/>' +
            '<input type="button" onclick="handleRejectOkayClick(\'' + user._id + '\')" value="Okay" />' +
            '<input type="button" onclick="handleRejectCancelClick(\'' + user._id + '\')" value="Cancel" />' +
          '</div>' +
        '</div>'
      );
    });
  }, 'json' );

})();

function handleAcceptClick(id) {
  alert('accept');
};

function handleRejectClick(id) {
  $('#reject-div-' + id).show();
};

function handleRejectOkayClick(id) {
  const rejectReason = $('#reject-message-' + id).val();
  console.log(rejectReason);
  // Post to /reject-user
  $.post('/reject-user', { 'id': id, 'rejectReason': rejectReason }, function(data) {
    $('#well-' + id).hide();
    alert('User sucessfully rejected');
  });
}

function handleRejectCancelClick(id) {
  $('#reject-div-' + id).hide();
}
