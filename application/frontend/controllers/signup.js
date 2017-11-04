'use strict';

(function () {
  // Show superuser key input if superuser option is selected.
  // Otherwise hide superuser key input
  $('#select-usertype').on('change', function() {
    // console.log($('#select-usertype').val());
    if($('#select-usertype').val() === 'superuser') {
      $('.superuser-only').show();
      $('.non-superuser-only').hide();
    } else {
      $('.superuser-only').hide();
      $('.non-superuser-only').show();
    }
  });
})();
