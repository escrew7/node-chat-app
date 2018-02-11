var socket = io()

socket.on('connect', () => {
  console.log('connected to server')
})

socket.on('disconnect', () => {
  console.log('disconected from server')
})

socket.on('newMessage', (message) => {
  console.log('new message', message)
  var li = jQuery('<li></li>')
  li.text(`${message.from}: ${message.text}`)

  jQuery('#messages').append(li)
})

jQuery("#message-form").on('submit', function (e) {
  e.preventDefault()

  socket.emit('createMessage', {
    from: 'user',
    text: jQuery('[name=message]').val()
  }, function () {

  })
})
