'use strict';

(function () {
  // get logged in client's user id
  const id = $('#user-id')[0].innerHTML;

  // Show list of temp users
  $.get('/api/demands/' + id, function(data) {
    // loop through all demandss
    data.forEach((demand, index) => {
      const demandId = demand._id;
      const spec = demand.spec;
      const biddingTimeline = demand.biddingTimeline;
      // get array of bids from data
      const bids = demand.bids;
      // create a string that will hold the list of bids in string format
      let bidsList = "";
      // loop through all bids in this demand
      bids.forEach((bid, index) => {
        const bidId = bid.userId;
        const email = bid.email;
        const name = bid.name;
        const bidAmount = bid.bidAmount;
        const promisedTimeline = bid.promisedTimeline;
        // create the list of bids using string accumulator
        bidsList +=
          '<div class="well" id="bid-form-div-' + bidId + '">' +
            '<div>' +
              '<p>Email: ' + email + '</p>' +
            '</div>' +
            '<div>' +
              '<p>Name: ' + name + '</p>' +
            '</div>' +
            '<div>' +
              '<p>Bid Amount $$$: ' + bidAmount + '</p>' +
            '</div>' +
            '<div>' +
              '<p>Promised Timeline: ' + promisedTimeline + '</p>' +
            '</div>' +
            '<input type="button" onclick="handleBidAcceptClick(\'' + bidId + '\')" value="Accept Bid" />' +
          '</div>'
      });

      // append demand well to demands-list
      $('#demands-list').append(
        '<div class="well" id="well-' + demandId +'">' +
          '<p>Spec: ' + spec + '</p>' +
          '<p>Bidding Timeline: ' + biddingTimeline + '</p>' +
          '<p style="font-weight: bold;">Bids:</p>' +
          bidsList +
        '</div>'
      );


    });
  }, 'json' );
})();

function handleBidAcceptClick(id) {
  // const demandId = id;
  // const bidAmount = $('#bid-amount-' + id).val();
  // const promisedTimeline = $('#promised-timeline-' + id).val();
  //
  // $.post('/bid', { 'demandId': demandId, 'bidAmount': bidAmount, 'promisedTimeline': promisedTimeline }, function(data) {
  //   $('#well-' + id).hide();
  //   alert('Bid successful');
  // });
}
