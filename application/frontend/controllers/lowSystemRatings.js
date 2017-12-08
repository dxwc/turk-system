'use strict';

(function () {
  // get logged in client's user id
  const id = $('#user-id')[0].innerHTML;

  // Show list of temp users
  $.get('/api/low-ratings', function(data) {
    console.log(data);
    // loop through all ratings
    data.forEach((rating, index) => {
      const ratingId = rating._id;
      const demandId = rating.postId;
      const ratingVal = rating.rating;
      const ratingText = rating.ratingText;

      $('#ratings-list').append(
        '<div class="well" id="well-' + demandId +'">' +
          '<p>ratingId: ' + ratingId + '</p>' +
          '<p>demandId: ' + demandId + '</p>' +
          '<p>rating: ' + ratingVal + '</p>' +
          '<p>ratingText: ' + ratingText + '</p>' +
          '<div id="resolution-form-div-' + demandId + '">' +
            '<div>' +
              '<label>Amount to give dev</label>' +
              '<input type="number" pattern="\d*" id="amount-dev-' + demandId + '"/>' +
            '</div>' +
            '<div>' +
              '<label>Amount to give back to client</label>' +
              '<input type="number" pattern="\d*" id="amount-client-' + demandId + '"/>' +
            '</div>' +
            '<div>' +
              '<label>New rating: </label>' +
              '<input type="number" pattern="\d*" id="new-rating-' + demandId + '"/>' +
            '</div>' +
            '<div>' +
              '<label>Justification</label>' +
              '<input type="text" id="justication-' + demandId + '"/>' +
            '</div>' +
          '<input type="button" onclick="handleSubmitClick(\'' + demandId + '\')" value="Finish Demand" />' +
        '</div>'
      );

    });
  }, 'json' );
})();

function handleSubmitClick(demandId) {

  // api call to accept bid
  $.post('/api/finish-demand', { 'demandId': demandId }, function(data) {
    // $('#well-' + id).hide();
    alert('Demand sucessfully finished.');
  });

}
