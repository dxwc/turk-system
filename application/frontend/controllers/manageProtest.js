function handleProtestSend() {
  	const id = $('#user-id')[0].innerHTML;
	const ProtestMessage = $('#reject-message-' + id).val();
	$.post('/send-protest', { 'userId': id, 'protestMessage': ProtestMessage}, function(data) {
    // $('#well-' + id).hide();
      alert('Protest Message Sent');
  });
}

