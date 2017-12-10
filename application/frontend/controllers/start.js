'use strict';

(function () {
  // get logged in client's user id
  // const id = $('#user-id')[0].innerHTML;

  // Show list of temp users
  $.get('/api/getallusers', function(data) {
    console.log(data);
    // loop through all ratings
    data.forEach((user, index) => {
      const userId = user._id;
      const accountName = user.local.email;
      const rating = user.local.avgRating;
      const accountStatus = user.local.accountStatus;
      const money = user.local.deposit;

      $('#public-info').append(
        '<div class="well" id="well-' + userId +'">' +
          '<p>accountName: ' + accountName + '</p>' +
          '<p>rating: ' + rating + '</p>' +
          '<p>accuntStatus: ' + accountStatus + '</p>' +
          '<p>money: ' + money + '</p>' +

        '</div>'
      );

    });
  }, 'json' );
})();

function handleSearchUserClick() {
  const email = $('#search-email').val();
  console.log(email);
  $.get('/api/search/email/' + email, function(data) {
    console.log(data);
    const userId = data._id;
    const accountName = data.local.email;
    const rating = data.local.avgRating;
    const accountStatus = data.local.accountStatus;
    const money = data.local.deposit;
    
    $('#searched-user').append(
      '<div class="well" id="well-' + userId +'">' +
        '<p>accountName: ' + accountName + '</p>' +
        '<p>rating: ' + rating + '</p>' +
        '<p>accuntStatus: ' + accountStatus + '</p>' +
        '<p>money: ' + money + '</p>' +

      '</div>'
    );
  });

}
