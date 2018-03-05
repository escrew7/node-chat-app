const expect = require('expect')

const {Users} = require('./users')

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users()
    users.users = [{
      id: '1',
      name: 'Doc',
      room: 'Node'
    },{
      id: '2',
      name: 'Reesy',
      room: 'React'
    },{
      id: '3',
      name: 'Luke',
      room: 'Node'
    }]
  })

  it('should add new users', () => {
    var users = new Users()
    var user = {
      id: '123',
      name: 'luke',
      room: 'cool guys only'
    }
    var resUser = users.addUser(user.id, user.name, user.room)
    expect(users.users).toEqual([user])
  })

  it('should remove a user', () => {
    var userId = '1'
    var user = users.removeUser(userId)

    expect(user.id).toBe(userId)
    expect(users.users.length).toBe(2)
  })

  it('should not remove a user', () => {
    var userId = '4'
    var user = users.removeUser(userId)

    expect(users.users.length).toBe(3)
  })

  it('should find user', () => {
    var userId = '1'
    var user = users.getUser(userId)

    expect(user.id).toBe(userId)
  })

  it('should not find user', () => {
    var userId = '4'
    var user = users.getUser(userId)
    expect(user).toNotExist()
  })

  it('should return names for Node', () => {
    var userList = users.getUserList('Node')
    expect(userList).toEqual(['Doc', 'Luke'])
  })

  it('should return names for React', () => {
    var userList = users.getUserList('React')
    expect(userList).toEqual(['Reesy'])
  })
})
