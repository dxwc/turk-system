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
      const demandStatus = demand.demandStatus;

      $('#demands-list').append(
        '<div class="well" id="well-' + demandId +'">' +
          '<p>Spec: ' + spec + '</p>' +
          '<p>Demand Status: ' + demandStatus + '</p>' +
          '<input type="button" onclick="handleFinishDemandClick(\'' + demandId + '\')" value="Finish Demand" />' +
          '<div id="rateSystem-div-' + demandId + '" style="display: none;">' +
              '<div class="form-group">' +
                '<label>Rate your delivered system: </label>' +
                '<textarea id="rateSystem-' + demandId + '" class="form-control"></textarea>' +
                '<div id="justification-div-' + demandId + '" style="display: none;">' +
                  '<label>Enter your justification for lower rating: </label>' +
                  '<textarea id="justify-rating-' + demandId + '" class="form-control"></textarea>' +
                '</div>' +
              '</div>' +
              '<input type="button" onclick="handleRateSystemClick(\'' + demandId + '\')" value="Okay" />' +
          '</div>' +
        '</div>'
      );

    });
  }, 'json' );
})();

function handleRateSystemClick(demandId) {
  const systemId = demandId
  const rateValue = $('#rateSystem-' + systemId).val();
  console.log('rateValue: ' + rateValue);
  if (rateValue < 3) {
    // Ask for justification
    $('#justification-div-' + systemId).show();
    const justification = $('#justify-rating-' + systemId).val();
    if (justification) {
      // $.post('/send-rate', { 'systemId': systemId, 'rating': rateValue, 'ratingText' : justification });
      $.post('/api/finish-demand', { 'demandId': demandId, 'rateValue': rateValue, 'justification': justification }, function(data) {
        // $('#well-' + id).hide();

        alert('Demand sucessfully finished.');
      });

      alert('Rating sucessfully sent');
      $('#rateSystem-div-' + systemId).hide();
    } else {
      alert('Please enter justification');
    }
  } else {
    // No need of justification
    // $.post('/send-rate', { 'systemId': systemId, 'rating': rateValue });
    $.post('/api/finish-demand', { 'demandId': demandId, 'rateValue': rateValue }, function(data) {
      // $('#well-' + id).hide();

      alert('Demand sucessfully finished.');
    });
    alert('Rating sucessfully sent');
    $('#rateSystem-div-' + systemId).hide();
  }

}

function handleFinishDemandClick(demandId) {
  $('#rateSystem-div-' + demandId).show();
  // api call to accept bid
  // $.post('/api/finish-demand', { 'demandId': demandId }, function(data) {
  //   // $('#well-' + id).hide();
  //
  //   alert('Demand sucessfully finished.');
  // });

}
