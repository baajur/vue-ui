const { add, s } = require('./store')

class X {
    constructor() {}
    add() {
      return  add()
    }
    s() {
     return s()
    }
}

module.exports = X
