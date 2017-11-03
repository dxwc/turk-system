'use strict';

(function () {
  // Show superuser key input if superuser option is selected.
  // Otherwise hide superuser key input
  $('#select-usertype').on('change', function() {
    // console.log($('#select-usertype').val());
    if($('#select-usertype').val() === 'superuser') {
      $('#superuser-key-input').show();
    } else {
      $('#superuser-key-input').hide();
    }
  });
})();
