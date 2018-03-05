var socket = io()

function scrollToBottom() {
  //selectors
  var messages = jQuery('#messages')
  var newMessage = messages.children('li:last-child')
  //heights
  var clientHeight = messages.prop('clientHeight')
  var scrollTop = messages.prop('scrollTop')
  var scrollHeight = messages.prop('scrollHeight')
  var newMessageHeight = newMessage.innerHeight()
  var lastMessageHeight = newMessage.prev().innerHeight()

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight)
  }
}

socket.on('connect', () => {
  var params = jQuery.deparam(window.location.search)

  socket.emit('join', params, function(err) {
    if(err) {
      alert(err)
      window.location.href = "/"
    } else {
      console.log('no error')
    }
  })
})

socket.on('disconnect', () => {
  console.log('disconected from server')
})

socket.on('updateUserList', (users) => {
  var ol = jQuery('<ol></ol>')

  users.forEach(function(user) {
    ol.append(jQuery('<li></li>').text(user))
  })

  jQuery('#users').html(ol)
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
  scrollToBottom()
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
  scrollToBottom()
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
