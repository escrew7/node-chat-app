var moment = require('moment')

var generateMessage = (from, text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  }
}

var generateLocationMessage = (from, lattitude, longitude) => {
  return {
    from,
    url : `https://www.google.com/maps?q=${lattitude},${longitude}`,
    createdAt: moment().valueOf()
  }
}

module.exports = {generateMessage, generateLocationMessage}
