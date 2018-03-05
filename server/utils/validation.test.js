const expect = require('expect')

//import isRealString
var {isRealString} = require('./validation')

//isRealString
describe('isRealString', () => {
  it('should reject non-string values', () => {
    var str = 1234
    var res = isRealString(str)

    expect(res).toBe(false)
  })

  it('should reject string with only spaces', () => {
    var str = '   '
    var res = isRealString(str)

    expect(res).toBe(false)
  })

  it('should allow string with non-space chars', () => {
    var str = 'da bears'
    var res = isRealString(str)

    expect(res).toBe(true)
  })
})
  //should reject non-string values
  //should reject string with only spaces
  //should allow string with non-space chars
