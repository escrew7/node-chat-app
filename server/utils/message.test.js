var expect = require('expect')

var {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'reesy'
    var text = 'lets party'
    var res = generateMessage(from, text)

    expect(res).toInclude({from,text})
    expect(res.createdAt).toBeA('number')
  })
})

describe('generateLocationMessage', ()=> {
  it('should generate correct location message', () => {
    var from = 'doc'
    var url = `https://www.google.com/maps?q=1,1`
    var res = generateLocationMessage(from, 1, 1)

    expect(res).toInclude({from, url})
    expect(res.url).toBe(url)
  })
})
