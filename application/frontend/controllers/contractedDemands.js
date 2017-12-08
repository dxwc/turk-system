'use strict';

(function () {
  // get logged in client's user id
  const id = $('#user-id')[0].innerHTML;

  // Show list of temp users
  $.get('/api/contracted-demands', function(data) {
    console.log(data);
    // loop through all demandss
    data.forEach((demand, index) => {
      const demandId = demand._id;
      const spec = demand.spec;
      const biddingTimeline = demand.biddingTimeline;

      $('#demands-list').append(
        '<div class="well" id="well-' + demandId +'">' +
          '<p>Spec: ' + spec + '</p>' +
          '<p>Bidding Timeline: ' + biddingTimeline + '</p>' +

        '</div>'
      );


    });
  }, 'json' );
})();
