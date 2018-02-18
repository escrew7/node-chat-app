console.log('working...')

var moment = require('moment')

var createdAt = 1234
var date = moment(createdAt)
console.log(date.format('H:MM A'))
console.log(date.format('LT'))
