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
        '</div>'
      );


    });
  }, 'json' );
})();

function handleFinishDemandClick(demandId) {

  // api call to accept bid
  $.post('/api/finish-demand', { 'demandId': demandId }, function(data) {
    // $('#well-' + id).hide();
    alert('Demand sucessfully finished.');
  });

}
