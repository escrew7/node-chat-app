var socket = io()

socket.on('connect', () => {
  console.log('connected to server')
})

socket.on('disconnect', () => {
  console.log('disconected from server')
})

socket.on('newMessage', (message) => {
  console.log('new message', message)
})

socket.emit('createMessage', {
  from: 'reesy',
  text: 'yooooo! its reesy!'
})
