'use strict'

const qm = {}

qm.config = require('./pages/config')
qm.colors = require('./pages/colors')
qm.welcome = require('./pages/welcome')
qm.categoryList = require('./pages/category-list')

qm.exit = () => {
  process.stdin.pause()
}

module.exports = qm
