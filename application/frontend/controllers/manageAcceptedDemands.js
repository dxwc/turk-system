'use strict';

(function () {
  // get logged in client's user id
  const id = $('#user-id')[0].innerHTML;

  // Show list of temp users
  $.get('/api/acceptedDemands/' + id, function(data) {
    console.log(data);
    // loop through all demandss
    data.forEach((demand, index) => {
      const demandId = demand._id;
      const spec = demand.spec;
      const biddingTimeline = demand.biddingTimeline;
      // get array of bids from data
      const bids = demand.bids;
      const systemStatus = demand.demandStatus;
      const bidderId = 
      // create a string that will hold the list of bids in string format
      // append demand well to demands-list
      $('#demands-list').append(
        '<div class="well" id="well-' + demandId +'">' +
          '<p>Spec: ' + spec + '</p>' +
          '<p>Bidding Timeline: ' + biddingTimeline + '</p>' +
          '<p style="font-weight: bold;">Bidder:</p>' +
          '<div id="rateSystem-div-' + demandId + '" style="display: none;">' +
              '<div class="form-group">' +
                '<label>Rate your delivered system: </label>' +
                '<textarea id="rateSystem-' + demandId + '" class="form-control"></textarea>' +
                '<div id="justification-div-' + demandId + '" style="display: none;">' +
                  '<label>Enter your justification for lower rating: </label>' +
                  '<textarea id="justify-rating-' + demandId + '" class="form-control"></textarea>' +
                '</div>' + 
              '</div>' +
              '<input type="button" onclick="handleRateSystemClick(\'' + systemStatus + ',' + demandId + '\')" value="Okay" />' +
          '</div>' +
        '</div>'
      );

      if (systemStatus == 'bidAccepted') {
        $('#rateSystem-div-' + demandId).show();
      }

    });
  }, 'json' );
})();

function handleRateSystemClick(paramsStr) {
  const paramsArr = paramsStr.split(',');
  const systemStatus = paramsArr[0];
  const systemId = paramsArr[1];
  const rateValue = $('#rateSystem-' + systemId).val();

  if (rateValue < 3) {
    // Ask for justification
    $('#justification-div-' + systemId).show();
    const justification = $('#justify-rating-' + systemId).val();
    if (justification) {
      $.post('/send-rate', { 'systemId': systemId, 'rating': rateValue, 'ratingText' : justification });
      alert('Rating sucessfully sent');
      $('#rateSystem-div-' + systemId).hide();
    } else {
      alert('Please enter justification');
    }
  } else {
    // No need of justification
    $.post('/send-rate', { 'systemId': systemId, 'rating': rateValue });
    alert('Rating sucessfully sent');
    $('#rateSystem-div-' + systemId).hide();
  }

}
