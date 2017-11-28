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
        const bidId = bid._id;
        const email = bid.email;
        const name = bid.name;
        const bidAmount = bid.bidAmount;
        const promisedTimeline = bid.promisedTimeline;
        const isLowestBid = bid.isLowestBid;
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
            '<div>' +
              '<p>Lowest Bid: ' + isLowestBid + '</p>' +
            '</div>' +
            '<input id="bid-accept-button" type="button" onclick="handleBidAcceptClick(\'' + isLowestBid + ',' + bidId + ',' + demandId + '\')" value="Accept Bid" />' +
            '<div id="justification-div-' + bidId + '" style="display: none;">' +
              '<div class="form-group">' +
                '<label>This is not the lowest bid. Please provide justification on why you are choosing to accept this bid</label>' +
                '<textarea id="justification-' + bidId + '" class="form-control"></textarea>' +
              '</div>' +
              '<input type="button" onclick="handleJustificationOkayClick(\'' + bidId + '\')" value="Okay" />' +
              '<input type="button" onclick="handleJustificationCancelClick(\'' + bidId + '\')" value="Cancel" />' +
            '</div>' +
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
      alert('Bid sucessfully accepted');
    });

  }
}

function handleJustificationOkayClick(id) {

  // $.post('/accept-bid', { 'demandId': demandId, 'bidAmount': bidAmount }, function(data) {
  //   $('#well-' + id).hide();
  //   alert('Bid successful');
  // });
}

function handleJustificationCancelClick(id) {
  $('#justification-div-' + id).hide();
}
