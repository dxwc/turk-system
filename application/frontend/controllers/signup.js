'use strict';

(function () {
  $('#select-usertype').on('change', function() {
    console.log($('#select-usertype').val());
    if($('#select-usertype').val() === 'superuser') {
      $('#superuser-key-input').show();
    } else {
      $('#superuser-key-input').hide();
    }
  });
})();
