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
      // create a string that will hold the list of bids in string format
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


function handleRateSystemClick(paramsStr) {
  const paramsArr = paramsStr.split(',');
  const systemStatus = paramsArr[0];
  const bidderId = paramsArr[1];
  const systemId = paramsArr[2];

  // if the systemStatus is submitted
  if (systemStatus === 'submitted') {
    $('#rateSystem-div-' + systemId).show();
    // api call to send the rate
    //$.post('/send-rate', { 'systemId': systemId, '' });
  } else {
    // the system has not yet been submitted, you can't rate input
    alert('System has not yet been submitted, you can not rate it!');
  }

}
