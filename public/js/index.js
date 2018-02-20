var socket = io()

socket.on('connect', () => {
  console.log('connected to server')
})

socket.on('disconnect', () => {
  console.log('disconected from server')
})

socket.on('newMessage', (message) => {
  var template = jQuery('#message-template').html()
  var formattedTime = moment(message.createdAt).format('h:mm a')
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  })
  jQuery('#messages').append(html)
})

var messageTextBox = jQuery('[name=message]')

socket.on('newLocationMessage', function(message) {
  var template = jQuery('#location-message-template').html()
  var formattedTime = moment(message.createdAt).format('h:mm a')
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  })
  jQuery('#messages').append(html)
})

jQuery("#message-form").on('submit', function (e) {
  e.preventDefault()

  socket.emit('createMessage', {
    from: 'user',
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val('')
  })
})

var locationButton = jQuery('#send-location')
locationButton.on('click', function () {
  if(!navigator.geolocation) {
    return alert('Geolocation not available on user browser')
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...')

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location')
    socket.emit('createLocationMessage', {
      lattitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    locationButton.removeAttr('disabled').text('Send location')
    alert('unable to fetch location')
  })
})
