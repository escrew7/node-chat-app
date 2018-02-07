var expect = require('expect')

var {generateMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'reesy'
    var text = 'lets party'
    var res = generateMessage(from, text)

    expect(res).toInclude({from,text})
    expect(res.createdAt).toBeA('number')
  })
})
